import React, { useEffect, useState } from "react";
import RealStateCard from "../card/RealStateCard/RealStateCard";
import LandingSlider from "../landingSlider/LandingSlider";
import SuggestedSearches from "../SuggestedSearches/SuggestedSearches";
import MapWithGeocoding from "../MapWithGeocoding/MapWithGeocoding"

export default function RealEstatePage({ currentPage, onTotalPagesChange }) {
  const [realEstate, setRealEstate] = useState([]);
  const cardsPerPage = 12;

  useEffect(() => {
    fetch("http://localhost:3004/realEstate")
      .then((response) => response.json())
      .then((data) => {
        setRealEstate(data);
        // محاسبه تعداد کل صفحات و ارسال به کامپوننت والد
        const totalPages = Math.ceil(data.length / cardsPerPage);
        onTotalPagesChange(totalPages);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده‌های املاک:", error);
      });
  }, [onTotalPagesChange]);

  // محاسبه کارت‌های قابل نمایش در صفحه فعلی
  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return realEstate.slice(startIndex, endIndex);
  };

  const currentPageCards = getCurrentPageCards();
  const formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(number);
  };

  return (
    <div className="w-full flex mt-14">
      <div className="shoe-real-estate w-1/2 pr-20">
        <div className="title-box">
          <h1 className="text-2xl font-bold">املاک اجاره‌ای</h1>
          <div className="number&FilteredBox flex justify-between items-center">
            <p className="text-[--perimary-color]">
              {formatNumber(realEstate.length)} مورد یافت شد
            </p>
            <select className="filter-option w-[calc(50%-0.5rem)] lg:w-[120px] cursor-pointer px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 outline-none text-right pr-8 appearance-none bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50">
              <option value="" disabled selected>
                جدیدترین
              </option>
              <option value="tehranpars">قدیمی ترین</option>
              <option value="narmak">ارزان ترین</option>
              <option value="resalat">گران ترین</option>
            </select>
          </div>
        </div>

        {/* کانتینر اصلی برای نمایش کارت‌های املاک */}
        <div className="real-estate-card flex flex-wrap justify-between gap-y-3 mt-5">
          {currentPageCards.map((item, index) => (
            <React.Fragment key={index}>
              <RealStateCard
                imageUrl={
                  item.image_url
                    ? item.image_url.includes("home") &&
                      parseInt(item.image_url.match(/home(\d+)/)?.[1] || "0") >
                        7
                      ? "src/assets/images/icons/PhotoPlace.png"
                      : item.image_url
                    : "src/assets/images/icons/PhotoPlace.png"
                }
                staticTitle={`${
                  item.details.transaction_type === "خرید"
                    ? "خرید"
                    : "رهن و اجاره"
                } آپارتمان`}
                title={item.title}
                city={item.city}
                address={item.address}
                deposit={
                  item.details.transaction_type === "اجاره"
                    ? `${formatNumber(item.rent.deposit)} میلیون تومان پیش`
                    : item.details.transaction_type === "رهن"
                    ? `${formatNumber(item.rent.deposit)} میلیون تومان رهن کامل`
                    : null
                }
                rent={
                  item.details.transaction_type === "اجاره"
                    ? `${formatNumber(
                        item.rent.monthly_rent
                      )} میلیون تومان ماهیانه`
                    : null
                }
                buy={
                  item.details.transaction_type === "خرید" &&
                  `مبلغ خرید ${formatNumber(item.price)}`
                }
                containerClassName="real-state-card w-[calc(50%-0.5rem)] border border-gray-200 rounded-lg bg-[--Neutral-gray1] relative shadow-lg"
                imageClassName="w-full h-48 object-cover rounded-t-lg"
                titleClassName="text-md font-medium text-[--Neutral-gray9]"
                addressClassName="details-state py-2 px-4 text-sm font-medium text-[--Neutral-gray8]"
                priceClassName="text-sm font-medium"
              />

              {/* نمایش کامپوننت متفاوت بعد از هر 4 کارت */}
              {(index + 1) % 4 === 0 &&
                index !== currentPageCards.length - 1 &&
                (Math.floor(index / 4) % 2 === 0 ? (
                  <LandingSlider
                    cardType="RealEstateConsultant"
                    containerClass="card-container min-w-[300px] lg:min-w-[calc(25%-1.25rem)] flex-shrink-0 flex flex-col py-5 rounded-2xl"
                    imageClass="object-cover rounded-t-lg"
                    sliderSectionClass="slider-section w-full px-4 py-12 overflow-hidden"
                  />
                ) : (
                  <SuggestedSearches />
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="real-estate-map w-1/2 bg-red-300">
          {/* <MapWithGeocoding/> */}
      </div>
    </div>
  );
}
