'use client'
import { Badge } from "flowbite-react";
import { useLocalStorage } from 'react-use';
import { useForm } from 'react-hook-form';
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Check({params}){
  const [user] = useLocalStorage('user', null);
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isChecked, setIsChecked] = useState(false);

  const id_parish = user.id_parish
  const id_room = params.id

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/rooms/detailRoom/${id_parish}/${id_room}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );
  
  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;

  const handleChange = () => {
    setIsChecked(prevChecked => !prevChecked); // Chuyển đổi trạng thái checkbox
  };

  
  const tnRoles = data.result.filter(item => item.role === "Thiếu Nhi");
  tnRoles.map(id => {
    setValue('id_user', id._id); 
  });
  

  // console.log(tnRoles);



  // xử lý check 
  const onCheck = async (data) =>{
    try {
      const students = Object.entries(data.id_user).map(([id, index]) => ({
        id_user: id,
        check: data.check[index],
        description: data.description[index]
    }));
    
    // console.log({students});
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkChild`,{students},{ revalidate: 3600 }).then((res) => res.data)
        if(res){
          alert('Thành Công rồi đi chữa lành thôi')
          router.back()
        }else{
          alert('Thất Bại')
        }

    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <>
            <div className="h-96">
            {tnRoles.slice(0,1).map((child, index) => {
                        const{_id , id_room} = child
                        return(                        
                          <p class=" ms-5 italic text-2xl font-bold">Điểm Danh Thiếu Nhi -  Lớp {id_room.name}</p>
                        )
                      })}
                <div className="overflow-x-auto" style={{height:350}}>
                <form onSubmit={handleSubmit(onCheck)}>
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
                      {tnRoles.map((child, index) => {
                        const{_id , name} = child
                        return(
                              <tr key={_id}>
                                <th>{index + 1}</th>
                                <td>
                                  {name}
                                  <input type="hidden" {...register(`id_user.${_id}`)} value={index} />
                                </td>
                                <td>
                                    <input 
                                      type="checkbox" 
                                      className="toggle toggle-success" 
                                      {...register(`check.${index}`)} // Đặt tên cho checkbox độc lập
                                    />
                                </td>
                                <td><Badge  color="failure" size="sm">1/3</Badge></td>
                                <td><textarea className="textarea textarea-bordered" {...register(`description.${index}`)} placeholder="Bio"></textarea></td>
                              </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr >
                        <th >
                          <button type="submit" className="btn btn-success">Điểm Danh</button>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </form>
                </div>
            </div>
        </>
    );
}