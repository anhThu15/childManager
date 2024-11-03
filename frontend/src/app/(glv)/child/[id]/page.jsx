'use client'
import axios from "axios";
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function editChild({params}){
    // console.log(params.id);
  const id = params.id
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [detail, setDetail] = useState([])
  
  useEffect(()=>{
    const getDetail = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,{ revalidate: 3600 }).then((res) => res.data)
        setDetail(res.result)
        setValue('name',res.result.name)
        setValue('password',res.result.password)
        setValue('branh',res.result.branh)
        setValue('gender',res.result.gender)
        setValue('phone',res.result.phone)
        // setValue('date',res.result.date)
        setValue('avatar',res.result.avatar)
        setValue('id_parish',res.result.id_parish)
      } catch (error) {
        console.log(error);
        
      }
    }
    if(id){
      getDetail();
     }
 },[id, setValue])

//  console.log(detail);
 
  
  const onUpdate = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (data.avatar && data.avatar[0]) {
        formData.append('avatar', data.avatar[0]);
      }
      if (!data.date) {
        formData.append('date', date.value);
      }
      // Log formData để kiểm tra
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/updateChild/${id}`,formData);
      const result = res.data;
  
      if (result && result.status === 1) {
        alert('Thành công rồi, đi chữa lành thôi!');
        router.back();
      } else {
        console.error(result.message || 'Đã xảy ra lỗi.');
      }
    } catch (error) {
      console.log(error);
    }
    
  }
    return (
        <>
            <div className="h-96">
                <div className="ms-5 italic text-2xl font-bold">
                    <p className="text-center">Chỉnh Sửa Thông Tin Thiếu Nhi ({detail.name})</p>
                    <div className="overflow-y-scroll no-scrollbar h-80 flex justify-center">
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onUpdate)}>
                      <div>
                        <div className="mb-2 block">
                          <Label value="Họ & Tên : " />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Họ & Tên" required
                                   {...register('name', { required: 'Tên đăng nhập là bắt buộc' })} />
                                   {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                      </div>
                      
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



                      <input type="hidden" id="countries" required {...register('id_parish', { required: 'Giáo Xứ là bắt buộc' })}></input>



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
                          <Datepicker dateFormat="yyyy/MM/dd"  id="date"  />
                          {errors.date && <div className="text-red-500">{errors.date.message}</div>}
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="Ảnh Thiếu Nhi : " />
                        </div>
                          <FileInput id="file-upload"  {...register('avatar')} />
                          {/* {errors.avatar && <div className="text-red-500">{errors.avatar.message}</div>} */}
                      </div>

                      <Button className="mt-3 bg-red-800" type="submit">Đăng Ký </Button>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}