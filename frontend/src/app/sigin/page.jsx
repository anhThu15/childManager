import { Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";

export default function Sigin(){
    return (
        <>
            <div className="h-96 overflow-x-auto">
                <p className="text-3xl font-bold text-center mb-2">Đăng Ký</p>
                <div className="flex justify-center">
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
                          <Label value="Vai Trò:" />
                        </div>
                          <Select id="countries" required>
                            <option>Chọn Vai Trò</option>
                            <option>GLV</option>
                            <option>Thiếu Nhi</option>
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

                      <Button className="mt-3 bg-red-800" type="submit">Đăng Ký </Button>
                    </form>
                </div>
            </div>
        </>
    );
}