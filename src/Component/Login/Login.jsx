import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/Authcontext";

export default function Login() {
  const userDate = {
    email: "",
    password: "",
  };
  const [isSucess, setIsSucess] = useState(false);
  const [erromwssage, setErromwssage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navegate = useNavigate();
  const { setToken, getUserDate } = useContext(authContext);

  async function mySubmit(value) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)
      .then(function (x) {
        if (x.data.message === "success") {
          localStorage.setItem("tkn", x.data.token);
          setToken(x.data.token);
          getUserDate();
          setTimeout(function () {
            setIsSucess(false);
          }, 3000);
          setIsLoading(false);
        }

        navegate("/product");
      })
      .catch(function (x) {
        setErromwssage(x.response.data.message);
        setIsLoading(false);
      });
  }
  const formik = useFormik({
    initialValues: userDate,
    onSubmit: mySubmit,
    validate: function (value) {
      const errors = {};
      const regxemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (regxemail.test(value.email) === false) {
        errors.email = "Invalid email address";
      }

      if (value.password.length < 6 || value.password.length > 12) {
        errors.password = "Password must be from 6 to 12 charcters";
      }

      return errors;
    },
  });
  return (
    <>
      <div className="w-75 m-auto p-5">
        {isSucess ? (
          <div className="alert alert-success text-center">Welcome Back </div>
        ) : (
          ""
        )}
        {erromwssage ? (
          <div className="alert alert-danger text-center">{erromwssage} </div>
        ) : (
          ""
        )}
        <h2>Login Now: </h2>
        <form onSubmit={formik.handleSubmit}>
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
