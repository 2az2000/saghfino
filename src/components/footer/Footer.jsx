import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <>
      <div className="footer h-screen w-screen">
        <h1 className="footer-title text-center p-10">
          سقفینو؛ سقفی ایده‌آل برای زندگی
        </h1>
        <div className="top-footer-menu w-full flex  justify-between px-44 py-7">
          <div className="top-footer-item flex flex-col gap-2">
            <p>بازارهای املاک و مستغلات</p>
            <ul>
              <li>بازار املاک و مستغلات تهران</li>
              <li>بازار املاک و مستغلات اصفهان</li>
              <li>بازار املاک و مستغلات شمال</li>
            </ul>
            <a href="#">مشاهده بیشتر</a>
          </div>
          <div className="top-footer-item flex flex-col gap-2">
            <p>بیشترین جست‌وجوها</p>
            <ul>
              <li>آپارتمان نزدیک مترو</li>
              <li>خانه نزدیک بر اصلی خیابان</li>
              <li>آپارتمان تک واحده</li>
            </ul>
            <a href="">مشاهده بیشتر</a>
          </div>
          <div className="top-footer-item flex flex-col gap-2">
            <p>پرامتیازترین مشاوران املاک</p>
            <ul>
              <li>میترا جباری</li>
              <li>حسام‌الدین عزیزی</li>
              <li>بهرام مشعوف</li>
            </ul>
            <a href="#">مشاهده بیشتر</a>
          </div>
          <div className="top-footer-item flex flex-col gap-2">
            <p>با ما در ارتباط باشید</p>
            <ul className="flex flex-col gap-1">
              <li className="flex gap-3">
                <img src="src/assets/images/call.png" alt="" />
                تلفن
              </li>
              <li className="flex gap-3">
                <img src="src/assets/images/instagram.png" alt="" />
                اینستاگرام
              </li>
              <li className="flex gap-3">
                <img src="src/assets/images/_Facebook.png" alt="" />
                تلگرام
              </li>
            </ul>
          </div>
        </div>
        <hr className="mx-auto mb-4"/>

        <div className="botton-footer-menu w-full flex px-44 ">
          <div className="about-footer w-2/5 pl-3 flex flex-col gap-3">
            <img src="src/assets/images/Logo-1.png" alt="" />
            <h2>تجربه لذت خانه‌دار شدن سریع و آسان</h2>
            <p>
              سقفینو پلی است تا به سرعت در بین هزاران آگهی ثبت‌شده جست‌وجو کنید.
              ملک مورد نظر را پیدا کنید و برای انجام معامله‌ای مطمئن، با مشاورین
              املاک معتمد و متخصص شهرتان در ارتباط باشید.
            </p>
          </div>
          <div className=" w-full flex justify-between">
            <div className="services-footer">
              <h2>خدمات</h2>
              <ul>
                <li>اجاره</li>
                <li>خرید</li>
                <li>ثبت رایگان آگهی ملک</li>
                <li>املاک و مستغلات</li>
                <li>مشاورین املاک</li>
                <li>اخبار روز املاک</li>
                <li>سوال ملکی دارید؟</li>
              </ul>
            </div>
            <div className="information">
              <h2>اطلاعات</h2>
              <ul>
                <li>دانلود اپلیکشن سقفینو</li>
                <li>تماس با ما</li>
                <li>داستان ‌سقفینو</li>
                <li>پرسش‌های پرتکرار</li>
                <li>یک سقف؛ بلاگ سقفینو </li>
                <li>حریم شخصی شما</li>
                <li>تعهدات ما و شما</li>
              </ul>
            </div>
            <div className="user-panel">
              <h2>حساب کاربری</h2>
              <ul>
                <li>پروفایل من</li>
                <li>ملک‌های نشان‌شده</li>
                <li>آگهی‌های من</li>
              </ul>
            </div>
          </div> 
        </div>
        <div className="footer-img">
          <img className="m-auto" src="src/assets/images/illustarion 2 1.png" alt="" />
        </div>
      </div>
    </>
  );
}
