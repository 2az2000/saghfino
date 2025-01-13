import React, { useRef, useState, useEffect } from "react";
import "./landingTop.css";

export default function LandingTop({ children }) {

    // !   ---------------- autoWriter ( way 1 ) ----------------
  const [text] = useState([
    "سقفینو؛ سقفی برای همه",
    "سقفینو؛ سقفی برای تو",
  ]);
  const textContainer = useRef(null);

  let arrayText = 0; // نمایه متن جاری
  let textIndex = 0; // تعداد کاراکترهای نوشته شده از متن جاری
  let isPaused = false; // وضعیت مکث بین متون

  useEffect(() => {
    function updateText() {
      if (textContainer.current) {
        // در حال نوشتن متن جاری
        if (!isPaused) {
          textIndex++;
          textContainer.current.innerHTML = `${text[arrayText].slice(0, textIndex)}`;
        }

        // وقتی نوشتن متن جاری کامل شد
        if (textIndex === text[arrayText].length && !isPaused) {
          isPaused = true; // مکث فعال شود
          setTimeout(() => {
            arrayText++; // به متن بعدی بروید
            if (arrayText === text.length) arrayText = 0; // اگر به انتهای آرایه رسید، به ابتدا برگردید
            textIndex = 0; // شمارش متن را صفر کنید
            isPaused = false; // مکث غیرفعال شود
            updateText(); // بازنویسی ادامه پیدا کند
          }, 1500); // زمان مکث بین متون (1500 میلی‌ثانیه)
          return;
        }

        // ادامه نوشتن متن جاری
        if (!isPaused) {
          setTimeout(updateText, 400); // زمان نوشتن هر کاراکتر (100 میلی‌ثانیه)
        }
      }
    }

    updateText();
  }, [text]); // وابستگی به آرایه متن

    // !   ---------------- autoWriter ( way 2 ) ----------------

//   const textContainer = useRef(null);
//   const texts = ["سقفینو؛ سقفی برای همه", "سقفینو؛ سقفی برای تو"];
//   let currentTextIndex = 0; // متن جاری
//   let charIndex = 0; // تعداد کاراکترهای نوشته‌شده

//   useEffect(() => {
//     function writeText() {
//       if (!textContainer.current) return;

//       const currentText = texts[currentTextIndex]; // متن فعلی
//       textContainer.current.innerHTML = currentText.slice(0, charIndex); // نمایش کاراکترها

//       charIndex++; // حرکت به کاراکتر بعدی

//       if (charIndex > currentText.length) {
//         // وقتی متن کامل نوشته شد
//         charIndex = 0; // بازنشانی کاراکترها
//         currentTextIndex = (currentTextIndex + 1) % texts.length; // رفتن به متن بعدی
//         setTimeout(writeText, 1500); // مکث 1.5 ثانیه قبل از شروع متن بعدی
//       } else {
//         setTimeout(writeText, 100); // ادامه نوشتن کاراکترها (هر 100 میلی‌ثانیه)
//       }
//     }

//     writeText(); // شروع انیمیشن
//   }, [texts]);

  return (
    <> 
      <div className="landing-main w-full">
        {children}
        <h1
         ref={textContainer}
        ></h1>
        <h2 className="text-center">آسانی و سرعت در پیدا کردن یک سقف تازه را در سقفینو تجربه کنید</h2>
        <div className="landing-search-box w-1/2 flex bg-white rounded-2xl px-10 py-3 mt-20">
          <div className="loan w-1/2">
            <h3 className="text-center">اجاره</h3>
            <input type="text" className="w-full" placeholder="شهر مورد نظر را جست‌وجو کنید" />
          </div>
          <div className="buy w-1/2">
            <h3 className="text-center">خرید</h3>
            <input type="text" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
