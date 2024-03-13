import axios from "axios";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

function Allorders() {
  const [allOrders, setAllOrders] = useState(null);
  function getAllorder() {
    const userID = localStorage.getItem("userID");
    console.log("userOrder", userID);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`, {
        params: { url: "http://localhost:3000" },
      })
      .then((res) => {
        console.log("Hiiii", res.data.shippingAddress);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log("errorlderrrrr", err);
      });
  }
  useEffect(() => {
    getAllorder();
  });
  if (!allOrders) {
    return (
      <div className="d-flex justify-content-center bg-secondary align-items-center vh-100 bg-opacity-50">
        <Circles
          height="100"
          width="100"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container ">
        <div className="row gy-3">
          {allOrders.map((order, index) => {
            console.log("city", order.shippingAddress);
            return (
              <div key={index} className="col-md-6">
                <div className="order bg-info  h-100 ">
                  <div className="container">
                    <div className="row">
                      {order.cartItems.map((item, inx) => {
                        console.log("item", item);

                        return (
                          <div key={inx} className="col-md-4">
                            <div className="montage bg-primary h-100 ">
                              <img
                                className="w-100 "
                                src={item.product.imageCover}
                                alt={item.title}
                              />
                              <h6>Price: {item.price}</h6>
                              <h6>Count: {item.count}</h6>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <h5>Payment Method:{order.paymentMethodType}</h5>
                  <h5>Price: {order.totalOrderPrice}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Allorders;
