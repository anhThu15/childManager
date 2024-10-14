'use client'
import { Badge } from "flowbite-react";
import useSWR from "swr";
const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Check(){

  const id_parish = '66e3f7dda2a2f5d37a91fa51'
  const id_room = '66e3f97aa2a2f5d37a91fa5a'

  const { data, error, isLoading } = useSWR(`http://localhost:3000/rooms/detailRoom/${id_parish}/${id_room}`, fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;
  // console.log(data);
  
    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Điểm Danh Thiếu Nhi -  Lớp (...) - Ngày: 15.07.2024</p>
                <div className="overflow-x-auto" style={{height:350}}>
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
                      {data.result.map((child, index) => {
                        const{_id , name} = child
                        return(
                          <tr key={_id}>
                            <th>{index + 1}</th>
                            <td>{name}</td>
                            <td><input type="checkbox" className="toggle toggle-success" defaultChecked /></td>
                            <td><Badge  color="failure" size="sm">1/3</Badge></td>
                            <td><textarea className="textarea textarea-bordered" placeholder="Bio"></textarea></td>
                          </tr>
                        )
                      })}
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