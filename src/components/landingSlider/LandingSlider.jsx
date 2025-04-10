import React, { useEffect, useRef, useState } from "react";
import Card from "../card/Card";
import RealStateCard from "../card/RealStateCard/RealStateCard";
import "./landingSlider.css";
import pic from "../../assets/images/logo_url/RealEstateLogo2.png";
import { useSearch } from "../../context/SearchContext";

export default function LandingSlider({
  cardType,
  containerClass,
  imageClass,
  sliderSectionClass,
}) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRealEstate, setFilteredRealEstate] = useState([]);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const { searchType, selectedCity } = useSearch();

  // Get number of visible cards based on screen width
  const getVisibleCards = () => {
    if (cardType === "RealEstateConsultant") {
      return 2; // Always show 2 cards at a time for RealEstateConsultant
    }
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 1; // Mobile
      if (width < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 3; // Default for SSR
  };

  // Get card width based on card type and screen size
  const getCardWidth = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const gap = 0; // gap between cards
      let cardWidth;

      if (cardType === "RealEstateConsultant") {
        // For RealEstatePage, show 2 cards with equal width
        cardWidth = (containerWidth - gap) / 2;
      } else {
        if (window.innerWidth < 640) {
          cardWidth = 300; // min-w-[300px]
        } else if (window.innerWidth < 1024) {
          cardWidth = (containerWidth - gap) / 2;
        } else {
          cardWidth = (containerWidth - gap * 2) / 3;
        }
      }

      return cardWidth;
    }
    return 300; // fallback width
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3004/${cardType}`);
        if (!response.ok) {
          throw new Error("خطا در دریافت داده‌ها از سرور");
        }
        const data = await response.json();
        setCards(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError(error.message);
        // Fallback data in case of error
        setCards([
          {
            id: 1,
            src: "src/assets/images/news1.png",
            title: "اخبار و اطلاعات بازار مسکن",
          },
          {
            id: 2,
            src: "src/assets/images/news2.png",
            title: "راهنمای خرید و فروش ملک",
          },
          {
            id: 3,
            src: "src/assets/images/news3.png",
            title: "قوانین و مقررات معاملات ملکی",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cardType]);

  useEffect(() => {
    if (selectedCity) {
      const filtered = cards.filter(
        (item) => item.city.toLowerCase() === selectedCity.toLowerCase()
      );
      setFilteredRealEstate(filtered.slice(0, 10)); // Limit to 10 cards
    } else {
      setFilteredRealEstate(cards.slice(0, 10)); // Limit to 10 cards
    }
  }, [cards, selectedCity]);

  // Mouse handlers
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
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      const newScrollLeft = scrollLeft - walk;
      // Snap to card width
      const snappedScrollLeft =
        Math.round(newScrollLeft / cardWidth) * cardWidth;
      sliderRef.current.scrollLeft = snappedScrollLeft;
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      const newScrollLeft = scrollLeft - walk;
      // Snap to card width
      const snappedScrollLeft =
        Math.round(newScrollLeft / cardWidth) * cardWidth;
      sliderRef.current.scrollLeft = snappedScrollLeft;
    }
  };

  // Navigation handlers
  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (sliderRef.current) {
        const cardWidth = getCardWidth();
        sliderRef.current.scrollLeft += cardWidth * 2; // Move by 2 cards
      }
    }
  };

  const handleNextSlide = () => {
    const maxIndex = 8; // Maximum index for 10 cards (showing 2 at a time)
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      if (sliderRef.current) {
        const cardWidth = getCardWidth();
        sliderRef.current.scrollLeft -= cardWidth * 2; // Move by 2 cards
      }
    }
  };

  // Get button classes based on current index
  const getPrevButtonClass = () => {
    const baseClass =
      "prev-btn absolute z-10 bg-white rounded-full p-2 shadow-md";
    return `${baseClass} ${currentIndex === 0 ? "hide-left" : "left-0"}`;
  };

  const getNextButtonClass = () => {
    const maxIndex = 8; // Maximum index for 10 cards (showing 2 at a time)
    const baseClass =
      "next-btn absolute z-10 bg-white rounded-full p-2 shadow-md rotate-180";
    return `${baseClass} ${
      currentIndex >= maxIndex ? "hide-right" : "right-0"
    }`;
  };

  // Render card based on cardType
  const renderCard = (card) => {
    switch (cardType) {
      case "newsCard":
        return (
          <Card
            key={card.id}
            src={card.src}
            poem={card.title}
            containerClass="card-container min-w-[300px] lg:min-w-[calc(25%-1.25rem)] flex-shrink-0 flex flex-col pb-5 rounded-2xl"
            cardClass="info-card flex flex-col items-center gap-6"
            titleClass="text-xl font-bold"
            poemClass="text-sm text-center px-1"
          />
        );
      case "RealEstateConsultant":
        return (
          <Card
            key={card.id}
            src="src/assets/images/logo_url/RealEstateLogo1.png"
            title={card.company_name}
            city={card.city}
            neighborhood={card.neighborhood}
            rate={card.satisfaction_score}
            rent={card.rent?.monthly_rent}
            active_listings={card.active_listings}
            reviews={card.reviews?.length}
            cardClass="info-card flex flex-col items-center gap-6"
            titleClass="text-sm font-bold"
            poemClass="text-sm text-center px-1"
            adressClass="text-sm text-center px-1"
            containerClass={containerClass}
            imageClass="object-cover rounded-t-lg"
            active_listingsClass="text-sm font-medium "
            rateClass="text-sm font-medium text-[--Neutral-gray9]"
            reviewsClass="text-sm font-medium text-[--Neutral-gray9]"
          />
        );
      default:
        return null;
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  // Render empty state
  if (cards.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 text-lg">هیچ آیتمی موجود نیست</p>
      </div>
    );
  }

  return (
    <div className={sliderSectionClass}>
      <h1 className="text-start text-2xl font-bold">
        {cardType === "newsCard"
          ? "آخرین اخبار املاک را از سقفینو دنبال کنید"
          : cardType === "RealEstateConsultant" &&
            `املاک برتر ${selectedCity || ""}`}
      </h1>
      <div className="slider-container relative flex items-center mt-10">
        <button
          className={getPrevButtonClass()}
          onClick={handlePrevSlide}
          disabled={currentIndex === 0}
        >
          <img
            src="src/assets/images/arrow.png"
            alt="Previous"
            className="w-6 h-6"
          />
        </button>

        <div
          ref={sliderRef}
          className="slider-content w-full overflow-x-auto flex scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {filteredRealEstate.map((card) => renderCard(card))}
        </div>

        <button
          className={getNextButtonClass()}
          onClick={handleNextSlide}
          disabled={currentIndex >= 8}
        >
          <img
            src="src/assets/images/arrow.png"
            alt="Next"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}
