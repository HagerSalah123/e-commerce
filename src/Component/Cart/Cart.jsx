import React, { useContext } from "react";
import { cartContext } from "../../Context/Cartcontext";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    clearData,
    deletData,
    updateData,
    // numberCartItems,
    totalPrice,
    allProducts,
  } = useContext(cartContext);

  async function updataMyproduct(id, newCount) {
    const res = await updateData(id, newCount);
    if (res) {
      toast.success("Product Updated");
    } else {
      toast.error("Error");
    }
  }
  async function deleteMyproduct(id) {
    const res = await deletData(id);
    if (res) {
      toast.success("Product delete");
    } else {
      toast.error("Error");
    }
  }

  // async function clearMyproduct() {
  //   const res = await clearData();
  //   if (res) {
  //     toast.success("Clear All Product");
  //   } else {
  //     toast.error("Error");
  //   }
  // }
  if (!allProducts) {
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
      <div className="container w-75 bg-body-tertiary mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="mb-2 pt-3">Shop Cart</h2>
            <h5 className="text-main mb-3">
              Total Cart Price: {totalPrice} LE
            </h5>
            <button onClick={clearData} className="btn btn-outline-success  ">
              Clear
            </button>
          </div>
          <Link to="/payment">
            <button className="btn btn-primary ">Confirm Payment</button>
          </Link>
        </div>
        {/* <h4 className="bg-success text-center text-white">
          {numberCartItems === 0 ? "No Product Added" : numberCartItems}
        </h4> */}
        {allProducts.map((product, index) => (
          <div
            key={index}
            className="row align-items-center border-1 border-bottom border-tertiary  "
          >
            <div className="col-2">
              <figure>
                <img
                  src={product.product.imageCover}
                  alt={product.product.title}
                  className="w-100 mt-4 mb-4"
                />
              </figure>
            </div>
            <div className="col-8">
              <article>
                <h3 className="h5">{product.product.title}</h3>
                <h5>Price: {product.price}</h5>
                {/* <h1>{product.product._id}</h1> */}
                <button
                  onClick={() => {
                    deleteMyproduct(product.product.id);
                  }}
                  className="btn btn-outline-success"
                >
                  <i className="fa-solid fa-trash-can"></i> Remove
                </button>
                <br />
              </article>
            </div>
            <div className="col-1 ms-5">
              <div className="d-flex  align-items-center">
                <button
                  disabled={product.count === 1}
                  onClick={() => {
                    updataMyproduct(product.product._id, product.count - 1);
                  }}
                  className="btn btn-outline-success me-2 "
                >
                  -
                </button>
                <h6>{product.count}</h6>
                <button
                  onClick={() => {
                    updataMyproduct(product.product._id, product.count + 1);
                  }}
                  className="btn btn-outline-success ms-2 "
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}{" "}
      </div>
    </>
  );
}
