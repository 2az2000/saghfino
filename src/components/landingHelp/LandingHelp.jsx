import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import './help.css'

export default function LandingHelp() {
  // const [offsetY , setOffsetY] = useState(0)
  // const handleOffset = () =>{setOffsetY(window.pageYOffset)}

  // useEffect(()=>{
  //   window.addEventListener("scroll",handleOffset)

  //   return ()=> window.removeEventListener("scroll",handleOffset)
  // },[])
  return (
    <>
      <section className="help-section mt-20 py-16 px-32 ">
          
          <h1  className="text-2xl font-bold">
          سقفینو چطور به خانه‌دار شدن شما کمک می‌کند{" "}
        </h1>
        <div className="card-handler flex gap-5 mt-8">
          <Card
            src="src/assets/images/easyLOan.png"
            title="به آسانی یک خانه اجاره کنید"
            poem="در میان صدها آگهی که روزانه به وب‌سایت سقفینو افزوده می‌شود، با استفاده از بیش از ۲۸ فیلتر کاربردی تلاش کرده‌ایم خانه‌ای که در جست‌وجوی آن هستید را هر چه سریعتر پیدا و اجاره کنید."
          />
          <Card
            src="src/assets/images/favoriteHome.png"
            title="خانه مورد علاقه‌تان را بخرید"
            poem="بالای ۱ میلیون آگهی فروش در وب‌سایت سقفینو وجود دارد.
ما علاوه بر آگهی‌های فراوان با به‌کارگیری املاک و مشاورین متخصص در هر شهر، تلاش می‌کنیم در تجربه لذت یک خرید آسان با شما سهیم باشد."
          />
          <Card
            src="src/assets/images/maleck.png"
            title="مالک هستید؟"
            poem="آیا می‌دانید میانگین بازدید از وب‌سایت به‌طور متوسط روزانه بالای هزاران نفر است؟
پس به‌سادگی و با چند کلیک ساده، ملک‌تان را به‌صورت رایگان در سقفینو آگهی و در سریع‌ترین زمان ممکن معامله کنید."
          />
        </div>
      </section>
    </>
  );
}
