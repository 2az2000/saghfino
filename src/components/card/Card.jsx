import React from "react";
import "./card.css";

export default function Card({
  src,
  title,
  poem,
  containerClass,
  cardClass,
  imageClass,
  titleClass,
  poemClass,
  helpBtn,
  city,
  rate,
  neighborhood,
  adressClass,
  active_listings,
  active_listingsClass,
  rateClass,
  reviews,
  reviewsClass,
}) {
  return (
    <>
      <div className={containerClass}>
        <div className={cardClass}>
          <img className={imageClass} src={src} alt="" />
          {title && <h2 className={titleClass}>{title}</h2>}
          {poem && <p className={poemClass}>{poem}</p>}
          {city && (
            <p className={adressClass}>
              {city} , {neighborhood}
            </p>
          )}
          {rate && <p className={rateClass}>میزان رضایتمندی : {rate} از 5</p>}
          {active_listings && (
            <p className={active_listingsClass}>
              آگهی های فعال :{" "}
              {active_listings > 1000 ? (
                <span className="text-green-500">بیش از 1000 آگهی</span>
              ) : active_listings > 500 ? (
                <span className="text-green-500">بیش از 500 آگهی</span>
              ) : active_listings > 200 ? (
                <span className="text-green-500">بیش از 200 آگهی</span>
              ) : active_listings > 100 ? (
                <span className="text-green-500">بیش از 100 آگهی</span>
              ) : active_listings > 50 ? (
                <span className="text-yellow-500">بیش از 50 آگهی</span>
              ) : (
                <span className="text-red-500">کمتر از 50 آگهی</span>
              )}
            </p>
          )}
          {reviews && <p className={reviewsClass}>مشاهده نظرات کاربران ({reviews} نظر)</p>}
        </div>
        {helpBtn && <button className="help-btn">اجاره خانه</button>}
      </div>
    </>
  );
}
