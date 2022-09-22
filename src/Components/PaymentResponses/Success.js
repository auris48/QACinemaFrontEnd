import { auto } from "@popperjs/core";
import { Link } from "react-router-dom";
import React from "react";
import "./success.css";

export default function PaymentSuccess() {
  return (
    <>
      <div className="success-container">
        <div className="success-content">
          <h1>Payment Successful</h1>
          <p>Thank you for your custom</p>
          <Link style={{textDecoration:"none", color:"grey"}} to="/viewbookings">You can view your booking here</Link>
        </div>
      </div>
    </>
  );
}
