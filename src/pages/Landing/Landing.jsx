import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LandingTop from "../../components/LandingTop/LandingTop";
import "./landing.css";
import LandingHelp from "../../components/landingHelp/LandingHelp";
import LandingCategory from "../../components/landingCategory/LandingCategory";
import CentralThreeItem from "../../components/centralThreeItem/CentralThreeItem";
import LandingSlider from "../../components/landingSlider/LandingSlider";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

export default function Landing() {
  const counselingCards = [
    {
      src: "src/assets/images/lettelTime.png",
      poem: "امکان خرید و اجاره ملک در اکثر نقاط کشور",
    },
    {
      src: "src/assets/images/locationHome.png",
      poem: "مقایسه و بررسی صدها ملک براحتی و در کمترین زمان",
    },
    {
      src: "src/assets/images/comeniuty.png",
      poem: "ارتباط آسان با برترین املاک و مشاورین کشور",
    },
  ];

  //   const parallaxRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (parallaxRef.current) {
  //       const scrollY = window.scrollY;
  //       parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <>
      <LandingTop>
        <Header className={"absolute m-auto top-16 mt-2"}/>
      </LandingTop>
      <LandingHelp />
      <LandingCategory />
      <CentralThreeItem boldTitle="همه به شما مشاوره می‌دهند!" title="اما در سقفینو مشاوران املاک کِنار شما می‌مانند" cards={counselingCards} />
      <LandingSlider cardType="newsCard"/>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
