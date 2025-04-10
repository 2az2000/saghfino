/**
 * کامپوننت LandingShowRealEstate
 *
 * این کامپوننت یک گرید از لیست املاک را بر اساس فیلترهای جستجو نمایش می‌دهد.
 * داده‌ها را از سرور دریافت کرده و بر اساس شهر انتخاب شده و نوع جستجو فیلتر می‌کند.
 * لیست‌ها در یک گرید 2x4 با 8 آیتم نمایش داده می‌شوند.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RealStateCard from "../card/RealStateCard/RealStateCard";
import { useSearch } from "../../context/SearchContext";

export default function LandingShowRealEstate() {
  // state برای ذخیره تمام لیست‌های املاک
  const [realEstate, setRealEstate] = useState([]);
  // state برای ذخیره لیست‌های فیلتر شده املاک
  const [filteredRealEstate, setFilteredRealEstate] = useState([]);
  // دریافت نوع جستجو و شهر انتخاب شده از SearchContext
  const { searchType, selectedCity } = useSearch();

  /**
   * دریافت داده‌های املاک از سرور در زمان mount کامپوننت
   * تنظیم هر دو state اصلی و فیلتر شده با داده‌های دریافتی
   */
  useEffect(() => {
    fetch("http://localhost:3004/realEstate")
      .then((response) => response.json())
      .then((data) => {
        setRealEstate(data);
        setFilteredRealEstate(data);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده‌های املاک:", error);
      });
  }, []);

  /**
   * فیلتر کردن لیست‌های املاک بر اساس شهر انتخاب شده
   * به‌روزرسانی state فیلتر شده هر زمان که شهر انتخاب شده یا لیست املاک تغییر کند
   */
  useEffect(() => {
    if (selectedCity) {
      const filtered = realEstate.filter((item) => {
        const cityMatch =
          item.city.toLowerCase() === selectedCity.toLowerCase();
        const transactionMatch =
          item.details?.transaction_type === "اجاره" ||
          item.details?.transaction_type === "رهن";
        return cityMatch && transactionMatch;
      });
      setFilteredRealEstate(filtered);
    } else {
      setFilteredRealEstate(realEstate);
    }
  }, [selectedCity, realEstate]);

  /**
   * تولید عنوان بخش بر اساس نوع جستجو و شهر انتخاب شده
   * @returns {string} عنوان فرمت شده بخش
   */
  const getSectionTitle = () => {
    if (!selectedCity) {
      return searchType === "rent"
        ? "آخرین آگهی‌های اجاره"
        : "آخرین آگهی‌های خرید";
    }
    return searchType === "rent"
      ? `آگهی‌های اجاره در ${selectedCity}`
      : `آگهی‌های خرید در ${selectedCity}`;
  };

  // دریافت 8 آیتم اول از آرایه فیلتر شده
  const lastEightItems = filteredRealEstate.slice(0, 8);

  console.log(lastEightItems.map((item) => item.details.transaction_type));

  // تابع فرمت‌بندی اعداد به فارسی با جداکننده
  const formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(number);
  };

  return (
    <div>
      <div className="landing-real-estate flex flex-col items-center justify-center py-10 px-4 lg:px-32">
        {/* هدر بخش با عنوان و لینک نمایش همه */}
        <div className="w-full flex items-center justify-between mt-10">
          <h2 className="text-2xl font-bold">{getSectionTitle()}</h2>
          <Link to="/">نمایش همه</Link>
        </div>

        {/* کانتینر اصلی برای گرید کارت‌های املاک */}
        <div className="w-full flex flex-col gap-8 mt-10">
          {/* ردیف اول - 4 کارت اول */}
          <div className="w-full grid grid-cols-4 gap-4">
            {lastEightItems.slice(0, 4).map((item, index) => (
              <RealStateCard
                key={index}
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
                } آپارتمان ${selectedCity}`}
                // staTitle={`${item.details.transaction_type === 'خرید' ? "خرید" : "رهن و اجاره"} آپارتمان ${selectedCity}`}
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
                containerClassName="real-state-card border border-gray-200 rounded-lg bg-[--Neutral-gray1] relative"
                imageClassName="w-full object-cover rounded-t-lg"
                titleClassName="text-md font-medium text-[--Neutral-gray9]"
                addressClassName="details-state py-2 px-4 text-sm font-medium text-[--Neutral-gray8]"
                priceClassName="text-sm font-medium"
              />
            ))}
          </div>

          {/* ردیف دوم - 4 کارت دوم */}
          <div className="w-full grid grid-cols-4 gap-4">
            {lastEightItems.slice(4, 8).map((item, index) => (
              <RealStateCard
                key={index + 4}
                imageUrl={
                  item.image_url
                    ? item.image_url.includes("home") &&
                      parseInt(item.image_url.match(/home(\d+)/)?.[1] || "0") >
                        7
                      ? "src/assets/images/icons/PhotoPlace.png"
                      : item.image_url
                    : "src/assets/images/icons/PhotoPlace.png"
                }
                staticTitle={`رهن و اجاره آپارتمان ${selectedCity}`}
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
                containerClassName="real-state-card border border-gray-200 rounded-lg bg-[--Neutral-gray1] relative"
                imageClassName="w-full object-cover rounded-t-lg"
                titleClassName="text-md font-medium text-[--Neutral-gray9]"
                addressClassName="details-state py-2 px-4 text-sm font-medium text-[--Neutral-gray8]"
                priceClassName="text-sm font-medium"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
