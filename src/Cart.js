import axios from "axios";
import "./Cart.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totaPrice, setTotalPrice] = useState(0);
  const discount = 15;

  const headers = {
    Authorization: sessionStorage.getItem("Authorization"),
    "Content-Type": "multipart/form-data",
  };

  const checkoutHandler = async (product_list, total_price, paymentConfirm) => {
    console.log("CHECKOUT : ", product_list);
    const api_url = `http://127.0.0.1:5000/product/buynow`;
    const form_data = {
      paymentConfirm: paymentConfirm,
      purchase_list: JSON.stringify(product_list),
      total_price: total_price,
    };
    let response = await axios.post(api_url, form_data, { headers: headers });
    if (response.data.errorCode == 1) {
      toast.error(response.data.errorMessage);
    } else {
      window.location.href = response.data.errorMessage;
      toast.success(response.data.errorMessage);
      setCartProducts([]);
    }
  };

  const handleDecrease = async (product_id, product_quantity) => {
    let new_quantity = product_quantity - 1;
    if (product_quantity < 1) {
      new_quantity = 0;
    } else {
      updateCartAPICall(product_id, 0, new_quantity);
    }
  };

  const handleIncrease = async (product_id, product_quantity) => {
    await updateCartAPICall(product_id, 0, product_quantity + 1);
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

  async function updateCartAPICall(product_id, remove, quantity) {
    const api_url = `http://127.0.0.1:5000/updatecart`;
    const form_data = {
      product_id: product_id,
      remove: remove,
      quantity: quantity,
    };
    axios.put(api_url, form_data, { headers }).then((res) => {
      getProductDetails();
    });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    axios
      .get(`http://127.0.0.1:5000/user`, {
        headers: headers,
      })
      .then((res) => {
        let details = res.data.details;
        const parsedUser = getParsedObject(details);
        setCartProducts(parsedUser.products_in_cart);
        setTotalPrice(parsedUser.total_price);
      });
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "800px", // Set a max width for the table
            width: "100%",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "10px" }}>
            Products in Cart
          </h2>
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
                  Quantity
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product, index) => (
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
                    ₹ {product.price}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={() => {
                          handleDecrease(product.id, product.quantity);
                        }}
                        style={{ marginRight: "10px" }}
                      >
                        -
                      </button>
                      <span style={{ margin: "0 10px" }}>
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => {
                          handleIncrease(product.id, product.quantity);
                        }}
                        style={{ marginLeft: "10px" }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        updateCartAPICall(product.id, 1, 0);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-header">PRICE DETAILS</div>
          <div class="card-body">
            <p class="card-text">Price : ₹{totaPrice}</p>
            <p class="card-text">Discount : {discount}% </p>
            <p class="card-text">
              Final Price : ₹{totaPrice - (totaPrice * discount) / 100}
            </p>
            <button
              type="button"
              class="btn btn-success"
              onClick={() => {
                checkoutHandler(
                  cartProducts,
                  totaPrice,
                  prompt("Do you want to pay?")
                );
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
