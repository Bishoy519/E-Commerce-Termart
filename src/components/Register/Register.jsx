import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoTermart from "../../assets/Termart.svg";

export default function Register() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [showHidePassword, setShowHidePassword] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {}, []);

  function signUp(formValue) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValue)
      .then((res) => {
        let { data } = res;
        console.log(res);
        setIsLoading(false);
        if (data.message == "success") {
          navigate("/login");
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setApiError(err.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().min(3, "Name not less than 3").max(10, "Maximum letters 10").required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,8}/,
          "Invalid input! The string must start with an uppercase letter and be followed by 3 to 8 lowercase letters or digits."
        )
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Re-password shoud match the password")
        .required("Required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/)
        .required("Required"),
    });
  };

  const myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: signUp,
  });
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={logoTermart} alt="logo" />
            Termart
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onBlur={myForm.handleBlur}
                    onChange={myForm.handleChange}
                    value={myForm.values.name}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                  />
                </div>
                {myForm.errors.name && myForm.touched.name ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{myForm.errors.name}</span>
                  </div>
                ) : null}

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onBlur={myForm.handleBlur}
                    onChange={myForm.handleChange}
                    value={myForm.values.email}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                {myForm.errors.email && myForm.touched.email ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{myForm.errors.email}</span>
                  </div>
                ) : null}

                <div className="relative">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type={showHidePassword ? "text" : "password"}
                    name="password"
                    onBlur={myForm.handleBlur}
                    onChange={myForm.handleChange}
                    value={myForm.values.password}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <i
                    className={
                      showHidePassword
                        ? "absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer fa-regular fa-eye"
                        : "absolute right-3 top-1/2 transform translate-y-1/2 cursor-pointer fa-regular fa-eye-slash"
                    }
                    onClick={() => setShowHidePassword(!showHidePassword)}
                  ></i>
                </div>
                {myForm.errors.password && myForm.touched.password ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{myForm.errors.password}</span>
                  </div>
                ) : null}

                <div>
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type={showHidePassword ? "text" : "password"}
                    name="rePassword"
                    onBlur={myForm.handleBlur}
                    onChange={myForm.handleChange}
                    value={myForm.values.rePassword}
                    id="rePassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {myForm.errors.rePassword && myForm.touched.rePassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{myForm.errors.rePassword}</span>
                  </div>
                ) : null}

                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    onBlur={myForm.handleBlur}
                    onChange={myForm.handleChange}
                    value={myForm.values.phone}
                    id="phone"
                    placeholder="012345678910"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {myForm.errors.phone && myForm.touched.phone ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{myForm.errors.phone}</span>
                  </div>
                ) : null}

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
                >
                  {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Create an account"}{" "}
                </button>

                {apiError && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{apiError}</span>
                  </div>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <i className="fa-solid fa-eye"></i> */
}
{
  /* <i className="fa-solid fa-eye-slash"></i> */
}
