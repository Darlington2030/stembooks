// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import PaymentIframe from "../components/PaymentIframe";

// const Billing = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const totalCost = searchParams.get("totalCost");
  
//   const [paymentUrl, setPaymentUrl] = useState("");
//   const [formData, setFormData] = useState({
//     phone_number: "",
//     email_address: "",
//     first_name: "",
//     last_name: "",
//   });

//   const handleFormChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://asg-pesapal-c25efa27749a.herokuapp.com/billing/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...formData,
//             amount: totalCost,
//             description: "STEM Books Order",
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Billing API failed.");

//       const data = await response.json();
//       setPaymentUrl(data.redirect_url);
//     } catch (error) {
//       console.error("Payment Error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-6">
//       <h2 className="text-2xl font-bold text-orange">Billing Details</h2>

//       <form onSubmit={submitOrder} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <input type="text" name="first_name" placeholder="First Name" onChange={handleFormChange} required className="w-full p-2 mb-4 border rounded" />
//         <input type="text" name="last_name" placeholder="Last Name" onChange={handleFormChange} required className="w-full p-2 mb-4 border rounded" />
//         <input type="email" name="email_address" placeholder="Email" onChange={handleFormChange} required className="w-full p-2 mb-4 border rounded" />
//         <input type="tel" name="phone_number" placeholder="Phone Number" onChange={handleFormChange} required className="w-full p-2 mb-4 border rounded" />

//         <button type="submit" className="w-full bg-orange text-white p-2 rounded">Proceed to Payment</button>
//       </form>

//       {paymentUrl && <PaymentIframe paymentUrl={paymentUrl} />}
//     </div>
//   );
// };

// export default Billing;
"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import PaymentIframe from "../components/PaymentIframe";

const Billing = () => {
  const searchParams = useSearchParams();
  const totalCost = searchParams.get("totalCost");

  const [paymentUrl, setPaymentUrl] = useState("");
  const [formData, setFormData] = useState({
    phone_number: "",
    email_address: "",
    first_name: "",
    last_name: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://asg-pesapal-c25efa27749a.herokuapp.com/billing/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            amount: totalCost,
            description: "STEM Books Order",
          }),
        }
      );

      if (!response.ok) throw new Error("Billing API failed.");

      const data = await response.json();
      setPaymentUrl(data.redirect_url);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-bg">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg text-center">
        {/* Total Cost Display */}
        <h2 className="text-2xl font-bold text-orange">Billing Details</h2>
        <p className="text-black text-lg font-semibold mt-2">
          Total Amount: <span className="text-orange text-xl">${totalCost}</span>
        </p>

        {/* Billing Form */}
        <form onSubmit={submitOrder} className="mt-4">
          <div className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleFormChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleFormChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <input
              type="email"
              name="email_address"
              placeholder="Email"
              onChange={handleFormChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleFormChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-orange text-white font-semibold py-3 rounded-lg hover:bg-orange-dark transition duration-200"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Payment Iframe */}
      {paymentUrl && (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <PaymentIframe paymentUrl={paymentUrl} />
        </div>
      )}
    </div>
  );
};

// ✅ Wrap in Suspense to fix Next.js CSR error
export default function BillingPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading Billing...</div>}>
      <Billing />
    </Suspense>
  );
}
