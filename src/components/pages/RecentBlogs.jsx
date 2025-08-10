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
        setBlogs(blogRes.data.slice(0, 8)); // Show 8 recent blogs for better row fill

        if (user?.email) {
          const token = await user.getIdToken();
          const wishRes = await axios.get(
            `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setWishlist(wishRes.data);
        }
      } catch (error) {
        console.error("Error fetching blogs or wishlist:", error);
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
      const token = await user.getIdToken();
      const res = await axios.post(
        "https://blogs-server-indol.vercel.app/wishlist",
        {
          blogId: blog._id,
          userEmail: user.email,
          blogData: blog,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.item?._id) {
        setWishlist((prev) => [
          ...prev,
          { ...blog, blogId: blog._id, _id: res.data.item._id },
        ]);
        Swal.fire({
          title: "Added to Wishlist!",
          text: `"${blog.title}" has been added.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      Swal.fire("Failed to add to wishlist", "", "error");
    }
  };

  return (
    <section className="container mx-auto px-6 py-10 rounded-2xl">
      <motion.h2
        className="text-4xl font-extrabold text-center text-[#780116] mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Recent Blogs
      </motion.h2>
      <motion.p
        className="text-center text-gray-700 max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Dive into the latest stories and insights carefully curated to inspire
        and inform. Stay ahead with fresh content that fuels your passion and
        curiosity.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog, idx) => (
          <motion.article
            key={blog._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 24px rgba(120, 1, 22, 0.2)",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3
                className="text-lg font-semibold text-[#780116] mb-2 truncate"
                title={blog.title}
              >
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-3 flex-grow line-clamp-3">
                {blog.shortDesc || "No description available."}
              </p>
              <p className="text-sm text-gray-500 mb-4 uppercase font-medium tracking-wide">
                Category: {blog.category}
              </p>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDetails(blog._id)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  aria-label={`View details of ${blog.title}`}
                >
                  <FiInfo size={20} />
                  show More
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
