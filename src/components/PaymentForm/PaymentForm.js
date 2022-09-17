// import React from "react";
// import { withRouter } from "react-router-dom";
// import { CardElement } from "@stripe/react-stripe-js";
// import { useStripe, useElements } from "@stripe/react-stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useState, useEffect } from "react";
// // import StatusMessages, { useMessages } from "./StatusMessages";
// /* import "./PaymentForm.css";
//  */
// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
// //   const [messages, addMessage] = useMessages();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     // addMessage("Processing payment...");
//     const { clientSecret } = await fetch("http://localhost:3000/checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         paymentMethodType: "card",
//         currency: "gbp",
//       }),
//     }).then((res) => res.json());
//     // addMessage("Client secret received.");

//     stripe
//       .confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement),
//             billing_details: {
//               name: "Jenny Rosen",
//             },
//           },
//         },
//         { handleActions: false }
//       )
//       .then((result) => {
//         if (result.error) {
//         //   addMessage(result.error.message);
//         } else {
//         //   addMessage("Payment confirmed!");
//         }
//       });
//   };

//   return (
//     <>
//       <form id="payment-form">
//         <CardElement />
//       </form>
//     </>
//   );
// };

// export default PaymentForm;
