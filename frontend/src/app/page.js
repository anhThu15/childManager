import Image from "next/image";
import ListRoom from "./componets/listRoom";
import DetailRoom from "./componets/detailRoom";

export default function Home() {
  return (
   <>
   <div className="h-96">
      <div className="grid grid-cols-12 text-wrap ">
        <div className="col-span-3">
          <div className=" overflow-y-scroll h-96">
              <div className="flex flex-wrap ">
                 <ListRoom/>
              </div>
          </div>
        </div>
        
        <div className="col-span-9 text-wrap bg-slate-200">
            <div className=" overflow-y-scroll h-96">
                <div className="flex flex-wrap">
                    <DetailRoom/>
                </div>
            </div>
        </div>
      </div>
   </div>
   </>
  );
}
