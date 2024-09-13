import { Badge } from "flowbite-react";

export default function Feedback(){
    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Điểm Danh Thiếu Nhi -  Lớp (...) - Ngày: 15.07.2024</p>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Họ & Tên</th>
                        <th>Điểm Danh</th>
                        <th>Số Lần Nghỉ</th>
                        <th>Ghi Chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th>1</th>
                        <td>Nguyễn Trần Anh Thư</td>
                        <td><input type="checkbox" className="toggle toggle-success" defaultChecked /></td>
                        <td><Badge  color="failure" size="sm">1/3</Badge></td>
                        <td><textarea className="textarea textarea-bordered" placeholder="Bio"></textarea></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr >
                        <th >
                          <button className="btn btn-success">Hoàn Tất</button>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
            </div>
        </>
    );
}