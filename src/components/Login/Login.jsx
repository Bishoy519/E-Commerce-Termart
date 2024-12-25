import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import logoTermart from "../../assets/Termart.svg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserTokenContext } from "../../Context/UserTokenContext";

export default function Login() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [showHidePassword, setShowHidePassword] = useState(false);
  let tokenContext = useContext(UserTokenContext);
  let navigate = useNavigate();
  useEffect(() => {}, []);

  function signIn(formValue) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValue)
      .then((res) => {
        let { data } = res;
        setIsLoading(false);
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          tokenContext.setToken(data.token);
          navigate("/home");
        } else {
          console.log(data.token);
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
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .matches(/^[A-Z][a-z0-9]{3,8}/)
        .required("Required"),
    });
  };

  const myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signIn,
  });
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={logoTermart} alt="logo" /> Termart
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6">
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

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
                >
                  {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Sign to your account"}
                </button>

                {apiError && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{apiError}</span>
                  </div>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-0 ">
                  Create your account :
                  <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Register here
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Forgot your password? :
                  <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Reset Password
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
