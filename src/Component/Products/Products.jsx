import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "../Homesilde/Homesilde";
import Categoriessilder from "../Categoriessilder/Categoriessilder";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/Cartcontext";
import toast from "react-hot-toast";

export function Products() {
  const { addProductcart } = useContext(cartContext);

  async function addProduct(id) {
    const res = await addProductcart(id);
    if (res) {
      toast.success("Product added successfully ");
    } else {
      toast.error("Error.");
    }
  }

  async function getAllProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { isLoading, data } = useQuery("getAllProduct", getAllProduct);

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
  return (
    <>
      <div className="container  ">
        <div className="row my-4">
          <div className="col-md-9">
            <SimpleSlider />
          </div>
          <div className="col-md-3">
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/grocery-banner-2.jpeg")}
              alt=""
            />
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/grocery-banner.png")}
              alt=""
            />
          </div>
        </div>
        <Categoriessilder />
        <div className="row  gy-3 mt-3">
          {data?.data.data.map((product, index) => {
            return (
              <div key={index} className="product gy-3 col-md-3 mt-5 mb-4 mt-2">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <div className="products">
                    <img
                      style={{ padding: "20px" }}
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <h2 className="h6 text-main">{product.category.name}</h2>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <p>{product.price}</p>

                      <p>
                        <span>
                          <i className="fa-solid fa-star text-warning "></i>
                        </span>
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => addProduct(product.id)}
                  className=" bg-main w-100 text-white  rounded-5 border-0 h6 "
                  style={{ height: "40px" }}
                >
                  add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
