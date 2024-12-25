import React, { useEffect, useState } from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../assets/main-slider1.jpg";
import slider2 from "../../assets/main-slider2.jpg";
import slider3 from "../../assets/main-slider3.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="sm:hidden lg:flex row justify-center items-center rounded-md p-6 overflow-hidden">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slider2} className="h-[500px]" alt="" />
            <img src={slider3} className="h-[500px]" alt="" />
            <img src={slider1} className="h-[500px]" alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slider2} className="h-[250px]" alt="" />
          <img src={slider3} className="h-[250px]" alt="" />
        </div>
      </div>
    </>
  );
}
