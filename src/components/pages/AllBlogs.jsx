import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allblogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data);
        setLoading(false); // stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false); // stop loading even if there’s an error
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = () => {
    let filtered = blogs;

    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleWishlistToggle = (blogId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(blogId)) {
        return prevWishlist.filter((id) => id !== blogId);
      }
      return [...prevWishlist, blogId];
    });
  };

  const handleViewDetails = (blogId) => {
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#780116] font-bold text-center mb-6">
        All Blogs
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-64"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-48"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#d8572a] text-white p-2 rounded hover:bg-[#780116]"
        >
          <FaSearch />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.shortDesc}</p>
              <p className="text-sm text-gray-500">Category: {blog.category}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleWishlistToggle(blog._id)}
                  className={`btn text-blue-500 hover:underline ${
                    wishlist.includes(blog._id) ? "text-red-500" : ""
                  }`}
                >
                  {wishlist.includes(blog._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
                <button
                  className="btn text-blue-500 hover:underline"
                  onClick={() => handleViewDetails(blog._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
