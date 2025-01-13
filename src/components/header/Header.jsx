import React, { useRef, useState } from "react";
import "./header.css";
import MobileItems from "./MobileItems";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const header = useRef(null);
  console.log(isMobile);
  

  // navbar scroll efect
  window.addEventListener("scroll", function () {
    header.current.classList.toggle("sticky1", this.window.scrollY > 0);
    console.log(header.current);
  });

  // hamberger menu

  return (
    <>
      <MobileMenu onClose={setIsMobile} isMobile={isMobile} />
      <div
        ref={header}
        className="header w-5/6 h-24 flex justify-between items-center bg-white absolute m-auto top-16 rounded-2xl mt-2 z-10 px-6"
      >
        <img
          className="ham-menu"
          onClick={() => setIsMobile(true)}
          src="src/assets/images/hamberger-menu.png"
          alt=""
        />
        <div className="header-logo-nav flex items-center gap-16">
          <div className="header-logo">
            <img src="src/assets/images/Logo-1.png" alt="" />
          </div>
          <div className="header-navbar">
            <ul className="flex gap-5">
              <li>اجاره</li>
              <li>خرید</li>
              <li>املاک و مستغلات</li>
              <li>مشاورین املاک</li>
              <li>اخبار روز</li>
            </ul>
          </div>
        </div>
        <div className="header-btns flex gap-7">
          <button className="login-btn">ورود</button>
          <button className="btn ">ثبت آگهی</button>
        </div>
      </div>
    </>
  );
}
