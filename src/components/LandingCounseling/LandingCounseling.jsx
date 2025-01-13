import React from 'react'
import Card from './card/Card'

export default function LandingCounseling() {
  return (
    <>
        <div className="LandingCounseling-container w-full px-32 pb-5">
            <h1 className='text-center mt-10 font-bold text-2xl'>همه به شما مشاوره می‌دهند!</h1>
            <h2 className='text-center text-base mt-4'>اما در سقفینو مشاوران املاک کِنار شما می‌مانند</h2>
            <div className="card-handler flex justify-evenly mt-10">
                <Card src='src/assets/images/lettelTime.png' poem='امکان خرید و اجاره ملک در اکثر نقاط کشور'/>
                <Card src='src/assets/images/locationHome.png' poem='مقایسه و بررسی صدها ملک براحتی و در کمترین زمان '/>
                <Card src='src/assets/images/comeniuty.png' poem='ارتباط آسان با برترین املاک و مشاورین کشور'/>
            </div>
        </div>
    </>
)
}
