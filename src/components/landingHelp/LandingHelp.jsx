import React, { useEffect, useState, useRef } from "react";
import Card from "../card/Card";
import "./help.css";

export default function LandingHelp() {
  // State to control dragging status
  const [isDragging, setIsDragging] = useState(false);
  // Starting point of drag
  const [startX, setStartX] = useState(0);
  // Horizontal scroll position
  const [scrollLeft, setScrollLeft] = useState(0);
  // Reference to slider element
  const sliderRef = useRef(null);

  // Handler for mouse drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Handler for drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handler for mouse movement during drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handler for touch start on mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Handler for touch movement on mobile
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <section className="help-section w-full overflow-hidden mt-20 px-4 py-16 lg:px-32">
        <h1 className="text-2xl font-bold">
          سقفینو چطور به خانه‌دار شدن شما کمک می‌کند{" "}
        </h1>
        {/* Main slider container - scrollable on mobile, all cards visible on desktop */}
        <div
          ref={sliderRef}
          className="card-handler w-full overflow-x-auto flex gap-3 mt-8 cursor-grab px-2 lg:px-0 lg:justify-between lg:overflow-x-visible lg:cursor-default"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {/* First card - 45% viewport width on mobile, 30% on desktop */}
          <Card
            src="src/assets/images/easyLOan.png"
            title="به آسانی یک خانه اجاره کنید"
            poem="در میان صدها آگهی که روزانه به وب‌سایت سقفینو افزوده می‌شود، با استفاده از بیش از ۲۸ فیلتر کاربردی تلاش کرده‌ایم خانه‌ای که در جست‌وجوی آن هستید را هر چه سریعتر پیدا و اجاره کنید."
            containerClass="card-container w-[45vw] lg:w-[30%] flex-shrink-0 lg:flex-shrink flex flex-col px-10 py-5 rounded-2xl justify-between"
            cardClass="info-card flex flex-col items-center gap-6"
            imageClass="w-full bg-cover"
            titleClass="text-xl font-bold"
            poemClass="text-sm"
            helpBtn={true}
          />
          <Card
            src="src/assets/images/favoriteHome.png"
            title="خانه مورد علاقه‌تان را بخرید"
            poem="بالای ۱ میلیون آگهی فروش در وب‌سایت سقفینو وجود دارد.
ما علاوه بر آگهی‌های فراوان با به‌کارگیری املاک و مشاورین متخصص در هر شهر، تلاش می‌کنیم در تجربه لذت یک خرید آسان با شما سهیم باشد."
            containerClass="card-container w-[45vw] lg:w-[30%] flex-shrink-0 lg:flex-shrink flex flex-col px-10 py-5 rounded-2xl justify-between"
            cardClass="info-card flex flex-col items-center gap-6"
            imageClass="w-full bg-cover"
            titleClass="text-xl font-bold"
            poemClass="text-sm"
            helpBtn={true}
          />
          <Card
            src="src/assets/images/maleck.png"
            title="مالک هستید؟"
            poem="آیا می‌دانید میانگین بازدید از وب‌سایت به‌طور متوسط روزانه بالای هزاران نفر است؟
پس به‌سادگی و با چند کلیک ساده، ملک‌تان را به‌صورت رایگان در سقفینو آگهی و در سریع‌ترین زمان ممکن معامله کنید."
            containerClass="card-container w-[45vw] lg:w-[30%] flex-shrink-0 lg:flex-shrink flex flex-col px-10 py-5 rounded-2xl justify-between"
            cardClass="info-card flex flex-col items-center gap-6"
            imageClass="w-full bg-cover"
            titleClass="text-xl font-bold"
            poemClass="text-sm"
            helpBtn={true}
          />
        </div>
      </section>
    </>
  );
}
