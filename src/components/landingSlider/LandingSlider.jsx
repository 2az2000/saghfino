import React, { useState } from "react";
import Card from "./card/Card";
import './landingSlider.css'

export default function LandingSlider() {
  // const [images , setImages] = useState([
  //     'src/assets/images/landingSlider1.png',
  //     'src/assets/images/landingSlider2.png',
  //     'src/assets/images/landingSlider3.png',
  //     'src/assets/images/landingSlider4.png',
  //     'src/assets/images/landingSlider1.png',
  //     'src/assets/images/landingSlider2.png',
  //     'src/assets/images/landingSlider3.png',
  //     'src/assets/images/landingSlider4.png',
  // ])
  const [newsCard, setNewsCard] = useState([
    {
      src: "src/assets/images/landingSlider1.png",
      title:
        "رکود بازار مسکن؛فروشندگان در انتظار خریداران و خریداران در انتظار شکست نرخ فروشندگان",
    },
    {
      src: "src/assets/images/landingSlider2.png",
      title:
        "خطر ویرانی زلزله در آسمان‌خراش‌ها بیشتر است یا در آپارتمان‌های کم‌ارتفاع و یا خانه‌های",
    },
    {
      src: "src/assets/images/landingSlider3.png",
      title:
        "بازار کساد کسب و کار معماران داخلی در پی بالا رفتن قیمت مواد و متریال اولیه و مصالح خارجی",
    },
    {
      src: "src/assets/images/landingSlider4.png",
      title:
        "شهرک ساحلی زمزم در منطقه نور استان مازندران از سوم شهریور وارد بازار مزایده شده است. ",
    },
    {
      src: "src/assets/images/landingSlider1.png",
      title:
        "رکود بازار مسکن؛فروشندگان در انتظار خریداران و خریداران در انتظار شکست نرخ فروشندگان",
    },
    {
      src: "src/assets/images/landingSlider2.png",
      title:
        "خطر ویرانی زلزله در آسمان‌خراش‌ها بیشتر است یا در آپارتمان‌های کم‌ارتفاع و یا خانه‌های",
    },
    {
      src: "src/assets/images/landingSlider3.png",
      title:
        "بازار کساد کسب و کار معماران داخلی در پی بالا رفتن قیمت مواد و متریال اولیه و مصالح خارجی",
    },
    {
      src: "src/assets/images/landingSlider4.png",
      title:
        "شهرک ساحلی زمزم در منطقه نور استان مازندران از سوم شهریور وارد بازار مزایده شده است. ",
    },
  ]);

  const [currentIndex, setCurrentSlide] = useState(0);
  const [isAnimation, setIsAnimation] = useState(false);

  function handlePrev() {
    if (isAnimation) return;
    setIsAnimation(true);
    setTimeout(() => {
      setCurrentSlide((prevIndex) =>
        prevIndex === 0 ? newsCard.length - 4 : prevIndex - 1
      );
      setIsAnimation(false);
    }, 100);
  }

  const handleNext = () => {
    if (isAnimation) return;
    setIsAnimation(true);
    setTimeout(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % newsCard.length);
      setIsAnimation(false);
    }, 100);
  };
  const visibleImages = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(newsCard[(currentIndex + i) % newsCard.length]);
    }
    return result;
  };

  return (
    <>
      <div className="main-slider flex justify-center py-16 px-32">
        <div className="slider-handler flex justify-between">
          <button className="rotate-180" onClick={handlePrev}>
            <img src="src/assets/images/arrow.png" alt="" />
          </button>
          <div className={`slider ${isAnimation ? 'animating' : ''} `}>
            {visibleImages().map((image, index) => (
              <Card
                key={index}
                src={image["src"]}
                poem={image["title"]}
                alt={`Slide ${index}`}
              />
            ))}
          </div>

          <button onClick={handleNext}>
            <img src="src/assets/images/arrow.png" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
