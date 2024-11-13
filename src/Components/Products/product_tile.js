import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, useNavigate } from "react-router-dom";

export default function ProductTile({
  id,
  name,
  image,
  price,
  description,
  ratings,
  getProductList,
}) {
  const headers = {
    Authorization: sessionStorage.getItem("Authorization"),
  };
  const navigate = useNavigate();

  function deleteHandler(event) {
    axios
      .delete(`http://127.0.0.1:5000/product/${id}`, {
        headers: headers,
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
        } else {
          toast.success(
            `${name} product deleted successfully !! Happy to serve you`,
            {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }
          );
          getProductList();
        }
      });
  }

  function productClickHandler(event) {
    const productDetails = {
      id: id,
      name: name,
      ratings: ratings,
      description: description,
      price: price,
      image: image,
    };
    navigate("/details", { state: productDetails });
  }

  return (
    <>
      <div className="card h-100 m-1 p-3 shadow">
        <Toaster position="top-center" reverseOrder={false} />
        <img
          src={`${process.env.PUBLIC_URL}/images/${image.split("/").pop()}`}
          width="200px"
          height="150px"
          onClick={productClickHandler}
          style={{ cursor: "pointer" }}
        ></img>
        <center>{name}</center>
        <center>{price}</center>
      </div>
    </>
  );
}
