import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import ChangePassword from "./Change";
import React, { useEffect, useState } from "react";
import NewProduct from "./NewProduct";
import ProductTile from "./Components/Products/product_tile";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  Switch,
} from "react-router-dom";
import HomeProducts from "./Components/Products/home_products";
import Navbar from "./Navbar";
function App() {
  // const [loginSignupChange, setLoginSignupChange] = useState("Login");
  const [isLoggedIn, setLoginSuccess] = useState(false);
  // const [newProduct, setNewProduct] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("Authorization"));

  // function loginHandler() {
  //   setLoginSignupChange("Login");
  // }

  // function signupHandler() {
  //   setLoginSignupChange("Signup");
  // }

  // function changePasswordHandler() {
  //   setLoginSignupChange("Change");
  // }

  // function newProductHandler() {
  //   setNewProduct(true);
  // }

  useEffect(() => {
    if (token != undefined && token !== "") {
      setLoginSuccess(true);
    }
  }, [token]);

  return (
    <div className="App">
      <Navbar />
      {/* {newProduct ? (
        <NewProduct />
      ) : loginSignupChange === "Login" ? (
        <Login isLoggedin={isLoggedIn} setLogin={setLoginSuccess} />
      ) : loginSignupChange === "Change" ? (
        <ChangePassword />
      ) : (
        <>
          {!isLoggedIn && (
            <Signup
              loginSignupChange={loginSignupChange}
              setLoginSignupChange={setLoginSignupChange}
            />
          )}
        </>
      )} */}
    </div>
  );
}

export default App;
