import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ChangePassword from "./Change";
import Profile from "./Components/Users/Profile";
import NewProduct from "./NewProduct";
import HomeProducts from "./Components/Products/home_products";
import ProductDetails from "./Product_details";
import Cart from "./Cart";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newproduct" element={<NewProduct />} />
          <Route path="products" element={<HomeProducts />} />
          <Route path="details" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
