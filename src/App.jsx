import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import LayOut from "./components/LayOut/LayOut";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Contact from "./components/Contact/Contact";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedLogin from "./components/ProtectedLogin/ProtectedLogin";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Licensing from "./components/Licensing/Licensing";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CounterContextProvider from "./Context/CounterContext";
import UserTokenContextprovider from "./Context/UserTokenContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/production";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";

let query = new QueryClient();

const routers = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedLogin>
            <Register />
          </ProtectedLogin>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>
        ),
      },

      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoutes>
            <Contact />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <ProtectedRoutes>
            <PrivacyPolicy />
          </ProtectedRoutes>
        ),
      },
      {
        path: "licensing",
        element: (
          <ProtectedRoutes>
            <Licensing />
          </ProtectedRoutes>
        ),
      },
      {
        path: "productDetails/:id/:categoryId",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={query}>
        <UserTokenContextprovider>
          <CounterContextProvider>
            <CartContextProvider>
              <ReactQueryDevtools></ReactQueryDevtools>
              <Toaster />
              <RouterProvider router={routers}></RouterProvider>
            </CartContextProvider>
          </CounterContextProvider>
        </UserTokenContextprovider>
      </QueryClientProvider>
    </>
  );
}

export default App;
