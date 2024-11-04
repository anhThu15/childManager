'use client'
import Cookies from 'js-cookie';

import { Footer } from "flowbite-react";
const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

export default function End() {
  return (
    <Footer container>
    <Footer.Copyright href="/" by="Management Child Program Room" year={2022} />
    <Footer.LinkGroup>
      <Footer.Link href="#">Về Chúng Tôi</Footer.Link>
      <Footer.Link href="/child/login">Đăng Nhập</Footer.Link>
      <Footer.Link href="/child/sigin">Đăng Ký</Footer.Link>
      {user ? (<></>):(<Footer.Link href="/choice">Kết Nối</Footer.Link>)}
      
    </Footer.LinkGroup>
  </Footer>
  );
}
