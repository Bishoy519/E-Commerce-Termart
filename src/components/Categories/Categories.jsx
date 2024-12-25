import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function Categories() {
  let [categories, setCategories] = useState([]);
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    pauseOnHover: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="sm:hidden lg:block lg:my-16">
        <Slider {...settings}>
          {categories.map((category, i) => (
            <div key={i}>
              <div className="py-5 px-2 border border-gray-300 mx-1 cursor-pointer rounded-md relative group overflow-hidden">
                <img
                  src={category.image}
                  className="h-[250px] w-full transition-transform duration-300 group-hover:scale-105"
                  alt="Category Image"
                />
                <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-300 ease-out group-hover:translate-x-full"></div>
                <h2 className="mt-3 text-center font-light text-xl tracking-normal hover:tracking-widest duration-75 ease-linear">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
