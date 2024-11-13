import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

export default function Navbar({ profileHandler, logoutHandler }) {
  const navigate = useNavigate();

  function logoutHandler() {
    sessionStorage.clear();
    navigate(-1);
  }

  function cartHandler(event) {
    navigate("/cart");
  }

  return (
    <nav className="navbar">
      <Link to="/products" className="navbar-logo">
        Flipmart
      </Link>
      <div className="navbar-buttons">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="currentColor"
            class="bi bi-cart"
            id="cart_button"
            viewBox="0 0 16 16"
            onClick={cartHandler}
            style={{ cursor: "pointer" }}
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </div>
        <Link to="/profile">
          <button
            type="button"
            className="btn btn-primary"
            onClick={profileHandler}
          >
            Profile
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={logoutHandler}
          name="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
