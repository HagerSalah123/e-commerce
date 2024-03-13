import React, { useContext } from "react";
import { cartContext } from "../../Context/Cartcontext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cartID, getUsercart } = useContext(cartContext);
  console.log("cartID", cartID);
  const nav = useNavigate();
  function confirmCash() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const shippingAddress = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(`Payment Success`);
          getUsercart();
          setTimeout(() => {
            nav("/product");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Payment", err);
        console.log(details, phone, city, cartID, shippingAddress);
      });
  }
  function confirmOnline() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const shippingAddress = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          window.open(res.data.session.url, "_self");
        }
      })
      .catch((err) => {
        console.log("Payment", err);
        console.log(details, phone, city, cartID, shippingAddress);
      });
  }
  return (
    <>
      <div className="w-75 m-auto mt-4 py-5 shadow mb-4 ">
        <form action="" className="mx-4">
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
            className="form-control mb-3"
            placeholder="city"
          />
          <label htmlFor="phone">phone:</label>
          <input
            type="text"
            id="phone"
            className="form-control mb-3"
            placeholder="phone"
          />

          <label htmlFor="details">details:</label>
          <textarea
            type="text"
            id="details"
            className="form-control mb-3"
            placeholder="details"
          ></textarea>
        </form>
        <button onClick={confirmCash} className="btn btn-primary ms-4 ">
          Confirm cash Payment
        </button>
        <button onClick={confirmOnline} className="btn btn-primary ms-4 ">
          Confirm online Payment
        </button>
      </div>
    </>
  );
}
