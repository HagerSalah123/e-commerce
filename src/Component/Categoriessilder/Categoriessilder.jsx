import axios from "axios";
import React from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function Categoriessilder() {
  function getAllcategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("categorySlider", getAllcategory);
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category, index) => (
        <div key={index}>
          <img
            style={{ height: "200px", padding: "20px", fontSize: "1px" }}
            className="w-100"
            src={category.image}
            alt={category.name}
          />
          <h2 style={{ fontSize: "15px" }}>{category.name}</h2>
        </div>
      ))}
    </Slider>
  );
}
