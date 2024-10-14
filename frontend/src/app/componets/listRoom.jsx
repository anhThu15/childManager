'use client'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle,Button, Label, TextInput, Select, Datepicker, FileInput  } from "flowbite-react";
import DetailRoom from "./detailRoom";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function ListRoom(props){
  const [details, setDetail]  = useState(null)

  const id_parish = '66e3f7dda2a2f5d37a91fa51'

  const detailId = async (id) =>{
      try {
        const res = await axios.get(`http://localhost:3000/rooms/detailRoom/${id_parish}/${id}`,{ revalidate: 3600 }).then((res) => res.data)
        setDetail(res.result)
      } catch (error) {
        console.log(error);
      }
  }
  
  console.log(details);
  

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
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  Sỉ Số : {quantity}
                                </p>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">GLV: Thư</p>
                                <Button onClick={() => detailId(_id)}>Xem chi tiết</Button>
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
                                  <form className="flex max-w-md flex-col gap-4">
                                    <div>
                                      <div className="mb-2 block">
                                        <Label value="Lớp : " />
                                      </div>
                                      <TextInput id="email1" type="text" placeholder="Nhập Tên Lớp" required />
                                    </div>
              
                                    <div className="max-w-md">
                                      <div className="mb-2 block">
                                        <Label value="GLV:" />
                                      </div>
                                        <Select id="countries" required>
                                          <option>Chọn Giáo Lý Viên</option>
                                          <option>Nam</option>
                                          <option>Nữ</option>
                                          <option>Khác...</option>
                                        </Select>
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