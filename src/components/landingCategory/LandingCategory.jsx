import React, { useState, useRef } from "react";
import Card from "../card/Card";
import "./category.css";

export default function LandingCaregory() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <section className="category-section w-full py-12 lg:px-32">
        <h1 className="text-2xl font-bold px-4 lg:px-0">
          در سقفینو دنبال چه نوع ملکی هستید
        </h1>
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
          <Card
            src="src/assets/images/residential house.png"
            title="۲۸.۹۰۰"
            poem="خانه مسکونی"
            containerClass="card-container w-[45vw] lg:w-64 flex-shrink-0 lg:flex-shrink flex flex-col rounded-2xl pb-8"
            cardClass="info-card w-full flex flex-col items-center gap-3"
            imageClas="w-full bg-cover"
            titleClass="text-base font-bold"
            poemClass="text-lg"
          />
          <Card
            src="src/assets/images/apa&tower.png"
            title="۳۰۹.۷۹۸"
            poem="آپارتمان و برج"
            containerClass="card-container w-[45vw] lg:w-64 flex-shrink-0 lg:flex-shrink flex flex-col rounded-2xl pb-8"
            cardClass="info-card w-full flex flex-col items-center gap-3"
            imageClas="w-full bg-cover"
            titleClass="text-base font-bold"
            poemClass="text-lg"
          />
          <Card
            src="src/assets/images/villa.png"
            title="۹۴۶"
            poem="ویلا"
            containerClass="card-container w-[45vw] lg:w-64 flex-shrink-0 lg:flex-shrink flex flex-col rounded-2xl pb-8"
            cardClass="info-card w-full flex flex-col items-center gap-3"
            imageClas="w-full bg-cover"
            titleClass="text-base font-bold"
            poemClass="text-lg"
          />
          <Card
            src="src/assets/images/business.png"
            title="۲۷.۳۳۹"
            poem="تجاری و اداری"
            containerClass="card-container w-[45vw] lg:w-64 flex-shrink-0 lg:flex-shrink flex flex-col rounded-2xl pb-8"
            cardClass="info-card w-full flex flex-col items-center gap-3"
            imageClas="w-full bg-cover"
            titleClass="text-base font-bold"
            poemClass="text-lg"
          />
        </div>
      </section>
    </>
  );
}
