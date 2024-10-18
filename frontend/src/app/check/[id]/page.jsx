'use client'
import { Badge } from "flowbite-react";
import { useLocalStorage } from 'react-use';
import { useForm } from 'react-hook-form';
import useSWR from "swr";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Check({params}){
  const [user] = useLocalStorage('user', null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const id_parish = user.id_parish
  const id_room = params.id

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/rooms/detailRoom/${id_parish}/${id_room}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;
  console.log(data);



  // xử lý check 
  const onCheck = (data) =>{
    try {
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <>
            <div className="h-96">
            {data.result.slice(0,1).map((child, index) => {
                        const{_id , id_room} = child
                        return(                        
                          <p class=" ms-5 italic text-2xl font-bold">Điểm Danh Thiếu Nhi -  Lớp {id_room.name}</p>
                        )
                      })}
                <div className="overflow-x-auto" style={{height:350}}>
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Họ & Tên</th>
                        <th>Điểm Danh</th>
                        <th>Số Lần Nghỉ</th>
                        <th>Ghi Chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {data.result.map((child, index) => {
                        const{_id , name} = child
                        return(
                              <tr key={_id}>
                                <th>{index + 1}</th>
                                <td>
                                  {name}
                                  <input type="hidden" />
                                </td>
                                <td><input type="checkbox" className="toggle toggle-success" defaultChecked/></td>
                                <td><Badge  color="failure" size="sm">1/3</Badge></td>
                                <td><textarea className="textarea textarea-bordered" placeholder="Bio"></textarea></td>
                              </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr >
                        <th >
                          <button className="btn btn-success">Điểm Danh</button>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
            </div>
        </>
    );
}