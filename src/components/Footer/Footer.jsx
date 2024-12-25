import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { Link, NavLink } from "react-router-dom";
import logoTermart from "../../assets/Termart.svg";

export default function Footer() {
  useEffect(() => {}, []);
  return (
    <>
      <footer className="bg-[#B8001F] fixed bottom-0 left-0 right-0 text-center z-40 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="home" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logoTermart} className="h-6" alt="Termart Logo" />
              <span className="text-lg font-semibold whitespace-nowrap">Termart</span>
            </Link>
            <ul className="flex flex-wrap items-center text-sm font-medium">
              <li>
                <Link to="about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="privacy-policy" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="licensing" className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700" />
          <span className="block text-xs sm:text-center">
            © 2024
            <Link to="home" className="hover:underline">
              Termart™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
