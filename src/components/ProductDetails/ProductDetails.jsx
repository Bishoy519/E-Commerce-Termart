import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { Toaster, toast } from "react-hot-toast";

export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState([]);
  let [relatedProducts, setRelatedProducts] = useState([]);
  let { id, categoryId } = useParams();
  let [cartInfo, setCartInfo] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  useEffect(() => {
    getRelatedProducts();
    getProductDetails();
  }, [id]);

  useEffect(() => {
    getRelatedProducts();
  }, [categoryId]);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["Details", id],
    queryFn: getProductDetails,
    refetchInterval: 10000,
    select: (data) => data?.data.data || {},
  });
  console.log(data);

  useEffect(() => {
    setProductDetails(data);
  }, [data]);

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        getFilterData(data.data);
      })
      .catch((err) => console.log(err));
  }
  let { addProductToCart } = useContext(CartContext);
  async function addToCartItem(id) {
    let data = await addProductToCart(id);
    setCartInfo(data);
    if (data?.data?.status == "success") {
      toast.success(data.data.message);
    } else {
      toast.error(data.response.data.message);
    }
  }

  function getFilterData(data) {
    let res = data.filter((ele) => ele.category._id == categoryId && ele._id != id);
    setRelatedProducts(res);
  }
  return (
    <>
      <div className="row mb-36">
        {!isLoading ? (
          <>
            <div className="flex justify-center items-center mx-auto gap-x-32">
              <div className="w-1/3">
                <div className="inner">
                  <div className="slider-container">
                    <Slider {...settings}>
                      {productDetails?.images.map((src, index) => (
                        <div key={index}>
                          <img src={src} alt={`Slide ${index + 1}`} className="w-full max-h-[450px] object-cover" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                <div className="inner">
                  <h1 className="text-4xl font-light mb-5">{productDetails?.title}</h1>
                  <p>{productDetails?.description}</p>
                  <h4>{productDetails?.category.name}</h4>
                  <div className="flex justify-between">
                    <span>{productDetails?.price} EGP</span>
                    <span className="hover:underline">
                      {productDetails?.ratingsAverage}
                      {productDetails?.ratingsAverage < 3 ? (
                        <i className="fa-solid fa-star text-redy ms-1"></i>
                      ) : productDetails?.ratingsAverage < 4 ? (
                        <i className="fa-solid fa-star text-orange-400 ms-1"></i>
                      ) : (
                        <i className="fa-solid fa-star text-green-400 ms-1"></i>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCartItem(productDetails?.id);
                  }}
                  className="btn transition-all duration-150"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-screen">
            <MoonLoader />
          </div>
        )}
      </div>
      <div className="row flex flex-wrap">
        <h2 className="text-4xl font-bold mb-16">Related Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedProducts.map((product) => (
            <ProductItem addCart={addToCartItem} product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
}
