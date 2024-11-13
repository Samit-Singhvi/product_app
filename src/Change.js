import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ChangePassword({}) {
  function changePasswordHandler(event) {
    event.preventDefault();
    const headers = {
      Authorization: sessionStorage.getItem("Authorization"),
    };

    const formData = {
      oldpassword: event.target.elements.oldpassword.value,
      newpassword: event.target.elements.newpassword.value,
    };
    axios
      .put(`http://127.0.0.1:5000/changepassword`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        if (res.data.errorCode === 0) {
          toast.success(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.error(res.data.errorMessage, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={changePasswordHandler}>
        <div className="form-group">
          <label htmlFor="exampleOldPassword">Old Password</label>
          <input
            type="password"
            name="oldpassword"
            className="form-control"
            id="exampleOldPassword"
            placeholder="Old Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleNewPassword">New Password</label>
          <input
            type="password"
            name="newpassword"
            className="form-control"
            id="exampleNewPassword"
            placeholder="New Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link></Link>
      </form>
    </>
  );
}
