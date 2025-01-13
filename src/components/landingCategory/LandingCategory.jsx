import React from "react";
import Card from "./card/Card";

export default function LandingCaregory() {
  return (
    <>
      <section className="help-section py-12 px-32 ">
        <h1 className="text-2xl font-bold">
          در سقفینو دنبال چه نوع ملکی هستید
        </h1>
        <div className="card-handler flex gap-5 mt-8">
          <Card
            src="src/assets/images/residential house.png"
            title='۲۸.۹۰۰'
            poem='خانه مسکونی'
/>
          <Card
            src="src/assets/images/apa&tower.png"
            title="۳۰۹.۷۹۸"
            poem="آپارتمان و برج"
          />
          <Card
            src="src/assets/images/villa.png"
            title="۹۴۶"
            poem="ویلا"
          />
          <Card
            src="src/assets/images/business.png"
            title="۲۷.۳۳۹"
            poem="تجاری و اداری"
          />
        </div>
      </section>
    </>
  );
}
