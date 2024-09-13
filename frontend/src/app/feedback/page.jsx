
export default function Feedback(){
    return (
        <>
            <div className="h-96">
                <p class=" ms-5 italic text-2xl font-bold">Nhận Xét Thiếu Nhi (Anh Thư) - Lớp (...)</p>
                <label className="ms-5 me-5 form-control">
                  <div className="label">
                    <span className="label-text">GLV nào đó</span>
                    <span className="label-text-alt">Alt label</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Nhập Xét"></textarea>
                </label>
            </div>
        </>
    );
}