'use client'
import axios from "axios";
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';


export default function DetailRoom(props){
  const nameRef = useRef('');
  const id_roomlRef = useRef('');
  const id_parishRef = useRef('');
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  // const [dateNow, setDateNow] = useState(new Date().toLocaleString('vi-VN').substring(9))
  const [count, setCount] = useState([])

  
  

  const handleAdd = async (e) => {
    // console.log(nameRef.current.value, id_roomlRef.current.value, id_parishRef.current.value);
    try {
        e.preventDefault();
        const data = {
          name: nameRef.current.value,
          newRoomId:  id_roomlRef.current.value,
          id_parish: id_parishRef.current.value
        }
        // console.log(data);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/addChildByName`,data).then((res) => res.data)
        

      } catch (error) {
        console.log(error);
      }
      
  }

  const handleDelete = async (_id) => {
    // console.log(_id._id);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rooms/deleteChild/${_id._id}`).then((res) => res.data)
    window.location.reload();
  }

  const glvRoles = props.data.filter(item => item.role === "GLV");
  const glvNames = glvRoles.map(item => item.name);

  const tnRoles = props.data.filter(item => item.role === "Thiếu Nhi");

  // kiểm tra ngày 
  
  
  

    return(
        <>
        <div className="ps-5">
        {props.data.slice(0, 1).map((detail) => {
            const {id_room } = detail
            return(
            <>
                    <p class="italic text-2xl font-bold">Lớp {id_room.name} - GLV: {glvNames}</p>
             
 
            <div className="flex flex-row gap-96">
              <p class="italic text-lg font-bold">Danh Sách Thiếu Nhi Trong Lớp: <br />
                  <Link href={`/check/${id_room._id}`} class="italic text-sm underline underline-offset-2 text-blue-800"> Điểm Danh : </Link>
              </p>
              <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}><i class="fa-solid fa-plus"></i></button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-3xl text-center">Bổ Sung Thiếu Nhi Vào Lớp !</h3>
                    <form onSubmit={handleAdd} className="flex max-w-md flex-col gap-4" >
                      <div>
                        <div className="mb-2 block">
                          <Label value="Họ & Tên : " />
                        </div>
                        <TextInput id="email1" type="text" ref={nameRef} placeholder="Nhập Họ & Tên" required />
                        <input type="hidden" ref={id_roomlRef} value={id_room._id}/>
                        <input type="hidden" ref={id_parishRef} value={user.id_parish} />
                      </div>

                      <Button className="mt-3 bg-red-800" type="submit">Bổ Sung !</Button>
                    </form>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            </>
             );                    
            })}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Họ & Tên</th>
                    <th>Ngày Tháng Năm Sinh</th>
                    <th>Ngành</th>
                    <th>Đơn Xin Nghỉ Phép</th>
                    <th>Nhận Xét</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {tnRoles.map((detail, index) => {
                    const {_id , name, phone, date, branh, avatar, gender, role, id_room } = detail
                    
                    return(
                        <tr key={_id}>
                          <th>{index +1}</th>
                          <td>
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${avatar}`}
                                    alt="Avatar Tailwind CSS Component" />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{name} ({gender})</div>
                                <div className="text-sm opacity-50">{role}</div>
                              </div>
                            </div>
                          </td>
                          <td>{new Date(date).toLocaleDateString('vi-VN')}</td>
                          <td>Ngành {branh}</td>
                          <th>
                            <Link href={`/takeleave/${_id}`} className="indicator">
                              <span className="indicator-item badge badge-warning">99+</span>
                              <button className="btn flex justify-center"><i class="fa-solid fa-note-sticky fa-xl"></i></button>
                            </Link>
                          </th>
                          <th>
                            <Link href={`/feedback/${_id}`} className="btn btn-ghost btn-md"><i class="fa-regular fa-message"></i></Link>
                          </th>
                          <th>
                            <details className="dropdown">
                              <summary className="btn m-1"><i class="fa-solid fa-ellipsis-vertical"></i></summary>
                              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
                                <li><Link href={`/child/${_id}`}>Sửa Thông Tin</Link></li>
                                <li><a onClick={() => handleDelete({_id})}>Xóa Học Sinh</a></li>
                              </ul>
                            </details>
                          </th>
                        </tr>       
                    );                    
                  })}
                  {/* row 1 */}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>STT</th>
                        <th>Họ & Tên</th>
                        <th>Ngày Tháng Năm Sinh</th>
                        <th>Ngành</th>
                        <th>Đơn Xin Nghỉ Phép</th>
                        <th>Nhận Xét</th>
                    </tr>
                </tfoot>
              </table>
            </div>
        </div>
        </>
    );
}