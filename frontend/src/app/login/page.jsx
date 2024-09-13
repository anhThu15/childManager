import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Login(){
    return (
        <>
            <div className="h-96">
                <p className="text-3xl font-bold text-center mb-2">Đăng Nhập</p>
                <div className="flex justify-center">
                    <form className="flex max-w-md flex-col gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email1" value="Tên Đăng Nhập" />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Tên Đăng Nhập" required />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password1" value="Mật Khẩu" />
                        </div>
                        <TextInput id="password1" type="password" placeholder="Nhập Mật Khẩu" required />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                      </div>
                      <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
}