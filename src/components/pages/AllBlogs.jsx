import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../Contexts/AuthContext";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) return;

    const fetchData = async () => {
      try {
        const [blogRes, wishlistRes] = await Promise.all([
          axios.get("http://localhost:3000/allBlogs"),
          axios.get(`http://localhost:3000/wishlist/${user.email}`),
        ]);

        setBlogs(blogRes.data);
        setFilteredBlogs(blogRes.data);
        setWishlist(wishlistRes.data);
      } catch (err) {
        console.error("Error loading blogs or wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSearch = () => {
    let result = blogs;

    if (selectedCategory) {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  };

  const handleWishlistToggle = async (blog) => {
    if (!user || !user.email) {
      alert("You must be logged in to use the wishlist.");
      return;
    }

    const blogId = blog._id;
    const existing = wishlist.find((item) => item.blogId === blogId);

    try {
      if (existing) {
        await axios.delete(`http://localhost:3000/wishlist/${existing._id}`);
        setWishlist((prev) => prev.filter((item) => item.blogId !== blogId));
      } else {
        const res = await axios.post("http://localhost:3000/wishlist", {
          blogId,
          userEmail: user.email,
          blogData: blog,
        });

        if (res.data.insertedId) {
          setWishlist((prev) => [
            ...prev,
            {
              _id: res.data.insertedId,
              blogId,
              userEmail: user.email,
              blogData: blog,
            },
          ]);
        }
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      alert("Could not update wishlist.");
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/viewdetails/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-8 border-t-8 border-gray-200 rounded-full h-16 w-16"></div>
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
        {filteredBlogs.map((blog) => {
          const isWishlisted = wishlist.some(
            (item) => item.blogId === blog._id
          );

          return (
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
                <p className="text-sm text-gray-500">
                  Category: {blog.category}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleWishlistToggle(blog)}
                    className={`btn text-blue-500 hover:underline ${
                      isWishlisted ? "text-red-500" : ""
                    }`}
                  >
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
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
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
