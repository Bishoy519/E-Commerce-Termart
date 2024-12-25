import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./../../Context/CartContext";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let { getCart, removeProduct, updateQuantityProduct, setCartId } = useContext(CartContext);
  let [cartInfo, setCartInfo] = useState(null);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    getCartProduct();
  }, []);

  async function getCartProduct() {
    let res = await getCart();
    setCartInfo(res);
    setCartId(res.data._id);
    console.log(res.data._id);
    setLoading(false);
  }

  async function removeProductItem(id) {
    setLoading(true);
    let res = await removeProduct(id);
    setCartInfo(res);
    setLoading(false);
  }

  function toCheckOut() {
    navigate("/checkout");
  }

  async function updateQProduct(id, count) {
    let res = await updateQuantityProduct(id, count);
    setCartInfo(res);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <MoonLoader />
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-green-400 font-bold text-center mt-5">Shopping Cart</h1>
      <div className="flex flex-wrap justify-between items-center gap-4 px-4 sm:px-6 md:px-8 mt-4">
        <h3 className="text-gray-600 text-lg sm:text-xl md:text-2xl font-bold">
          Total Cart Items: {cartInfo.numOfCartItems}
        </h3>
        <h3 className="text-gray-600 text-lg sm:text-xl md:text-2xl font-bold">
          Total Price: {cartInfo.data.totalCartPrice}
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs sm:text-sm md:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 sm:px-6 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Quantity of each product
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Price / Total
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartInfo.data.products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-12 sm:w-16 md:w-24 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-sm font-medium h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 flex items-center justify-center"
                      type="button"
                      onClick={() => updateQProduct(product.product.id, product.count - 1)}
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      className="bg-gray-50 w-12 sm:w-16 text-center border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={product.count}
                      readOnly
                    />
                    <button
                      className="p-1 text-sm font-medium h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 flex items-center justify-center"
                      type="button"
                      onClick={() => updateQProduct(product.product.id, product.count + 1)}
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} / {product.price * product.count}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      removeProductItem(product.product.id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center">
        <button onClick={toCheckOut} className="mt-3 px-5 py-3 bg-yellow-300 text-white rounded-lg">
          CheckOut
        </button>
      </div>
    </div>
  );
}
