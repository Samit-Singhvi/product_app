import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./NewProduct.css"; // Import the CSS file

export default function NewProduct() {
  const navigate = useNavigate();

  function newProductHandler(event) {
    event.preventDefault();

    const formData = {
      name: event.target.elements.name.value,
      price: parseInt(event.target.elements.price.value),
      quantity: parseInt(event.target.elements.quantity.value),
      category: event.target.elements.category.value,
      file: event.target.image.files[0],
    };

    const headers = {
      Authorization: sessionStorage.getItem("Authorization"),
    };

    axios
      .post(`http://127.0.0.1:5000/product`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
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
        } else {
          toast.success(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  }

  return (
    <div className="new-product-container">
      {" "}
      {/* Wrapper div */}
      <Toaster position="top-center" reverseOrder={false} />
      <form
        method="POST"
        onSubmit={newProductHandler}
        className="new-product-form"
      >
        <div className="form-group">
          <label htmlFor="input-name">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="input-name"
            placeholder="Enter Product Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-price">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            id="input-price"
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            id="input-quantity"
            placeholder="Enter Quantity"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-category">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            id="input-category"
            placeholder="Enter Category"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-image">Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="input-image"
            placeholder="Upload an Image"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary go-back-button"
      >
        Go Back
      </button>
    </div>
  );
}
