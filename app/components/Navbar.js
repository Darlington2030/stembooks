// // "use client";
// // import Link from "next/link";

// // import DarkModeToggle from "./DarkModeToggle";
// // import { useCart } from "../context/CartContext";

// // const Navbar = () => {
// //   const { cart } = useCart();

// //   return (
// //     <nav className="bg-orange text-white p-4 flex justify-between items-center">
// //       <Link href="/" className="text-xl font-bold">📚 STEM Books</Link>
// //       <div className="flex items-center gap-4">
// //         <DarkModeToggle />
// //         <Link href="/cart" className="bg-yellow text-black px-4 py-2 rounded-lg">
// //           Cart ({cart.length})
// //         </Link>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// "use client";
// import Link from "next/link";
// import { useCart } from "../context/CartContext";
// import Image from "next/image";

// const Navbar = () => {
//   const { cart } = useCart();

//   return (
//     <nav className="p-4 bg-orange text-white flex items-center justify-between shadow-md">
//       {/* Left: Logo + Brand Name */}
//       <Link href="/" className="flex items-center space-x-2">
//         {/* Replace '/logo.png' with the actual logo path */}
//         <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full" />
//         <span className="font-bold text-xl">STEM Books</span>
//       </Link>

//       {/* Right: Cart Button */}
//       <Link href="/cart" className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow text-black font-semibold hover:bg-yellow-600 transition duration-300">
//         <span>🛒 Cart</span>
//         <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//           {cart.length}
//         </span>
//       </Link>
//     </nav>
//   );
// };

// export default Navbar;

"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="p-4 bg-gray-bg text-gray-900 flex items-center justify-between shadow-md">
      {/* Left: Logo + Brand Name */}
      <Link href="/" className="flex items-center space-x-2">
        {/* Replace '/logo.png' with the actual logo path */}
        <Image src="/logo.png" alt="Logo" width={100} height={70} className="rounded-full" />
        {/* <span className=" font-bold text-xl text-orange">STEM Books</span> */}
      </Link>

      {/* Right: Cart Button */}
       <Link href="/cart" className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow text-black font-semibold hover:bg-yellow-600 transition duration-300">
         <span>🛒 Cart</span>
         <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
           {cart.length}
         </span>
      </Link>
    </nav>
  );
};

export default Navbar;
