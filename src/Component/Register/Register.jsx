import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const mySchema = Yup.object({
  name: Yup.string()
    .required("Must be req")
    .min(3, "atleast 3 charcters")
    .max(10),
  email: Yup.string().email(),
  password: Yup.string().required().min(6).max(12),
  rePassword: Yup.string().oneOf([Yup.ref("password")]),
  phone: Yup.string()
    .required()
    .matches(/^01[0125][0-9]{8}$/),
});
console.log(mySchema);
export default function Register() {
  const userDate = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let [isSucess, setIsSucess] = useState(false);
  let [erromwssage, setErromwssage] = useState(undefined);
  let [isLoading, setIsLoading] = useState(false);
  let nav = useNavigate();

  async function mySubmit(value) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .then(function (res) {
        console.log("in case Sucess", res);
        setIsSucess(true);
        setTimeout(function () {
          setIsSucess(false);
        }, 2000);
        setIsLoading(false);
        nav("/login");
      })
      .catch(function (err) {
        setErromwssage(err.response.data.message);
        setIsLoading(false);
      });
  }
  const formik = useFormik({
    initialValues: userDate,
    onSubmit: mySubmit,
    validate: function (value) {
      const errors = {};
      const regxname = /^[A-Z][a-z]{3,7}$/;
      const regxphone = /^01[0125][0-9]{8}$/;
      const regxemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regxname.test(value.name) === false) {
        errors.name =
          "Name must be from 4 to 8 charcters starts with capital letter";
      }
      if (regxemail.test(value.email) === false) {
        errors.email = "Invalid email address";
      }
      if (regxphone.test(value.phone) === false) {
        errors.phone = "Invalid phone number";
      }
      if (value.password.length < 6 || value.password.length > 12) {
        errors.password = "Password must be from 6 to 12 charcters";
      }
      if (value.rePassword !== value.password) {
        errors.rePassword = "Password and rePassword don`t much";
      }
      return errors;
    },
  });
  return (
    <>
      <div className="w-75 m-auto p-5">
        {isSucess ? (
          <div className="alert alert-success text-center">
            Congratulations your account has been successful!
          </div>
        ) : (
          ""
        )}
        {erromwssage ? (
          <div className="alert alert-danger text-center">{erromwssage} </div>
        ) : (
          ""
        )}
        <h2>Register Now: </h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            className="form-control mb-3"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            className="form-control mb-3"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">rePassword:</label>
          <input
            type="password"
            id="rePassword"
            className="form-control mb-3"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone:</label>
          <input
            type="text"
            id="phone"
            className="form-control mb-3"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}{" "}
          <button
            type="submit"
            className="p-2 main-color rounded-3 text-white border-0 "
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
