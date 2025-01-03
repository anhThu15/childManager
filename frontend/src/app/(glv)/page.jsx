"use client";
import Image from "next/image";
import ListRoom from "./componets/listRoom";
import Cookies from 'js-cookie';
import useSWR from "swr";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Home() {
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  let id_parish = null; 

  if (user) {
    id_parish = user.id_parish; 
  }
  

  const { data: rooms, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id_parish}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;

  

  return (
   <>
   <div className="h-96">
          <ListRoom data={rooms}/>
   </div>
   </>
  );
}
