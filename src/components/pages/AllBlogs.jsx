import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  FaFilter,
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaArrowRight,
} from "react-icons/fa";
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

  const categories = [
    "Technology",
    "Travel",
    "Education",
    "Health",
    "Lifestyle",
  ];

  // Fetch blogs and wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: blogData } = await axios.get(
          "https://blogs-server-indol.vercel.app/allBlogs",
        );
        setBlogs(blogData);
        setFilteredBlogs(blogData);

        if (user?.email) {
          const token = await user.getIdToken();
          const { data: wishlistData } = await axios.get(
            `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
            { headers: { Authorization: `Bearer ${token}` } },
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
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
          { headers: { Authorization: `Bearer ${token}` } },
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
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.data.insertedId) {
          setWishlist((prev) =>
            prev.map((item) =>
              item._id === tempId
                ? { ...item, _id: res.data.insertedId }
                : item,
            ),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#e3637a]/20 border-t-[#e3637a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#780116] dark:text-[#e3637a]">
          All Blogs
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Discover stories, ideas and experiences from our community.
        </p>
      </div>

      <motion.div
        className="mb-8 rounded-2xl p-4 sm:p-5 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col gap-4"
        >
          {/* Row 1: search + button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:border-[#e3637a] focus:ring-2 focus:ring-[#e3637a]/30 transition"
              />
            </div>

            <button
              type="submit"
              className="sm:w-40 py-3 rounded-xl bg-gradient-to-r from-[#d8572a] to-[#e3637a] text-white font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <FaSearch size={16} />
              Search
            </button>
          </div>

          {/* Row 2: category chips */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0">
              <FaFilter className="text-[#e3637a]" />
              Category
            </span>

            <div className="flex gap-2 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0">
              {["", ...categories].map((cat) => (
                <button
                  type="button"
                  key={cat || "all"}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    selectedCategory === cat
                      ? "bg-[#e3637a] border-[#e3637a] text-white shadow-md"
                      : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#e3637a] hover:text-[#e3637a]"
                  }`}
                >
                  {cat || "All"}
                </button>
              ))}
            </div>
          </div>
        </form>
      </motion.div>

      {/* BLOG CARDS */}
      <div className="lg:w-auto">
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-[#e3637a]">
            {filteredBlogs.length}
          </span>{" "}
          blogs
        </p>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
            No blogs found. Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => {
              const isWishlisted = wishlist.some(
                (item) => item.blogId === blog._id,
              );
              return (
                <motion.div
                  key={blog._id}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/80 text-[#c32f27] dark:text-[#e3637a] backdrop-blur">
                      {blog.category}
                    </span>

                    {user && (
                      <button
                        onClick={() => handleWishlistToggle(blog)}
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur text-[#e3637a] hover:scale-110 transition"
                      >
                        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-5">
                    <h2
                      title={blog.title}
                      className="text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-[#e3637a] transition-colors"
                    >
                      {blog.title}
                    </h2>
                    <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
                      {blog.shortDesc}
                    </p>

                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      {!user && (
                        <span className="text-xs italic text-gray-400">
                          Sign in to save
                        </span>
                      )}
                      <button
                        onClick={() => handleViewDetails(blog._id)}
                        className="ml-auto flex items-center gap-2 text-sm font-semibold text-[#e3637a] hover:text-[#c32f27] transition-colors"
                      >
                        View Details
                        <FaArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          size={12}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
