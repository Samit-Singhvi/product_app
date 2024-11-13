import axios from "axios";
import { useState } from "react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [signup, setSignup] = useState(false);
  function sendSignupDetails(event) {
    let username = event.target.elements.username.value;
    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;
    let address = event.target.elements.address.value;

    event.preventDefault();
    axios
      .post(`http://127.0.0.1:5000/signup`, {
        username: username,
        email: email,
        password: password,
        address: address,
      })
      .then((res) => {
        if (res.data.errorCode == 0) {
          toast.success(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          // setSignup(true);
          // setLoginSignupChange("Login");
        } else {
          toast.error(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  }
  if (signup) {
    return (
      <div className="alert alert-primary" role="alert">
        Signup successful
      </div>
    );
  }
  return (
    <div className="signup-container">
      <Toaster position="top-center" reverseOrder={false} />
      <form method="POST" onSubmit={sendSignupDetails} className="signup-form">
        <h2 className="form-title">Signup</h2>
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
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
        <div className="form-group">
          <label htmlFor="input-address">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            id="input-address"
            placeholder="Enter address"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br />
        <br />
        <div>
          <Link to={"/login"}>
            <button type="button" class="btn btn-dark">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
