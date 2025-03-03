"use client";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["All", "Kids", "Teens", "Innovators"];

  return (
    <div className="flex gap-4 justify-center my-6">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === category ? "bg-orange text-white" : "bg-white text-black border border-orange"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
