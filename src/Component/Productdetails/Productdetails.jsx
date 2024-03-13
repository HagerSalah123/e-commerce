import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Productdetails() {
  const { addProductcart } = useContext(cartContext);
  console.log("addProductcart", addProductcart);
  const { id } = useParams();
  async function addProduct(id) {
    const res = await addProductcart(id);
    console.log(res);
    if (res) {
      toast.success("Product added successfully", {
        icon: "👏",
        duration: 1500,
        position: "top-center",
      });
    } else {
      toast.error("Error.................");
    }
  }
  function getDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { isLoading, data, isError } = useQuery(`getDetails-${id}`, getDetails);
  if (isLoading) {
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
  if (isError) {
    return <Navigate to="product" />;
  }
  const productdetail = data?.data.data;
  console.log(productdetail);
  return (
    <>
      <Helmet>
        <title>{productdetail.title}Product </title>
      </Helmet>
      <div className="container">
        <div className="row  align-items-center">
          <div className="col-4">
            <figure>
              <img
                className="mt-4 w-100"
                src={productdetail.imageCover}
                alt={productdetail.title}
              />
            </figure>
          </div>
          <div className="col-7">
            <article className="text-center">
              <h1>{productdetail.title}</h1>
              <p className="text-muted">{productdetail.description}</p>
              <h5>Price: {productdetail.price} EGP</h5>
              {/* <h2>{productdetail.id}</h2> */}
              <button
                onClick={() => addProduct(productdetail.id)}
                className="btn bg-main w-100 text-white"
              >
                add to cart +
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
