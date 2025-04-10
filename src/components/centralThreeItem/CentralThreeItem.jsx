import React, { useState, useRef } from "react";
import Card from "../card/Card";
import "./counseling.css";

export default function CentralThreeItem({ cards , boldTitle , title }) {
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
      <div className="counseling-section w-full px-4 lg:px-32 pb-5">
        <h1 className="text-center mt-10 font-bold text-2xl">
          {boldTitle}
        </h1>
        <h2 className="text-center text-base mt-4">
          {title}
        </h2>
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
          {cards.map((card, index) => (
            <Card
              key={index}
              src={card.src}
              poem={card.poem}
              containerClass="card-container w-[45vw] lg:w-[30%] flex-shrink-0 lg:flex-shrink flex flex-col items-center px-3 py-5 rounded-2xl"
              cardClass="info-card flex flex-col items-center gap-6"
              poemClass="text-sm"
            />
          ))}
        </div>
      </div>
    </>
  );
}
