"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PaymentIframe from "../components/PaymentIframe";

const BillingContent = () => {
  const searchParams = useSearchParams();
  const totalCost = searchParams.get("totalCost");

  const [paymentUrl, setPaymentUrl] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone_number: "",
    pages: "",
    color_type: "Black & White",
    size: "A4",
    orientation: "Portrait",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://asg-pesapal-c25efa27749a.herokuapp.com/billing/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    <div className="text-1xl flex justify-center min-h-screen bg-gray-bg p-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="text-2xl font-bold text-orange text-center mb-4">
          Billing Details
        </h2>
        <p className="text-black text-lg font-semibold text-center mb-4">
          Total Amount:{" "}
          <span className="text-orange text-xl font-bold">${totalCost}</span>
        </p>

        {/* Form Layout (Stacked on Mobile, Two Columns on Larger Screens) */}
        <form
          onSubmit={submitOrder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter first name"
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter last name"
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Email Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email_address"
              placeholder="Enter your email"
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Phone Number */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              placeholder="Enter phone number"
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Number of Pages */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Number of Pages
            </label>
            <input
              type="number"
              name="pages"
              placeholder="Enter number of pages"
              onChange={handleFormChange}
              required
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Color Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Color Type
            </label>
            <select
              name="color_type"
              onChange={handleFormChange}
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              <option value="Black & White">Black & White</option>
              <option value="Colored">Colored</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Paper Size
            </label>
            <select
              name="size"
              onChange={handleFormChange}
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
            </select>
          </div>

          {/* Orientation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Orientation
            </label>
            <select
              name="orientation"
              onChange={handleFormChange}
              className="w-full p-3 border border-yellow rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              <option  value="Portrait">Portrait</option>
              <option  value="Landscape">Landscape</option>
            </select>
          </div>

          {/* Checkout Button */}
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-orange text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>

      {/* Payment Iframe */}
      {paymentUrl && (
        <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <PaymentIframe paymentUrl={paymentUrl} />
        </div>
      )}
    </div>
  );
};

// ✅ Wrap in Suspense to fix Next.js CSR error
export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10 text-gray-500">
          Loading Billing...
        </div>
      }
    >
      <BillingContent />
    </Suspense>
  );
}
