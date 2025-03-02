"use client";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-light rounded-full">
      {darkMode ? <FaSun className="text-yellow text-2xl" /> : <FaMoon className="text-gray-800 text-2xl" />}
    </button>
  );
};

export default DarkModeToggle;
