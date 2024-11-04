'use client'
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ListTakeLeave(props){
  const id_user = props.id
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaves/${id_user}`,{ revalidate: 3600 }).then((res) => res.data)
      setUser(res)
      }
    getUser()
  },[])

  // console.log(user);

  const handleTrue = async (_id) => {
    // console.log(_id);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/leaves/update/${_id}`, {
        revalidate: 3600,
        check: true, // Truyền giá trị trực tiếp
      }).then((res) => res.data);
      if(res){
        alert('Thành Công rồi đi chữa lành thôi')
        window.location.reload()
      }else{
        alert('Thất Bại')
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleFalse = async (_id) => {
    // console.log(_id);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/leaves/update/${_id}`, {
        revalidate: 3600,
        check: false, 
      }).then((res) => res.data);
      if(res){
        alert('Thành Công rồi đi chữa lành thôi')
        window.location.reload()
      }else{
        alert('Thất Bại')
      }
    } catch (error) {
      console.log(error);
    }
    
    
  }
  

    return(
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableHeadCell>Người Viết</TableHeadCell>
                <TableHeadCell>Nội Dung</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {user.map((leave) => {
                  return(
                    <>
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                         {leave?.id_user?.name}
                        </TableCell>
                        <TableCell className="w-3/5">
                           <div className="text-wrap whitespace-nowrap font-medium text-gray-900">
                            {leave.date} <br />
                            {leave.description}
                          </div>
                        </TableCell>
                        <TableCell>
                            <button onClick={() => handleTrue(leave._id)} className="btn btn-outline btn-success me-3">Duyệt</button> 
                            <button onClick={() => handleFalse(leave._id)} className="btn btn-error">Không Duyệt</button>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}

              </TableBody>
            </Table>
          </div>
        </>
    );
}