'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Header(){
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const router = useRouter()

    return(
        <>
            <div className="navbar bg-base-100 ">
              <div className="flex-1">
                <Link href="/child" className="btn btn-ghost text-xl font-mono">M.C.P.R</Link>
              </div>
              <div className="flex-none gap-2">
                <div className="form-control">
                  <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {/* <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li> */}
                    <li><button onClick={() => {Cookies.remove('user'); router.push('/child/login')}}>Logout</button></li>
                  </ul>
                </div>
              </div>
            </div>
        </>
    );
}