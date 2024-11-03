'use client'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useLocalStorage } from 'react-use';

export default function Login(){
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [user, setUser, removeUser] = useLocalStorage('user', {});
  
  // xử lý form 
  const onLogin = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`,data)
                                .then((res)=>res.data)
      // console.log(res.role);
     if(res.role == "GLV"){
       router.push('/')
       setUser(res)
     }else{
       alert('sai tên đăng nhập hoặc mật khẩu')
     }
      
    } catch (error) {
       console.log(error);
       
    }
     
  }


    return (
        <>
            <div className="h-96">
                <p className="text-3xl font-bold text-center mb-2">Đăng Nhập</p>
                <div className="flex justify-center">
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onLogin)}>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email1" value="Tên Đăng Nhập" />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Tên Đăng Nhập" required 
                                    {...register('name', { required: 'Tên đăng nhập là bắt buộc' })}  />
                                    {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password1" value="Mật Khẩu" />
                        </div>
                        <TextInput id="password1" type="password" placeholder="Nhập Mật Khẩu" required
                                    {...register('password', { required: 'Mật khẩu là bắt buộc' })} />
                                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                      </div>
                      <Button type="submit">Đăng Nhập</Button>
                    </form>
                </div>
            </div>
        </>
    );
}