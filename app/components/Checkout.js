"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const pesapalAuthUrl = "https://asg-pesapal-c25efa27749a.herokuapp.com/pesapal_auth/";
const pesapalIpnUrl = "https://asg-pesapal-c25efa27749a.herokuapp.com/register-pesapal-ipn/";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Authenticate with Pesapal
      const authResponse = await fetch(pesapalAuthUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const authData = await authResponse.json();

      if (authData.status !== "200") {
        throw new Error("Pesapal Authentication Failed");
      }

      const token = authData.token;

      // Register Pesapal IPN
      const ipnResponse = await fetch(pesapalIpnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });
      const ipnData = await ipnResponse.json();

      if (ipnData.status !== "200") {
        throw new Error("Pesapal IPN Registration Failed");
      }

      // Clear cart and redirect
      clearCart();
      router.push("/success");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-bg flex flex-col items-center">
      <h1 className="text-2xl font-bold text-orange">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-light mt-4">Your cart is empty.</p>
      ) : (
        <div className="text-black w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
          {cart.map((book) => (
            <div key={book.id} className="flex justify-between mb-4">
              <span>{book.title}</span>
              <span className="text-orange">${book.price * book.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange">${totalPrice}</span>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            className="mt-4 w-full bg-yellow text-black py-2 rounded-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
