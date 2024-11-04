"use client";
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';

export default function Sigin(){
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [parish, setParish] = useState([])
  
  useEffect(()=>{
    const getParish = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parish`,{ revalidate: 3600 }).then((res) => res.data)
        setParish(res)
      } catch (error) {
        console.log(error);
        
      }
    }
    getParish()
  },[])
  
  const onSigin = async (data) => {
    try {
      // console.log(data , date.value);
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (data.avatar[0]) {
        formData.append('avatar', data.avatar[0]);
      }
      if (!data.date){
        formData.append('date', date.value )
      }

      console.log(formData);
      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/sigin`,formData)
            .then((res)=>res.data)
      if (res) {
      alert('thành công ròi đi chữa lãnh hoy ~~~')
      router.push('/students/login');
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
            <div className="h-96 overflow-x-auto">
                <p className="text-3xl font-bold text-center mb-2">Đăng Ký Cho Thiếu Nhi</p>
                <div className="flex justify-center">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSigin)}>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Họ & Tên : " />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Họ & Tên" required
                                   {...register('name', { required: 'Tên đăng nhập là bắt buộc' })} />
                                   {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                      </div>
                      <input type="hidden" value={'Thiếu Nhi'}  {...register('role')}/>
                      
                      <div>
                        <div className="mb-2 block">
                          <Label value="Mật Khẩu: " />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Mật Khẩu" required
                                   {...register('password', { required: 'Mật Khẩu là bắt buộc' })} />
                                   {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Giới Tính:" />
                        </div>
                          <Select id="countries" required 
                                  {...register('gender', { required: 'Giới Tính là bắt buộc' })}>
                            <option>Chọn Giới Tính</option>
                            <option value={'Nam'}>Nam</option>
                            <option value={'Nữ'}>Nữ</option>
                            <option value={'Khác'}>Khác...</option>
                          </Select>
                                  {errors.gender && <div className="text-red-500">{errors.gender.message}</div>}
                      </div>


                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Giáo Họ :" />
                        </div>
                          <Select id="countries" required {...register('id_parish', { required: 'Giáo Xứ là bắt buộc' })}>
                            <option>Chọn Giáo Xứ</option>
                            {parish.map((pa) => {
                              return(<option value={pa._id}>{pa.name}</option>)
                            })}
                          </Select>
                          {errors.id_parish && <div className="text-red-500">{errors.id_parish.message}</div>}
                      </div>


                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Chọn Ngành Sinh Hoạt" />
                        </div>
                          <Select id="countries" required {...register('branh', { required: 'Chọn Ngành Sinh Hoạt là bắt buộc' })}>
                            <option>Chọn Ngành Sinh Hoạt</option>
                            <option value={'Chiên Con'}>Chiên Con</option>
                            <option value={'Ấu Nhi'}>Ấu Nhi</option>
                            <option value={'Thiếu Nhi'}>Thiếu Nhi</option>
                            <option value={'Nghĩa Sĩ'}>Nghĩa Sĩ</option>
                            <option value={'Hiệp Sĩ'}>Hiệp Sĩ</option>
                            <option value={'Đội Trưởng'}>Đội Trưởng</option>
                            <option value={'Dự Trưởng'}>Dự Trưởng</option>
                            <option value={'Huynh Trưởng'}>Huynh Trưởng</option>
                          </Select>
                          {errors.branh && <div className="text-red-500">{errors.branh.message}</div>}
                      </div>


                      <div>
                        <div className="mb-2 block">
                          <Label value="Số Điện Thoại : " />
                        </div>
                        <TextInput type="number" placeholder="Nhập số điện thoại" required 
                                {...register('phone', { required: 'Số Điện thoại là bắt buộc' })} />
                                {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}
                      </div>
                      
                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Ngày Tháng Năm Sinh : " />
                        </div>
                          <Datepicker dateFormat="yyyy/MM/dd"  id="date" onChange={(date) => setValue('date', date)}  />
                          {errors.date && <div className="text-red-500">{errors.date.message}</div>}
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Ảnh Thiếu Nhi : " />
                        </div>
                          <FileInput id="file-upload"  {...register('avatar', { required: 'Ảnh Thiếu Nhi là bắt buộc' })} />
                          {errors.avatar && <div className="text-red-500">{errors.avatar.message}</div>}
                      </div>

                      <Button className="mt-3 bg-red-800" type="submit">Đăng Ký </Button>
                    </form>
                </div>
            </div>
        </>
    );
}