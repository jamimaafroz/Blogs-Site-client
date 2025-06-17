import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FiInfo, FiHeart } from "react-icons/fi";

const RecentBlogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get(
          "https://blogs-server-indol.vercel.app/allBlogs"
        );
        setBlogs(blogRes.data.slice(0, 6)); // Only 6
        if (user?.email) {
          const wishRes = await axios.get(
            `https://blogs-server-indol.vercel.app/wishlist/${user.email}`
          );
          setWishlist(wishRes.data);
        }
      } catch (err) {
        console.error("Error loading recent blogs or wishlist:", err);
      }
    };
    fetchData();
  }, [user]);

  const handleDetails = (id) => {
    navigate(`/viewdetails/${id}`);
  };

  const handleAddToWishlist = async (blog) => {
    if (!user) {
      Swal.fire("Please log in to use the wishlist", "", "info");
      return;
    }

    const alreadyExists = wishlist.some((item) => item.blogId === blog._id);
    if (alreadyExists) {
      Swal.fire(
        "Already in wishlist!",
        `"${blog.title}" is already added.`,
        "info"
      );
      return;
    }

    try {
      const res = await axios.post(
        "https://blogs-server-indol.vercel.app/wishlist",
        {
          blogId: blog._id,
          userEmail: user.email,
          blogData: blog,
        }
      );

      if (res.data.insertedId) {
        setWishlist((prev) => [
          ...prev,
          { ...blog, blogId: blog._id, _id: res.data.insertedId },
        ]);
        Swal.fire("Added!", `"${blog.title}" added to wishlist.`, "success");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      Swal.fire("Failed to add to wishlist", "", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 rounded-2xl ">
      <motion.h2
        className="text-4xl font-extrabold text-center text-[#780116] mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Recent Blogs
      </motion.h2>
      <motion.p
        className="text-center text-gray-700 max-w-2xl mx-auto mb-10 "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Dive into the latest stories and insights carefully curated to inspire
        and inform. Stay ahead with fresh content that fuels your passion and
        curiosity.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(120, 1, 22, 0.3)",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-[#780116] truncate mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-3 flex-grow">
                {blog.shortDesc?.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Category: {blog.category}
              </p>
              <div className="flex justify-between gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDetails(blog._id)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                  aria-label="View Details"
                >
                  <FiInfo size={20} />
                  Details
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleAddToWishlist(blog)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                  aria-label="Add to Wishlist"
                >
                  <FiHeart size={20} />
                  Add to Wishlist
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
