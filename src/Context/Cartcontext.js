import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authContext } from "./Authcontext";

export const cartContext = createContext();
export default function CartcontextProvider({ children }) {
  const { token } = useContext(authContext);
  const [numberCartItems, setNumberCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cartID, setCartID] = useState(null);

  async function addProductcart(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((res) => {
        console.log(res);

        getUsercart();
        return true;
      })
      .catch((err) => {
        console.log("err......", err);
        return false;
      });
  }
  async function getUsercart() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        if (res) {
          console.log("rescontext", res.data);
          setNumberCartItems(res.data.numOfCartItems);
          setTotalPrice(res.data.data.totalCartPrice);
          setAllProducts(res.data.data.products);
          setCartID(res.data.data._id);
          localStorage.setItem("userID", res.data.data.cartOwner);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  async function updateData(id, newCount) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        setNumberCartItems(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        return true;
      })
      .catch((err) => {
        console.log("Error", err);
        return false;
      });
  }
  async function deletData(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumberCartItems(res.data.numOfCartItems);
        console.log("Del res.data.numOfCartItems", res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        console.log(
          "res.data.data.totalCartPrice",
          res.data.data.totalCartPrice
        );
        setAllProducts(res.data.data.products);
        console.log("res.data.data.products", res.data.data.products);
        return true;
      })
      .catch((err) => {
        console.log("Error", err);

        return false;
      });
    return res;
  }
  async function clearData() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumberCartItems(0);
        setTotalPrice(0);
        setAllProducts([]);
        return true;
      })
      .catch((err) => {
        console.log("Error", err);
        return false;
      });
  }
  useEffect(() => {
    getUsercart();
  }, [token]);
  return (
    <>
      <cartContext.Provider
        value={{
          addProductcart,
          numberCartItems,
          totalPrice,
          allProducts,
          updateData,
          deletData,
          clearData,
          cartID,
          getUsercart,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
