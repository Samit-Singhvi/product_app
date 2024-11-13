import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";

export default function Profile({ homeProfile, setHomeProfile }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const headers = {
    Authorization: sessionStorage.getItem("Authorization"),
  };

  function getParsedObject(details) {
    if (typeof details === "string") {
      const jsonString = details
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/None/g, "null") // Replace "None" with "null"
        .replace(
          /datetime\.datetime\((\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/g,
          '"$1-$2-$3 - $4:$5:$6"'
        );
      const parsedObj = JSON.parse(jsonString);
      return parsedObj;
    }
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/user`, {
        headers: headers,
      })
      .then((res) => {
        let details = res.data.details;
        const parsedUser = getParsedObject(details);
        setUser(parsedUser);
        setPurchasedProducts(parsedUser.purchased_products);
        setCartProducts(parsedUser.products_in_cart);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        {/* User Profile Card */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#333" }}>User Profile</h2>
          <p>
            <strong>Name:</strong> {user["name"]}
          </p>
          <p>
            <strong>Email:</strong> {user["email"]}
          </p>
          <p>
            <strong>Address:</strong> {user["address"]}
          </p>
          <p>
            <strong>Balance:</strong> Rs. {user["balance"]}
          </p>
        </div>

        {/* Purchases Table */}
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Purchases</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2", color: "#333" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Image
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Name
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Price
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Purchased On
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Delivered On
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedProducts.map((product, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${product.image
                        .split("/")
                        .pop()}`}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {product.name}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    ${product.price}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {product.purchased_on}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {product.delivered_on
                      ? product.delivered_on
                      : "NOT DELIEVERED YET"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br></br>
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              textAlign="center"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
