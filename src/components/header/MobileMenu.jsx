import React from "react";
import MobileItems from "./MobileItems";
import "./header.css";


export default function MobileMenu({onClose, isMobile}) {
  return (
    <div className={`mobile-menu w-full h-screen fixed bg-white px-5 py-6 z-50 top-0 ${isMobile ? '' : 'close-mobile-menu'}`}>
      <div className="close-container flex justify-end">
        <img onClick={()=>onClose(false)} src="src/assets/images/close-circle.png" alt="" />
      </div>
      <div className="mobile-login-register flex gap-5">
        <img src="src/assets/images/profile-circle.png" alt="" />
        <p>ورود یا ثبت‌نام</p>
      </div>
      <div className="mobile-items-container flex flex-col gap-8 mt-6">
        <MobileItems
          src={"src/assets/images/ham-menu/add-circle.png"}
          title={"ثبت آگهی"}
        />
        <MobileItems
          src={"src/assets/images/ham-menu/house.png"}
          title={"اجاره خانه"}
        />
        <MobileItems
          src={"src/assets/images/ham-menu/key.png"}
          title={"خرید خانه"}
        />
        <MobileItems
          src={"src/assets/images/ham-menu/house-2.png"}
          title={"املاک و مستغلات"}
        />
        <MobileItems
          src={"src/assets/images/ham-menu/people.png"}
          title={"مشاورین املاک"}
        />
        <MobileItems
          src={"src/assets/images/ham-menu/receipt-2.png"}
          title={"اخبار روز"}
        />
      </div>
    </div>
  );
}
