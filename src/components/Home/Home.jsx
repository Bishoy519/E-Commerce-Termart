import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import RecentProduct from "./../RecentProduct/RecentProduct";
import Categories from "./../Categories/Categories";
import MainSlider from "./../MainSlider/MainSlider";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <>
      <MainSlider />
      <Categories />
      <RecentProduct />
    </>
  );
}
