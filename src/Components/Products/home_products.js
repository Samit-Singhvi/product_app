import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductTile from "./product_tile";
import "./HomeProducts.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";

export default function HomeProducts() {
  const [items, setItems] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const navigate = useNavigate();
  const headers = {
    Authorization: sessionStorage.getItem("Authorization"),
  };

  function searchHandler(event) {
    event.preventDefault();
    axios
      .get(`http://127.0.0.1:5000/product/search`, {
        headers: headers,
        params: {
          name: event.target.elements.search.value,
        },
      })
      .then((res) => {
        setItems(res.data.items);
      });
  }

  const getProductList = async () => {
    try {
    } catch (error) {}
    axios
      .get(`http://127.0.0.1:5000/productlist`, {
        headers: headers,
      })
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        toast.error("Failed to load products");
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Toaster />
        <h2 className="text-center mb-5">Our Products</h2>
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline" onSubmit={searchHandler}>
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              name="submit-search"
            >
              Search
            </button>
          </form>
        </nav>
        <div className="row g-4">
          {items.map((item) => {
            return (
              <>
                <div key={item.id} className="col-md-4 p-3">
                  {" "}
                  <ProductTile
                    id={item.id}
                    image={item.image_url}
                    name={item.name}
                    price={item.price}
                    deleted={deleted}
                    ratings={item.ratings}
                    description={item.description}
                    getProductList={getProductList}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
