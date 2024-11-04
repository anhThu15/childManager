import ListTakeLeave from "../../componets/listTakeLeave";

export default function takeleave({params}){
    return (
        <>
            <div className="h-96">
                <p className=" ms-5 italic text-2xl font-bold">Đơn xin nghỉ</p>
                <div className="ms-5 me-5">
                    <ListTakeLeave id={params.id}/>
                </div>
            </div>
        </>
    );
}