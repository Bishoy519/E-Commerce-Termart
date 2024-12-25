import React, { useEffect, useState, useContext } from "react";
import styles from "./RecentProduct.module.css";
import axios from "axios";
import ProductItem from "./../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function RecentProduct() {
  let [loading, setLoading] = useState(false);
  let { addProductToCart } = useContext(CartContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  async function addToCartItem(id) {
    setLoading(true);
    let data = await addProductToCart(id);
    if (data?.data?.status == "success") {
      toast.success(data?.data.message);
    } else {
      toast.error(data?.response.data.message);
      console.log(data);
    }
    setLoading(false);
  }
  let { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 50000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <MoonLoader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Error from ServerSide</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.data.data.map((product) => (
          <ProductItem key={product.id} loading={loading} addCart={addToCartItem} product={product} />
        ))}
      </div>
    </>
  );
}
