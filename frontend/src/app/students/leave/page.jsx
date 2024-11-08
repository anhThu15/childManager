'use client'
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback(){
  const [leaves, setLeaves] = useState([])
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const id = user._id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter()
  
  useEffect(() => {
    const getLeaves = async () =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaves/rep/${id}`).then((res) => res.data)
        setLeaves(res)
      } catch (error) {
        console.log(error);
      }
    }
    getLeaves()
  },[])

// console.log(leaves);

  const onLeave = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/leaves/add/${id}`,data).then((res) => res.data)
      if(res){
        alert('Nhận xét thiếu nhi thành công')
        // router.back()
      }else{
        alert('nhận xét thất bại')
      }

    } catch (error) {
      console.log(error);
    }
  }
  

    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Đơn Xin Nghỉ Phép</p>
                <form action="" onSubmit={handleSubmit(onLeave)}>
                {/* <div className="max-w-md ms-5 me-5">
                        <div className="mb-2 block">
                          <Label value="Ngày Muốn Nghỉ " />
                        </div>
                          <Datepicker dateFormat="yyyy/MM/dd"  id="date" onChange={(date) => setValue('date', date)}  />
                          {errors.date && <div className="text-red-500">{errors.date.message}</div>}
                </div> */}
                <label className="ms-5 me-5 form-control">
                  <textarea className="textarea textarea-bordered h-24" placeholder="Nhập Xét" 
                            {...register('description', { required: 'Chưa nhập nhận xét' })}></textarea>
                            {errors.description && <div className="text-red-500">{errors.description.message}</div>}
                </label>
                <button type="submit" className="btn bg-slate-600 text-cyan-50 ms-5 mt-2">Gửi</button>
                </form>
                <p class=" ms-5 mt-2 italic text-xl font-bold">Trả Lời Của GLV:</p>
                    <div className=" ms-5 me-5 overflow-auto" style={{height:"140px"}}>
                      {leaves.map((tn) => { 
                        if (tn.check === null || tn.check === undefined) {
                          return (
                            <div role="alert" className="alert alert-warning mt-2">
                              <span>{tn.description || 'Không có thông tin'}</span> 
                            </div>
                          );
                        }
                        return (
                          <div role="alert" className={`alert alert-${tn.check ? 'success' : 'error'} mt-2`}>
                            <span>{tn.description}</span>
                          </div>
                        );
                      })} 
                    </div>
            </div>
        </>
    );
}