import { createContext, useEffect, useState } from "react";
import axios from "axios";
const baseURL = "https://ecommerce.routemisr.com";
const headers = { token: window.localStorage.getItem("token") };

export let CartContext = createContext();

export function addProductToCart(productId) {
  return axios
    .post(`${baseURL}/api/v1/cart`, { productId }, { headers })
    .then((res) => res)
    .catch((err) => err);
}
export function getCart() {
  return axios
    .get(`${baseURL}/api/v1/cart`, { headers })
    .then((res) => res.data)
    .catch((err) => err.respnse.data);
}

function removeProduct(id) {
  return axios
    .delete(`${baseURL}/api/v1/cart/${id}`, { headers })
    .then((res) => res.data)
    .catch((err) => err.respnse.data);
}
function updateQuantityProduct(id, count) {
  return axios
    .put(`${baseURL}/api/v1/cart/${id}`, { count }, { headers })
    .then((res) => res.data)
    .catch((err) => err.respnse.data);
}
function cashOnDelivery(cartId, shippingAddress) {
  return axios
    .post(`${baseURL}/api/v1/orders/${cartId}`, { shippingAddress }, { headers })
    .then((res) => res.data)
    .catch((err) => err.respnse.data);
}
export default function CartContextProvider({ children }) {
  let [cartId, setCartId] = useState(null);

  return (
    <CartContext.Provider
      value={{
        cartId,
        setCartId,
        addProductToCart,
        getCart,
        removeProduct,
        updateQuantityProduct,
        cashOnDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
