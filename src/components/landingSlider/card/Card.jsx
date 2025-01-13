import React from "react";
import "./card.css";

export default function Card({ src, title, poem }) {
  return (
    <>
      <div className="card-container w-1/6 flex flex-col pb-5 rounded-2xl">
        <div className="info-card flex flex-col items-center gap-6">
          <img src={src} alt="" />
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {poem && <p className="text-smv text-center text-sm px-1">{poem}</p>}
        </div>
      </div>
    </>
  );
}
