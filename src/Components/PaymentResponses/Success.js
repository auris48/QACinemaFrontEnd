import { auto } from "@popperjs/core";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import "./success.css";

export default function PaymentSuccess() {
  const { session_id } = useParams();
  const { booking } = useParams();

  console.log(booking);
  const [paymentSuccessfullyAdded, setPaymentSuccessfullyAdded] =
    useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/booking/${booking}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPaid: true, paymentID: session_id }),
    }).then((res) => {
      if (res.status === 201) {
        console.log("hello");
        setPaymentSuccessfullyAdded(true);
      }
    });
  }, []);

  return (
    <>
      <div className="success-container">
        {paymentSuccessfullyAdded ? (
          <div className="success-content">
            <h1>Payment Successful</h1>
            <p>Thank you for your custom</p>
            <Link
              style={{ textDecoration: "none", color: "grey" }}
              to="/viewbookings">
              You can view your booking here
            </Link>
          </div>
        ) : (
          <p>loading....</p>
        )}
      </div>
    </>
  );
}
