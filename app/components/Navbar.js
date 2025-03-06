"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Home, Menu, X, Book } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-gray-bg text-gray-900 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Home Link (on larger screens) */}
        <div className="flex items-center space-x-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={70}
              className="rounded-full"
            />
          </Link>

          {/* Home link - visible only on medium+ screens */}
          <Link
            href="/"
            className="hidden md:flex items-center space-x-1 text-gray-900 hover:text-orange font-medium transition duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/quote"
            className="hidden md:flex items-center space-x-1 text-gray-900 hover:text-orange font-medium transition duration-200"
          >
            <Book className="w-5 h-5" />
            <span>Quote</span>
          </Link>
        </div>

        {/* Right: Cart Button + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Cart Button (always visible) */}
          <Link
            href="/cart"
            className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow text-black font-semibold hover:bg-yellow-600 transition duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* Hamburger Icon - only on small screens */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - shown when menuOpen is true */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden mt-4 space-y-4 bg-gray-100 rounded-lg p-4`}
      >
        <Link
          href="/"
          className="flex items-center space-x-2 text-gray-900 hover:text-orange font-medium"
          onClick={() => setMenuOpen(false)}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/quote"
          className="flex items-center space-x-2 text-gray-900 hover:text-orange font-medium"
          onClick={() => setMenuOpen(false)}
        >
          <Book className="w-5 h-5" />
          <span>Quote</span>
        </Link>
        <Link
          href="/cart"
          className="flex items-center space-x-2 text-gray-900 hover:text-orange font-medium"
          onClick={() => setMenuOpen(false)}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart ({cart.length})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
