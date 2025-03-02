// "use client";

import Checkout from "../components/Checkout";

// import Link from "next/link";
// import { useCart } from "../context/CartContext";

// const Checkout = () => {
//   const { cart } = useCart();
//   const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);

//   return (
//     <div className="min-h-screen p-6 bg-gray-bg flex flex-col items-center">
//       <h1 className="text-2xl font-bold text-orange">Checkout</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-light mt-4">Your cart is empty. <Link href="/" className="text-yellow">Go shopping</Link>.</p>
//       ) : (
//         <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
//           {cart.map((book) => (
//             <div key={book.id} className="flex justify-between mb-4">
//               <span>{book.title}</span>
//               <span className="text-orange">${book.price}</span>
//             </div>
//           ))}

//           <hr className="my-4" />
//           <div className="flex justify-between text-lg font-bold">
//             <span>Total:</span>
//             <span className="text-orange">${totalPrice}</span>
//           </div>

//           <button className="mt-4 w-full bg-yellow text-black py-2 rounded-lg">
//             Proceed to Payment (Mock)
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
export default function CheckoutPage() {
  return <Checkout />;
}

