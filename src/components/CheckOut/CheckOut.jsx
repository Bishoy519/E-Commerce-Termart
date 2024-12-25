import React, { useContext, useEffect, useState } from "react";
import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import { CartContext } from "./../../Context/CartContext";

export default function CheckOut() {
  let { cashOnDelivery, cartId } = useContext(CartContext);

  useEffect(() => {}, []);

  async function pay() {
    let res = await cashOnDelivery(cartId, myForm.values);
    console.log(res, cartId);
  }
  const myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: pay,
  });
  return (
    <>
      <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6">
        <div className="w-[60%] mx-auto">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Details
          </label>
          <input
            type="text"
            name="details"
            onChange={myForm.handleChange}
            value={myForm.values.details}
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="details"
          />

          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Phone
          </label>
          <input
            type="tel"
            name="phone"
            onChange={myForm.handleChange}
            value={myForm.values.phone}
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="01234567890"
          />

          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select your country
            </label>
            <select
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={myForm.handleChange}
              value={myForm.values.city}
              name="city"
            >
              <option value="">Select a city</option>

              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
            </select>
          </div>
          <button
            // disabled={}
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
          >
            Continue to Billing {/* {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Create an account"} */}
          </button>
        </div>
      </form>
    </>
  );
}
