import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import Products from "./../Products/Products";
import Product from "./../Product/Product";
import { Link } from "react-router-dom";
/* eslint-disable */

export default function ProductItem({ product, addCart, loading }) {
  const [items, setItems] = useState([]);
  function handleAddToCart(id) {
    let productOfAddToCart = structuredClone(items);
    let deletedItem = productOfAddToCart.pop();
    setItems([productOfAddToCart]);
    setTimeout(() => {
      items[id] = true;
      setItems(items);
    }, 10);
  }
  return (
    <>
      <div className="col-span-1 hover:border-[#507687] border overflow-hidden hover:rounded-sm">
        <div className="product">
          <Link to={`/productDetails/${product.id}/${product.category._id}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="object-cover rounded-b-lg shadow-sm shadow-gray-400"
            />
            <div className="inner pt-3 px-3">
              <h1 className="hover:text-green-400 hover:underline cursor-pointer">{product.category.name}</h1>
              <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span className="hover:underline">
                  {product.ratingsAverage}
                  {product.ratingsAverage < 3 ? (
                    <i className="fa-solid fa-star text-redy ms-1"></i>
                  ) : product.ratingsAverage < 4 ? (
                    <i className="fa-solid fa-star text-orange-400 ms-1"></i>
                  ) : (
                    <i className="fa-solid fa-star text-green-400 ms-1"></i>
                  )}
                </span>
              </div>
            </div>
          </Link>
          <div className="px-3 pb-3">
            <button
              onClick={() => {
                addCart(product.id);
                handleAddToCart(product.id);
              }}
              className="btn bg-[#507687]  opacity-50 hover:opacity-100"
            >
              {loading && items[product.id] ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <span>Add to Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
