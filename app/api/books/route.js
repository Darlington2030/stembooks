// import { NextResponse } from "next/server";

// const books = [
//   { id: 1, title: "STEM for Kids", category: "kids", price: 15, image: "/book.jpg" },
//   { id: 2, title: "Physics for Teens", category: "teens", price: 20, image: "/book.jpg" },
//   { id: 3, title: "Creative Engineering", category: "creative", price: 25, image: "/book.jpg" },
//   { id: 4, title: "Math Adventures", category: "kids", price: 18, image: "/book.jpg" },
//   { id: 5, title: "AI for Teens", category: "teens", price: 30, image: "/book5.jpg" },
//   { id: 6, title: "Robotics 101", category: "creative", price: 35, image: "/book6.jpg" }
// ];

// export async function GET() {
//   return NextResponse.json(books);
// }
export async function GET() {
  const books = [
    {
      id: 1,
      title: "STEM for Kids",
      category: "kids",
      price: 15,
      image: "/images/book.png", // Ensure these images exist in /public/images
    },
    {
      id: 2,
      title: "Physics for Teens",
      category: "teens",
      price: 20,
      image: "/images/book.png",
    },
    {
      id: 3,
      title: "Creative Engineering",
      category: "innovators",
      price: 25,
      image: "/images/book.png",
    },
    {
      id: 4,
      title: "Math Adventures",
      category: "kids",
      price: 18,
      image: "/images/book.png",
    },
    {
      id: 5,
      title: "AI for Teens",
      category: "teens",
      price: 30,
      image: "/images/book.png",
    },
    {
      id: 6,
      title: "Robotics 101",
      category: "innovators",
      price: 35,
      image: "/images/book.png",
    },
    { id: 7, title: "Space Science", category: "innovators", price: 22, image: "/images/book.jpg" },
  { id: 8, title: "Engineering Wonders", category: "teens", price: 28, image: "/images/book.jpg" },
  { id: 9, title: "Coding for Kids", category: "kids", price: 16, image: "/images/book.jpg" },
  { id: 10, title: "Machine Learning Basics", category: "teens", price: 32, image: "/images/book.jpg" }
  ];

  return new Response(JSON.stringify(books), {
    headers: { "Content-Type": "application/json" },
  });
}
