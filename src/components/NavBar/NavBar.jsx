import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logoTermart from "../../assets/Termart.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserTokenContext } from "./../../Context/UserTokenContext";
import { CartContext } from "./../../Context/CartContext";

export default function NavBar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(UserTokenContext);
  let { getCart } = useContext(CartContext);
  let [cartQuantityCount, setCartQuantityCount] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getQuantityProduct();
  }, []);

  async function getQuantityProduct() {
    let res = await getCart();
    setCartQuantityCount(res.numOfCartItems);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-yellow-100 text-gray-600 fixed top-0 left-0 right-0 px-6 z-50">
        <div className="container py-4 flex justify-between items-center mx-auto">
          {/* Left Side - Logo */}
          <Link to="home" className="flex items-center">
            <img width={30} src={logoTermart} alt="Logo" id="logo" />
          </Link>

          {/* Burger Icon for md screens */}
          <button className="lg:hidden text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fa-solid ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>

          {/* Links - Hidden on small screens */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row lg:gap-8 md:gap-4 items-center absolute lg:relative lg:top-auto lg:left-auto bg-yellow-100 w-full lg:w-auto top-16 left-0 lg:top-0 lg:left-0  sm: -translate-y-3 lg:translate-y-0`}
          >
            <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-4 lg:p-0 ">
              <li>
                <NavLink to="home" className="hover:text-gray-800">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="cart" className="hover:text-gray-800">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="brands" className="hover:text-gray-800">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to="categories" className="hover:text-gray-800">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="about" className="hover:text-gray-800">
                  About
                </NavLink>
              </li>
              {token ? (
                <li>
                  <button className="hover:text-gray-800" onClick={logout}>
                    SignOut
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="register" className="hover:text-gray-800">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="login" className="hover:text-gray-800">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              <i className="fa-solid fa-cart-shopping ">{cartQuantityCount}</i>

              <div className="flex gap-4 p-4 lg:p-0">
                <i className="fa-brands fa-facebook cursor-pointer"></i>
                <i className="fa-brands fa-instagram cursor-pointer"></i>
                <i className="fa-brands fa-twitter cursor-pointer"></i>
                <i className="fa-solid fa-phone cursor-pointer"></i>
                <i className="fa-brands fa-youtube cursor-pointer"></i>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
