import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";

export default function editChild({params}){
    // console.log(params.id);
    return (
        <>
            <div className="h-96">
                <div className="ms-5 italic text-2xl font-bold">
                    <p className="text-center">Chỉnh Sửa Thông Tin Thiếu Nhi #{params.id}</p>
                    <div className="overflow-y-scroll no-scrollbar h-80 flex justify-center">
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
    
                          <Button className="mt-3 bg-red-800" type="submit">Sửa !</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}