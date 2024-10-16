"use client";
import Image from "next/image";
import ListRoom from "./componets/listRoom";
import { useLocalStorage } from 'react-use';
import useSWR from "swr";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Home() {
  const [user] = useLocalStorage('user', null);

  const id_parish = user.id_parish

  const { data: rooms, error, isLoading } = useSWR(`http://localhost:3000/rooms/${id_parish}`, fetcher,
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
