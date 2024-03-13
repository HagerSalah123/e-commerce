import axios from "axios";
import React from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductSlider() {
  const { id } = useParams();
  function getAllImages() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("getAllImages", getAllImages);
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
  const { images } = data.data.data;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img className="w-100 mt-4" src={image} alt={images.title} />
        </div>
      ))}
    </Slider>
  );
}
