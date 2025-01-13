import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LandingTop from "../../components/LandingTop/LandingTop";
import "./landing.css";
import LandingHelp from "../../components/landingHelp/LandingHelp";
import LandingCategory from "../../components/landingCategory/LandingCategory";
import LandingCounseling from "../../components/LandingCounseling/LandingCounseling";
import LandingSlider from "../../components/landingSlider/LandingSlider";

export default function Landing() {
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
        <Header />
      </LandingTop>
      <LandingHelp />
      <LandingCategory />
      <LandingCounseling />
      <LandingSlider />
      <Footer />
    </>
  );
}
