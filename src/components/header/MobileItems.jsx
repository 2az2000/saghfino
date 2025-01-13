import React from "react";

export default function MobileItems({src , title}) {
  return (
    <div className="mobile-items flex justify-between">
      <div className="mobile-right-items flex gap-3">
        <img src={src} alt="" />
        <p>{title}</p>
      </div>
      <img
        className="mobile-left-items"
        src="src/assets/images/ham-menu/arrow-left.png"
        alt=""
        style={{backgroundSize: 'cover'}}
      />
    </div>
  );
}
