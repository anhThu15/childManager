'use client'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle,Button, Label, TextInput, Select, Datepicker, FileInput } from "flowbite-react";


export default function ListRoom(){
    return (
    <div>
      
        <Accordion style={{width: 239}} >
          <AccordionPanel>
            <AccordionTitle>Lớp Thêm Sức 1</AccordionTitle>
            <AccordionContent className="bg-slate-200">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Sỉ Số : 100
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                GLV: Thư
              </p>             
            </AccordionContent>
          </AccordionPanel>
        </Accordion>

        <button className="btn w-full" onClick={()=>document.getElementById('my_modal_2').showModal()}><i class="fa-solid fa-plus"></i></button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-3xl text-center">Thêm Lớp !</h3>
                    <form className="flex max-w-md flex-col gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label value="Lớp : " />
                        </div>
                        <TextInput id="email1" type="text" placeholder="Nhập Tên Lớp" required />
                      </div>

                      <div className="max-w-md">
                        <div className="mb-2 block">
                          <Label value="GLV:" />
                        </div>
                          <Select id="countries" required>
                            <option>Chọn Giáo Lý Viên</option>
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác...</option>
                          </Select>
                      </div>

                      <Button className="mt-3 bg-red-800" type="submit">Thêm Lớp !</Button>
                    </form>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
    </div>
      );
}