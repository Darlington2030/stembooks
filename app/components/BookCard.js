"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";


const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Image src={book.image} alt={book.title} width={200} height={300}  unoptimized className="w-full h-48 object-cover rounded" />
      <h2 className="text-black text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-gray-600">${book.price}</p>
      <button
        className="mt-2 w-full bg-yellow text-black py-2 rounded"
        onClick={() => addToCart(book)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
