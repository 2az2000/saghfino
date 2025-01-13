import React from "react";
import "./card.css";

export default function Card({ src , title , poem }) {
  return (
    <>
      <div className="card-container w-1/4 flex flex-col rounded-2xl pb-8">
        <div className="info-card w-full flex flex-col items-center gap-3">
          <img className="w-full bg-cover" src={src} alt="" />
          <h2 className="text-base font-bold">{title}</h2>
          <p className="text-lg">{poem}</p>
        </div>
      </div>
    </>
  );
}
