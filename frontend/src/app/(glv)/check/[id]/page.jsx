'use client'
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Badge,Tabs, Table, Datepicker,Button, Alert} from "flowbite-react";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Check({params}){
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { register: register2 , handleSubmit: handleSubmit2, setValue: setValue2, formState: { errors2 } } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [seen, setSeen] = useState([]);

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
  

  // console.log(data.result);
  
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
      
      // const button = document.querySelector('.btn')
      // button.classList.add('hidden')
 
    } catch (error) {
      console.log(error);
    }
  }
  
  // xử lý xem
  const onSeen = async (data) => {
    const newArrUser = {
      user_ids: Object.keys(data.user_ids)
    };
    console.log(newArrUser);
    
    
    const getDate = new Date(date.value);
    
    // Lấy năm, tháng, ngày
    const year = getDate.getFullYear();
    const month = String(getDate.getMonth() + 1).padStart(2, '0');  // Lấy tháng và thêm số 0 nếu cần
    const day = String(getDate.getDate()).padStart(2, '0');  // Lấy ngày và thêm số 0 nếu cần
    
    // Tạo chuỗi ngày theo định dạng 'YYYY-MM-DD'
    const dates = `${year}-${month}-${day}`;
    
    console.log(dates);

    try {
      
      // console.log({students});
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attendanceByDate/${dates}`,newArrUser,{ revalidate: 3600 }).then((res) => res.data)
      if(res){
        alert('Thành Công rồi đi chữa lành thôi')
        // router.back()
        // console.log(res);
        setSeen(res.attendances)
      }else{
        alert('Thất Bại')
      }
      
      // const button = document.querySelector('.btn')
      // button.classList.add('hidden')
 
    } catch (error) {
      console.log(error);
    }
    
    
  } 


    return (
        <>
            <div className="h-96">
                <Tabs aria-label="Tabs with icons" className="ms-3" variant="underline">
                  <Tabs.Item active title="Điểm Danh"  icon={HiUserCircle}>
                        {tnRoles.slice(0,1).map((child, index) => {
                                  const{_id , id_room} = child
                                  return(                        
                                    <p class=" ms-5 italic text-2xl font-bold">Điểm Danh Thiếu Nhi -  Lớp {id_room.name}</p>
                                  )
                                })}
                          <div className="overflow-x-auto" style={{height:280}}>
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
                                  <th  >
                                    <button type="submit" className="btn btn-success">Điểm Danh</button>
                                  </th>
                                </tr>
                              </tfoot>
                            </table>
                          </form>
                          </div>
                  </Tabs.Item>
                  <Tabs.Item title="Xem Điểm Danh" icon={MdDashboard}>
                      <p class=" ms-5 italic text-2xl font-bold">Xem Điểm Danh Thiếu Nhi</p>
                      <form action="" onSubmit={handleSubmit2(onSeen)}>
                            {/* <input type="hidden" {...register2(`id_user.${_id}`)} value={index} /> */}
                            <Datepicker dateFormat="yyyy/MM/dd"  id="date" onChange={(date) => setValue('date', date)}  />
                            {errors.date && <div className="text-red-500">{errors.date.message}</div>}
                            <Button color="info" className="mt-2" type="submit">Xem</Button>
                          <div className="overflow-x-auto" style={{height:"200px"}}>
                            {/*  lấy dữ liệu */}
                            <Table style={{display:"none"}}>
                              <Table.Head>
                                <Table.HeadCell>Tên Thếu Nhi</Table.HeadCell>
                                <Table.HeadCell>Ngày giờ</Table.HeadCell>
                                <Table.HeadCell>Điểm Danh</Table.HeadCell>
                              </Table.Head>
                              <Table.Body className="divide-y">
                                {tnRoles.map((child) => {
                                  return(
                                    <>
                                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                          {child.name}
                                          <input
                                            type="hidden"
                                            {...register2(`user_ids[${child._id}]`)} // Cách tạo tên trường để lưu
                                            value={child._id} // Lưu giá trị _id vào mảng userIds
                                          />
                                        </Table.Cell>
                                        <Table.Cell>Sliver</Table.Cell>
                                        <Table.Cell>Sliver</Table.Cell>
                                      </Table.Row>
                                    </>
                                  )
                                })}
                                
                              </Table.Body>
                            </Table>
                            {/*  lấy dữ liệu */}

                            <Table  >
                              <Table.Head>
                                <Table.HeadCell>Tên Thếu Nhi</Table.HeadCell>
                                <Table.HeadCell>Ngày giờ</Table.HeadCell>
                                <Table.HeadCell>Ghi Chú</Table.HeadCell>
                                <Table.HeadCell>Điểm Danh</Table.HeadCell>
                              </Table.Head>
                              <Table.Body className="divide-y">
                                {seen.map((child) => {
                                  return(
                                    <>
                                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                          {child.id_user.name}
                                        </Table.Cell>
                                        <Table.Cell>{child.date}</Table.Cell>
                                        <Table.Cell>{child.description}</Table.Cell>
                                        <Table.Cell>{child.check ? (
                                          <Alert color="success" >
                                            <span className="font-medium">Có Mặt</span>
                                          </Alert>) : (
                                          <Alert color="failure" >
                                            <span className="font-medium">Vắng Mặt</span>
                                          </Alert>)}
                                        </Table.Cell>
                                      </Table.Row>
                                    </>
                                  )
                                })}
                                
                              </Table.Body>
                            </Table>
                          </div>
                      </form>
                  </Tabs.Item>
                </Tabs>
            
            </div>
        </>
    );
}