import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allblogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
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
  }, [searchQuery, selectedCategory, blogs]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Categoroies</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

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
                  className={` btn text-blue-500 hover:underline ${
                    wishlist.includes(blog._id) ? "text-red-500" : ""
                  }`}
                >
                  {wishlist.includes(blog._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
                <button
                  className=" btn text-blue-500 hover:underline"
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
