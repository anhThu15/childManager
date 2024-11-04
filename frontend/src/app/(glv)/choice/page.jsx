'use client'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import axios from "axios";
import Link from "next/link";

export default function Login(){
  const router = useRouter();
  
  


    return (
        <>
            <div className="h-96">
                <p className="text-3xl font-bold text-center mb-2 pt-5">Bạn là GLV hay là Thiếu Nhi ?</p>
                <div className="text-center pt-5">
                    <Link href={'/login'} className="btn btn-outline me-2">Giáo Lý Viên</Link>
                    <Link href={'/child/login'} className="btn btn-outline btn-info">Thiếu Nhi</Link>
                </div>
            </div>
        </>
    );
}