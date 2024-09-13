'use client'

import { Footer } from "flowbite-react";

export default function End() {
  return (
    <Footer container>
    <Footer.Copyright href="/" by="Management Child Program Room" year={2022} />
    <Footer.LinkGroup>
      <Footer.Link href="#">Về Chúng Tôi</Footer.Link>
      <Footer.Link href="/login">Đăng Nhập</Footer.Link>
      <Footer.Link href="/sigin">Đăng Ký</Footer.Link>
      <Footer.Link href="#">Kết Nối</Footer.Link>
    </Footer.LinkGroup>
  </Footer>
  );
}
