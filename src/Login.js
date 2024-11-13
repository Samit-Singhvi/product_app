import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Profile from "./Components/Users/Profile";
import { useMatch, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import "./Login.css"; // Import CSS file
import HomeProducts from "./Components/Products/home_products";
import { Link, Navigate } from "react-router-dom";

export default function Login({}) {
  const navigate = useNavigate();

  function loginInputHandler(event) {
    event.preventDefault();
    axios
      .get(`http://127.0.0.1:5000/login`, {
        params: {
          username: event.target.elements.username.value,
          password: event.target.elements.password.value,
        },
      })
      .then((res) => {
        if (res.data.errorCode === 1) {
          toast.error(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else if (res.data.errorMessage === "Login successful!") {
          // setLogin(true);
          sessionStorage.setItem("Authorization", "Bearer " + res.data.token);
          toast.success(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          navigate("/products");
        }
      });
  }

  // if (isLoggedin) {
  //   return (
  //     <div>
  //       <Navbar profileHandler={profileHandler} logoutHandler={logoutHandler} />
  //       {homeProfile === "Profile" ? (
  //         <Profile homeProfile={homeProfile} setHomeProfile={setHomeProfile} />
  //       ) : (
  //         <HomeProducts />
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="login-container">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="login-form" method="GET" onSubmit={loginInputHandler}>
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <label htmlFor="input-username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="input-username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />
        <br />
        <div>
          <Link to={"/signup"}>
            <button type="button" class="btn btn-dark">
              Signup
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
