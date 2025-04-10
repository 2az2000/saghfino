import React from "react";
import "./card.css";

export default function Card({ src , title , poem }) {
  return (
    <>
      <div className="card-container w-1/3 flex flex-col px-10 py-5 rounded-2xl">
        <div className="info-card flex flex-col items-center gap-6">
          <img  src={src} alt="" />
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm">{poem}</p>
        </div>
        <button className="help-btn">اجاره خانه</button>
      </div> 
    </>
  );
}
