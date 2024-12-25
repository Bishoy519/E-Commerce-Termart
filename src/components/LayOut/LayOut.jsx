import React, { useEffect, useState } from "react";
import styles from "./LayOut.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function LayOut() {
  let [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <NavBar />
        </div>
        <main className="container mx-auto p-11 w-9/12 sm:w-4/5 mt-20 mb-40 flex-grow ">
          <Outlet />
        </main>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
}
