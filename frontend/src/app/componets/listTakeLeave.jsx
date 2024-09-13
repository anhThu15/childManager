'use client'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Link from "next/link";


export default function ListTakeLeave(){
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
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Anh Thư
                  </TableCell>
                  <TableCell className="w-3/5">
                     <div className="text-wrap whitespace-nowrap font-medium text-gray-900">
                     New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
                    </div>
                  </TableCell>
                  <TableCell>
                      <button className="btn btn-outline btn-success me-3">Duyệt</button> 
                      <button className="btn btn-error">Không Duyệt</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
    );
}