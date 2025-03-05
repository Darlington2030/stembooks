"use client";
import { useEffect, useState } from "react";



import BookCard from "./components/BookCard";
import Categories from "./components/Categories";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Quote from "./components/QuoteForm";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  useEffect(() => {
    let filtered = books;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to page 1 when filtering
  }, [selectedCategory, searchQuery, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <main className="p-6 bg-gray-bg min-h-screen">
      <h1 className="text-2xl font-bold text-center text-orange mb-4">Explore STEM Books</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      
      <Pagination books={filteredBooks} currentPage={currentPage} setCurrentPage={setCurrentPage} booksPerPage={booksPerPage} />
      <Quote/>
    </main>
  );
}
