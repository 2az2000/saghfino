import React from "react";
import LandingTop from "../../components/LandingTop/LandingTop";
import Header from "../../components/header/Header";
import LandingShowRealEstate from "../../components/LandingShowRealEstate/LandingShowRealEstate";
import CentralThreeItem from "../../components/centralThreeItem/CentralThreeItem";
import SuggestedSearches from "../../components/SuggestedSearches/SuggestedSearches";
import Footer from "../../components/Footer/Footer";
import LandingSlider from "../../components/landingSlider/LandingSlider";
export default function HomeProUser() {
  const chanceCards = [
    {
      src: "src/assets/images/chanceCard/image1.png",
      poem: "مشاورین ما ۲۴ ساعته پاسخگوی سوالات ملکی شما هستند",
    },
    {
      src: "src/assets/images/chanceCard/image2.png",
      poem: "اگر در جست‌وجوی یک سقف نو هستید اینجا کلیک کنید",
    },
    {
      src: "src/assets/images/chanceCard/image3.png",
      poem: "با ثبت آسان آگهی، ملک خود را برای اجاره یا فروش اعلان کنید",
    },
  ];

  return (
    <div>
      <LandingTop>
        <Header className={"absolute m-auto top-16 mt-2"} />
      </LandingTop>
      <LandingShowRealEstate />
      <CentralThreeItem
        boldTitle="سقفینو فرصتی برای همه"
        title="اگر مالک یا در جست‌‌وجوی سقفی نو هستید، کلیک کنید"
        cards={chanceCards}
      />
      <SuggestedSearches />
      <LandingSlider
        cardType="RealEstateConsultant"
        containerClass="card-container min-w-[300px] lg:min-w-[calc(25%-1.25rem)] flex-shrink-0 flex flex-col py-5 rounded-2xl"
        imageClass="object-cover rounded-t-lg"
        sliderSectionClass="slider-section w-full px-4 lg:px-32 py-12 overflow-hidden"
      />
      <Footer />
    </div>
  );
}
