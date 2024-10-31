'use client'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle,Button, Label, TextInput, Select, Datepicker, FileInput  } from "flowbite-react";
import DetailRoom from "./detailRoom";
import axios from 'axios';
import { useLocalStorage } from 'react-use';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ListRoom(props){
  const [details, setDetail]  = useState(null)
  const [GLV, setGLV]  = useState([])
  const [user] = useLocalStorage('user', {});
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const id_parish = user.id_parish

  useEffect(()=>{
    const getGLV = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id_parish}`,{ revalidate: 3600 }).then((res) => res.data)
        setGLV(res)
    }

    getGLV();
  },[])
  // console.log(GLV);
  

  const detailId = async (id) =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rooms/detailRoom/${id_parish}/${id}`,{ revalidate: 3600 }).then((res) => res.data)
        setDetail(res.result)
      } catch (error) {
        console.log(error);
      }
  }

  const deleteId = async (id) =>{
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/rooms/deleteRoom/${id}`,{ revalidate: 3600 }).then((res) => res.data)
      // console.log(res);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
}
  

const onAddRoom = async (data) => {
  //  console.log(data);
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/addRoom`, data).then((res) => res.data);
    if (res) {
      alert('thành công ròi đi chữa lãnh hoy ~~~')
      window.location.reload()
    } else {
      // Xử lý hiển thị lỗi
      console.error(result.error);
    }
  } catch (error) {
    console.log(error);
  }
}
  

    return (
      <>
      <div className="grid grid-cols-12 text-wrap ">
        <div className="col-span-3">
          <div className=" overflow-y-scroll h-96">
              <div className="flex flex-wrap ">

                  <div>
                      <Accordion style={{width: 239}} >
                        {props.data.result.map((room) => {
                          const { _id, name, quantity, id_parish } = room;
                        
                          return (
                            <AccordionPanel key={_id}>
                              <AccordionTitle>{name}</AccordionTitle>
                              <AccordionContent className="bg-slate-200">
                                {/* <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  Sỉ Số : {quantity}
                                </p>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">GLV: Thư</p> */}
                                <div className=" flex items-center">
                                  <Button onClick={() => detailId(_id)}>Xem chi tiết</Button>
                                  <Button className="ms-2" color="failure" onClick={() => deleteId(_id)}>Xóa Lớp</Button>
                                </div>
                              </AccordionContent>
                            </AccordionPanel>
                          );
                        })}
                      </Accordion>
              
                    {/* thêm lớp */}
                      <button className="btn w-full" onClick={()=>document.getElementById('my_modal_2').showModal()}><i class="fa-solid fa-plus"></i></button>
                            <dialog id="my_modal_2" className="modal">
                              <div className="modal-box">
                                <h3 className="font-bold text-3xl text-center">Thêm Lớp !</h3>
                                  <form onSubmit={handleSubmit(onAddRoom)} className="flex max-w-md flex-col gap-4">
                                    <div>
                                      <div className="mb-2 block">
                                        <Label value="Lớp : " />
                                      </div>
                                      <TextInput id="email1" type="text" placeholder="Nhập Tên Lớp" required  
                                                  {...register('name', { required: 'Tên Gói là bắt buộc' })}  />
                                                  {errors.name && <div className="text-danger">{errors.name.message}</div>}
                                    </div>
                                    <input type="hidden" value={id_parish} {...register('id_parish')}  />
              
                                    <div className="max-w-md">
                                      <div className="mb-2 block">
                                        <Label value="GLV:" />
                                      </div>
                                        <Select id="countries" required {...register('userId', { required: 'Tên GLV là bắt buộc' })}>
                                          <option>Chọn Giáo Lý Viên</option>
                                          {GLV?.result?.map((glv) => {
                                            return(
                                              <>
                                                <option value={glv._id}>{glv.name}</option>
                                              </>
                                            );
                                          })}
                                        </Select>
                                        {errors.userId && <div className="text-danger">{errors.userId.message}</div>}
                                    </div>
              
                                    <Button className="mt-3 bg-red-800" type="submit">Thêm Lớp !</Button>
                                  </form>
                                <div className="modal-action">
                                  <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                    {/* thêm lớp */}
              
                  </div>
              
              </div>
           </div>
        </div>
        
        <div className="col-span-9 text-wrap bg-slate-200">
            <div className=" overflow-y-scroll h-96">
                <div className="flex flex-wrap">
                
                  { details ? (<DetailRoom data={details}/>): (<p className=" font-bold text-2xl ml-5">Chọn lớp để xem lớp ....</p>)}
                    
                </div>
            </div>
        </div>
      </div>
</>
      );
}