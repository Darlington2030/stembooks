// "use client";

// import Link from "next/link";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);

//   return (
//     <div className="min-h-screen p-6 bg-gray-bg flex flex-col items-center">
//       <h1 className="text-2xl font-bold text-orange">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-light mt-4">
//           Your cart is empty. <Link href="/" className="text-yellow">Go shopping</Link>.
//         </p>
//       ) : (
//         <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
//           {cart.map((book) => (
//             <div key={book.id} className="flex justify-between items-center mb-4">
//               <span className="text-black">{book.title}</span>
//               <span className="text-orange">${book.price}</span>
//               <button 
//                 onClick={() => removeFromCart(book.id)} 
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <hr className="my-4" />
//           <div className="flex justify-between text-lg font-bold">
//             <span>Total:</span>
//             <span className="text-orange">${totalPrice}</span>
//           </div>

//           <button 
//             onClick={clearCart} 
//             className="mt-4 w-full bg-gray-light text-white py-2 rounded-lg"
//           >
//             Clear Cart
//           </button>

//           <Link href="/checkout">
//             <button className="mt-4 w-full bg-yellow text-black py-2 rounded-lg">
//               Proceed to Checkout
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { VouchersDetails } from "../vouchers";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart } = useContext(CartContext);
  const router = useRouter();
  const vouchers = VouchersDetails();

  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  // Calculate total cost with VAT & Service charge
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceCharge = totalCost * 0.03;
  const vat = totalCost * 0.16;
  const grandTotal = totalCost + serviceCharge + vat;
  const discountedTotal = grandTotal * (1 - appliedDiscount / 100);

  // Apply discount
  const applyDiscount = (e) => {
    e.preventDefault();
    setDiscountError("");

    const discount = vouchers.find((voucher) => voucher.code === discountInput);
    if (discount) {
      setAppliedDiscount(discount.discount);
    } else {
      setAppliedDiscount(0);
      setDiscountError("Invalid or expired discount code.");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-bg flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-light mt-4 text-center">
          Your cart is empty. <a href="/" className="text-yellow">Go shopping</a>.
        </p>
      ) : (
        <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-6">
          {/* Cart Items */}
          <div className="flex flex-col space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between border-b pb-3 text-sm sm:text-base"
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />

                {/* Title (Hidden on Small Screens, shown on medium+) */}
                <span className=" text-black hidden sm:block w-1/3 truncate">{item.title}</span>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-black px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className=" text-black text-sm text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="text-black px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <span className="text-orange font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                {/* Delete Button */}
                <button 
                  onClick={() => deleteFromCart(item.id)} 
                  className="text-red-500 text-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Discount Section */}
          <form onSubmit={applyDiscount} className="mt-4 flex flex-col sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              className="w-full sm:w-2/3 p-2 border rounded"
            />
            <button 
              type="submit" 
              className="mt-2 sm:mt-0 sm:ml-2 bg-yellow px-3 py-2 rounded"
            >
              Apply
            </button>
          </form>
          {discountError && <p className="text-red-500 mt-1">{discountError}</p>}

          {/* Order Summary */}
          <div className="text-black mt-6 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge (3%):</span>
              <span>${serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (16%):</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span className="text-orange">${(appliedDiscount > 0 ? discountedTotal : grandTotal).toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-2 mt-4">
            <button
             onClick={() => router.push(`/billing?totalCost=${grandTotal.toFixed(2)}`)}
              className="w-full sm:w-1/2 bg-orange text-white py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full sm:w-1/2 bg-red-500 text-white py-2 rounded-lg mt-2 sm:mt-0"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
