import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/Authcontext";
import { cartContext } from "../../Context/Cartcontext";

export function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numberCartItems } = useContext(cartContext);
  const navegate = useNavigate();

  function logout() {
    setToken(null);
    localStorage.removeItem("tkn");
    navegate("/login");
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <Link class="navbar-brand" to="#">
            <img src={logo} alt="" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/product">
                    Products
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li class="nav-item position-relative">
                  <Link class="nav-link" to="/cart">
                    Cart
                    {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numberCartItems ? numberCartItems : ""}
                    </span> */}
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/allorders">
                    All orders
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {token ? (
                <>
                  <li>
                    <ul className="list-unstyled d-flex ">
                      <li>
                        <i class="me-2 fa-brands fa-facebook"></i>
                      </li>
                      <li>
                        <i class="me-2 fa-brands fa-twitter"></i>
                      </li>
                      <li>
                        <i class="me-2 fa-brands fa-instagram"></i>
                      </li>
                      <li>
                        <i class="me-2 fa-brands fa-youtube"></i>
                      </li>
                      <li>
                        <i class="me-2 fa-brands fa-linkedin"></i>
                      </li>
                      <li>
                        <i
                          class="fa-solid fa-cart-shopping position-relative"
                          style={{
                            marginRight: "20px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "10px",
                              marginLeft: "10px",
                              marginRight: "20px",
                            }}
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
                          >
                            {numberCartItems ? numberCartItems : ""}
                          </span>
                        </i>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li class="nav-item">
                    <span onClick={logout} role="button" class="nav-link">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
