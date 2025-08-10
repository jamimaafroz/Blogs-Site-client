import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blogs and wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: blogData } = await axios.get(
          "https://blogs-server-indol.vercel.app/allBlogs"
        );
        setBlogs(blogData);
        setFilteredBlogs(blogData);

        if (user?.email) {
          const token = await user.getIdToken();
          const { data: wishlistData } = await axios.get(
            `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setWishlist(wishlistData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to load blogs or wishlist. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter logic
  const handleSearch = () => {
    let result = [...blogs];

    if (selectedCategory) {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(result);
  };

  // Wishlist toggle
  const handleWishlistToggle = async (blog) => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to manage your wishlist.",
      });
    }

    try {
      const token = await user.getIdToken();
      const existing = wishlist.find((item) => item.blogId === blog._id);

      if (existing) {
        setWishlist((prev) => prev.filter((item) => item.blogId !== blog._id));
        await axios.delete(
          `https://blogs-server-indol.vercel.app/wishlist/${existing._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire({
          icon: "success",
          title: "Removed from Wishlist",
          text: `"${blog.title}" has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const tempId = Math.random().toString(36).substring(2, 9);
        const newWish = {
          _id: tempId,
          blogId: blog._id,
          userEmail: user.email,
          blogData: blog,
        };
        setWishlist((prev) => [...prev, newWish]);
        const res = await axios.post(
          "https://blogs-server-indol.vercel.app/wishlist",
          {
            blogId: blog._id,
            userEmail: user.email,
            blogData: blog,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.insertedId) {
          setWishlist((prev) =>
            prev.map((item) =>
              item._id === tempId ? { ...item, _id: res.data.insertedId } : item
            )
          );
        }
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: `"${blog.title}" has been added.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update wishlist. Please try again.",
      });
    }
  };

  const handleViewDetails = (id) => navigate(`/viewdetails/${id}`);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-8 border-t-8 border-gray-200 rounded-full h-16 w-16"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide text-[#780116]">
        All Blogs
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT FILTERS */}
        <motion.div
          className="lg:w-1/4 bg-white shadow-lg rounded-xl p-6 border border-gray-100"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="text-[#780116] text-lg" />
            <h2 className="text-lg font-semibold text-gray-800">
              Filter Blogs
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Find blogs by category or search for something specific.
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#780116]"
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#780116]"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full p-3 bg-[#d8572a] rounded-lg text-white hover:bg-[#780116] transition-colors flex justify-center"
          >
            <FaSearch size={18} />
            <span className="ml-2">Search</span>
          </button>
        </motion.div>

        {/* BLOG CARDS */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const isWishlisted = wishlist.some(
              (item) => item.blogId === blog._id
            );
            return (
              <motion.div
                key={blog._id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-44 object-cover"
                />
                <div className="flex flex-col flex-grow p-5">
                  <h2
                    className="mb-2 text-2xl font-semibold text-[#780116] truncate"
                    title={blog.title}
                  >
                    {blog.title}
                  </h2>
                  <p className="flex-grow text-gray-700">{blog.shortDesc}</p>
                  <p className="mb-4 mt-3 text-sm text-gray-500">
                    Category: {blog.category}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {!user ? (
                      <p className="italic text-sm text-gray-400">
                        Sign in to use wishlist
                      </p>
                    ) : (
                      <button
                        onClick={() => handleWishlistToggle(blog)}
                        className={`px-3 py-1 text-sm font-medium rounded-lg border transition ${
                          isWishlisted
                            ? "border-red-500 text-red-500 hover:bg-red-50"
                            : "border-blue-500 text-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        {isWishlisted
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(blog._id)}
                      className="text-sm font-medium text-[#780116] underline hover:no-underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
