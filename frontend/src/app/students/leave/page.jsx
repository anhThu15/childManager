'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Feedback(){
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  

  useEffect(() => {

  },[])


  const onLeave = async (data) => {
    console.log(data);
    // try {
    //   const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedBack/${id}`,data).then((res) => res.data)
    //   if(res){
    //     alert('Nhận xét thiếu nhi thành công')
    //     window.location.reload()
    //   }else{
    //     alert('nhận xét thất bại')
    //   }

    // } catch (error) {
    //   console.log(error);
    // }
  }
  

    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Đơn Xin Nghỉ Phép</p>
                <form action="" onSubmit={handleSubmit(onLeave)}>
                <label className="ms-5 me-5 form-control">
                  <textarea className="textarea textarea-bordered h-24" placeholder="Nhập Xét" 
                            {...register('description', { required: 'Chưa nhập nhận xét' })}></textarea>
                            {errors.description && <div className="text-red-500">{errors.description.message}</div>}
                </label>
                <button type="submit" className="btn bg-slate-600 text-cyan-50 ms-5 mt-2">Nhận Xét</button>
                </form>
            </div>
        </>
    );
}