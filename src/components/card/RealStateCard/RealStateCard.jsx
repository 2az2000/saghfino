/**
 * کامپوننت کارت نمایش املاک
 * این کامپوننت برای نمایش اطلاعات یک ملک در قالب یک کارت استفاده می‌شود
 *
 * @component
 * @param {Object} props - پراپرتی‌های کامپوننت
 * @param {string} props.imageUrl - آدرس تصویر ملک
 * @param {string} props.title - عنوان ملک
 * @param {string} props.address - آدرس ملک
 * @param {string} props.deposit - مبلغ رهن
 * @param {string} props.rent - مبلغ اجاره
 * @param {string} props.containerClassName - کلاس‌های container اصلی
 * @param {string} props.imageClassName - کلاس‌های تصویر
 * @param {string} props.titleClassName - کلاس‌های عنوان
 * @param {string} props.addressClassName - کلاس‌های آدرس
 * @param {string} props.priceClassName - کلاس‌های قیمت
 */

import React from "react";

export default function RealStateCard ({
  imageUrl ,
  title ,
  address, 
  deposit,
  rent ,
  containerClassName ,
  imageClassName ,
  titleClassName,
  addressClassName ,
  priceClassName ,
  city,
  staticTitle,
  buy
}) {
  return (
    <div className={containerClassName}>
      <img className={imageClassName} src={imageUrl} alt={title} />
          <p className="absolute right-0 top-0 font-bold bg-white p-1 rounded-lg ">{city}</p>
        <h3 className="text-sm font-medium text-[--Neutral-gray8] py-2 px-4">{staticTitle}</h3>
      <div className="name&save flex items-center justify-between py-2 px-4">
        <h3 className={titleClassName}>{title}</h3>
        <span>
          <img src="src/assets/images/icons/archive-minus.png" alt="save" />
        </span>
      </div>
      <p className={addressClassName}>{address}</p>
      <div className="price flex flex-col items-start justify-between px-4">

        <span className={priceClassName}>{deposit}</span>
        <span className={priceClassName}>{buy}</span>
        <span className={priceClassName}>{rent}</span>
      </div>
    </div>
  );
};

