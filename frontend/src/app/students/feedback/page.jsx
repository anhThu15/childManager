'use client'
import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Feedback(){
  const [feedbacks, setfeedbacks] = useState([])
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const id = user._id
  
  useEffect(() => {
    const getFeeback = async () =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaves/feedback/${id}`).then((res) => res.data)
        setfeedbacks(res)
      } catch (error) {
        console.log(error);
      }
    }
    getFeeback()
  },[])


    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Quánh giá của Giáo Lý Viên</p>
                    <div className=" ms-5 me-5">
                      {feedbacks.map((tn) => { 
                        return (
                          <div role="alert" className={`alert alert-success mt-2`}>
                            <span>{tn.date}</span>
                            <span>{tn.description}</span>
                          </div>
                        );
                      })} 
                    </div>
            </div>
        </>
    );
}