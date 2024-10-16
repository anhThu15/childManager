'use client'
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import Link from "next/link";


export default function DetailRoom(props){
    return(
        <>
        <div className="ps-5">
            <p class="italic text-2xl font-bold">Lớp gì đó- GLV: Anh Thư</p>
            <div className="flex flex-row gap-96">
              <p class="italic text-lg font-bold">Danh Sách Thiếu Nhi Trong Lớp: 
                  <Link href={`/check`} class="italic text-sm underline underline-offset-2 text-blue-800"> Điểm Danh : </Link>
              </p>
              <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}><i class="fa-solid fa-plus"></i></button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-3xl text-center">Bổ Sung Thiếu Nhi Vào Lớp !</h3>
                    <form className="flex max-w-md flex-col gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label value="Họ & Tên : " />
                        </div>
                        <TextInput id="email1" type="email" placeholder="Nhập Họ & Tên" required />
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Giới Tính:" />
                        </div>
                          <Select id="countries" required>
                            <option>Chọn Giới Tính</option>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác...</option>
                          </Select>
                      </div>


                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Giáo Họ :" />
                        </div>
                          <Select id="countries" required>
                            <option>Chọn Giáo Họ</option>
                            <option>Canada</option>
                            <option>France</option>
                            <option>Germany</option>
                          </Select>
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Nghành :" />
                        </div>
                          <Select id="countries" required>
                            <option>Chọn Ngành</option>
                            <option>Ngành Chiên Con</option>
                            <option>Ngành Ấu Nhi</option>
                            <option>Ngành Thiếu</option>
                            <option>Ngành Nghĩa</option>
                            <option>Ngành Hiệp Sĩ</option>
                          </Select>
                      </div>
                      
                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Ngày Tháng Năm Sinh : " />
                        </div>
                          <Datepicker />
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Ảnh Thiếu Nhi : " />
                        </div>
                          <FileInput id="file-upload" />
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
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Họ & Tên</th>
                    <th>Ngày Tháng Năm Sinh</th>
                    <th>Ngành</th>
                    <th>Số Lần Nghỉ</th>
                    <th>Nhận Xét</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {props.data.map((detail) => {
                    const {_id , name, phone, date, branh, avatar, gender, role } = detail
                    return(
                        <tr key={_id}>
                          <th>1</th>
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
                          <td>{date}</td>
                          <td>Ngành {branh}</td>
                          <th>
                            <Link href='/takeleave' className="btn btn-ghost btn-md">1/3</Link>
                          </th>
                          <th>
                            <Link href='/feedback' className="btn btn-ghost btn-md"><i class="fa-regular fa-message"></i></Link>
                          </th>
                          <th>
                            <details className="dropdown">
                              <summary className="btn m-1"><i class="fa-solid fa-ellipsis-vertical"></i></summary>
                              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
                                <li><Link href={`/child/${_id}`}>Sửa Thông Tin</Link></li>
                                <li><a>Xóa Học Sinh</a></li>
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
                        <th>Số Lần Nghỉ</th>
                        <th>Nhận Xét</th>
                    </tr>
                </tfoot>
              </table>
            </div>
        </div>
        </>
    );
}