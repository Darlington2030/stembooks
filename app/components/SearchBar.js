"use client";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" border border-orange w-full max-w-md p-2 border rounded-lg bg-white text-black placeholder-gray-600 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
