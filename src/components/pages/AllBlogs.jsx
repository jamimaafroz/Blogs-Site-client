import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get("http://localhost:3000/allBlogs");
        setBlogs(blogRes.data);
        setFilteredBlogs(blogRes.data);

        if (user && user.email) {
          const token = await user.getIdToken(); // ✅ Get Firebase token here
          const wishlistRes = await axios.get(
            `http://localhost:3000/wishlist/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // ✅ Send it here
              },
            }
          );
          setWishlist(wishlistRes.data);
        }
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
      Swal.fire({
        icon: "warning",
        title: "Not logged in",
        text: "You must be logged in to use the wishlist.",
      });
      return;
    }

    try {
      const token = await user.getIdToken(); // ✅ Get Firebase token

      const blogId = blog._id;
      const existing = wishlist.find((item) => item.blogId === blogId);

      if (existing) {
        // Optimistically remove from UI
        setWishlist((prev) => prev.filter((item) => item.blogId !== blogId));

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: `"${blog.title}" removed from your wishlist.`,
          timer: 1500,
          showConfirmButton: false,
        });

        // DELETE request with Firebase token
        await axios.delete(`http://localhost:3000/wishlist/${existing._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const tempId = Math.random().toString(36).substring(2, 9);
        const newWish = {
          _id: tempId,
          blogId,
          userEmail: user.email,
          blogData: blog,
        };

        // Optimistically add to UI
        setWishlist((prev) => [...prev, newWish]);

        Swal.fire({
          icon: "success",
          title: "Added!",
          text: `"${blog.title}" added to your wishlist.`,
          timer: 1500,
          showConfirmButton: false,
        });

        // POST request with Firebase token
        const res = await axios.post(
          "http://localhost:3000/wishlist",
          {
            blogId,
            userEmail: user.email,
            blogData: blog,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.insertedId) {
          setWishlist((prev) =>
            prev.map((item) =>
              item._id === tempId ? { ...item, _id: res.data.insertedId } : item
            )
          );
        }
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Could not update wishlist. Please try again.",
      });
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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-[#780116] font-extrabold text-center mb-8 tracking-wide">
        All Blogs
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-10">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-[#780116]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-[#780116]"
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
          className="bg-[#d8572a] text-white p-3 rounded-lg hover:bg-[#780116] transition"
          aria-label="Search blogs"
        >
          <FaSearch size={18} />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => {
          const isWishlisted = wishlist.some(
            (item) => item.blogId === blog._id
          );

          return (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover transition-transform duration-300"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-[#780116] truncate">
                  {blog.title}
                </h2>
                <p className="text-gray-700 flex-grow">{blog.shortDesc}</p>
                <p className="text-sm text-gray-500 mt-3 mb-4">
                  Category: {blog.category}
                </p>
                <div className="flex justify-between items-center gap-3 flex-wrap">
                  {!user ? (
                    <p className="text-gray-400 text-sm italic">
                      Sign in to use wishlist
                    </p>
                  ) : (
                    <button
                      onClick={() => handleWishlistToggle(blog)}
                      className={`text-sm font-medium px-3 py-1 rounded-lg border transition ${
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
                    className="text-sm font-medium text-[#780116] underline hover:no-underline"
                    onClick={() => handleViewDetails(blog._id)}
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
  );
};

export default AllBlogs;
