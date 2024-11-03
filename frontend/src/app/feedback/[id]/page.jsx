'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Feedback({params}){
  const id = params.id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [child, setChild] = useState([])

  useEffect(() => {
    const getChild = async () =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/feedBack/${id}`).then((res) => res.data)
        setChild(res)
      } catch (error) {
        console.log(error);
      }
    }
    getChild()
  },[])
  console.log(child);

  const onFeedBack = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedBack/${id}`,data).then((res) => res.data)
      if(res){
        alert('Nhận xét thiếu nhi thành công')
        window.location.reload()
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
                <p class=" ms-5 italic text-2xl font-bold">Nhận Xét Thiếu Nhi</p>
                <form action="" onSubmit={handleSubmit(onFeedBack)}>
                <label className="ms-5 me-5 form-control">
                  <div className="label">
                    <span className="label-text">GLV nào đó</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Nhập Xét" 
                            {...register('description', { required: 'Chưa nhập nhận xét' })}></textarea>
                            {errors.description && <div className="text-red-500">{errors.description.message}</div>}
                </label>
                <button type="submit" className="btn bg-slate-600 text-cyan-50 ms-5 mt-2">Nhận Xét</button>
                </form>
                <p class=" ms-5 mt-2 italic text-xl font-bold">Các Nhận Xét Thiếu Nhi</p>
                    <div className=" ms-5 me-5 overflow-auto" style={{height:"125px"}}>
                      {child?.data?.map((tn) => {
                        return(
                            <div role="alert" className="alert alert-success mt-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{tn.description}</span>
                            </div>
                        )
                      })}
                    </div>
            </div>
        </>
    );
}