import Cookies from "js-cookie";



export default function Hero(){
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    return(
        <>
        <div className="pt-5" >
            <div className="hero bg-base-200 ">
              <div className="hero-content flex-col lg:flex-row">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.avatar}`}
                  className=" rounded-lg shadow-2xl" style={{height:"300px", width:"300px"}} />
                <div>
                  <h1 className="text-5xl font-bold">Thông Tin Thiếu Nhi</h1>
                  <p className="py-1"><b>Tên:</b> {user.name} ({user.gender})</p>
                  <p className="py-1"><b>Ngày Tháng Năm Sinh:</b> {user.date}</p>
                  <p className="py-1"><b>Ngành:</b> {user.branh}</p>
                  <p className="py-1"><b>Số Điện Thoại:</b> {user.phone}</p>
                  <button className="btn btn-primary mt-3">Đơn Xin Nghỉ Phép Online</button>
                </div>
              </div>
            </div>
        </div>
        </>
    );
}