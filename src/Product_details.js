import React from "react";
import "./Product_details.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
export default function ProductDetails() {
  const location = useLocation();
  const productDetails = location.state;
  const headers = {
    Authorization: sessionStorage.getItem("Authorization"),
  };

  async function favoriteHandler(id) {
    let api_url = `http://127.0.0.1:5000/favorite/${id}`;
    let response = await axios.post(api_url, {}, { headers: headers });
    if (response.errorCode == 1) {
      toast.error(response.data.errorMessage, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(response.data.errorMessage, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    if (response.data.action == "added") {
      document.getElementById("favorite").textContent = "Remove from wishlist";
    } else {
      document.getElementById("favorite").textContent = "Add to wishlist";
    }
  }

  function addToCartHandler(event) {
    let api_url = `http://127.0.0.1:5000/product/addtocart/${productDetails.id}`;

    axios
      .post(
        api_url,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.errorCode === 1) {
          toast.error(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.success(`${productDetails.name} added to Cart for you`, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          document.getElementById("cart_button").style.color = "red";
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="height d-flex justify-content-center align-items-center">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="mt-2">
              <h4 className="text-uppercase">{productDetails.name}</h4>
              <div className="mt-5">
                <h5 className="text-uppercase mb-0">{productDetails.name}</h5>
                <div className="d-flex flex-row user-ratings">
                  <div className="ratings">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <h6 className="text-muted ml-1">
                    {productDetails.ratings}/5
                  </h6>
                </div>
              </div>
            </div>
            <div className="image">
              <img
                src={`${process.env.PUBLIC_URL}/images/${productDetails.image
                  .split("/")
                  .pop()}`}
                width={"140px"}
                height={"120px"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
            <span>Available colors</span>
            <div className="colors">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <p>{productDetails.description}</p>
          <button className="btn btn-danger" onClick={addToCartHandler}>
            Add to cart
          </button>
          <button
            type="button"
            class="btn btn-link"
            id="favorite"
            onClick={() => {
              favoriteHandler(productDetails.id);
            }}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </>
  );
}
