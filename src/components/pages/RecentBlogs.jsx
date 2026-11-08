import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FiInfo, FiHeart } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const RecentBlogs = ({ filterCategory }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get(
          "https://blogs-server-indol.vercel.app/allBlogs",
        );
        setBlogs(blogRes.data);

        if (user?.email) {
          const token = await user.getIdToken();
          const wishRes = await axios.get(
            `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
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

  // const handleAddToWishlist = async (blog) => {
  //   if (!user) {
  //     Swal.fire("Please log in to use the wishlist", "", "info");
  //     return;
  //   }

  //   const alreadyExists = wishlist.some((item) => item.blogId === blog._id);
  //   if (alreadyExists) {
  //     Swal.fire(
  //       "Already in wishlist!",
  //       `"${blog.title}" is already added.`,
  //       "info",
  //     );
  //     return;
  //   }

  //   try {
  //     const token = await user.getIdToken();
  //     const res = await axios.post(
  //       "https://blogs-server-indol.vercel.app/wishlist",
  //       {
  //         blogId: blog._id,
  //         userEmail: user.email,
  //         blogData: blog,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (res.data.item?._id) {
  //       setWishlist((prev) => [
  //         ...prev,
  //         { ...blog, blogId: blog._id, _id: res.data.item._id },
  //       ]);
  //       Swal.fire({
  //         title: "Added to Wishlist!",
  //         text: `"${blog.title}" has been added.`,
  //         icon: "success",
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Wishlist error:", error);
  //     Swal.fire("Failed to add to wishlist", "", "error");
  //   }
  // };
  const visibleBlogs = (
    filterCategory
      ? blogs.filter(
          (b) => b.category?.toLowerCase() === filterCategory.toLowerCase(),
        )
      : blogs
  ).slice(0, 4);

  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 py-16"
      aria-label="Recent blogs"
    >
      <motion.div
        className="flex items-end justify-between gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
            Latest
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Recent <span className="text-[#e3637a]">blogs.</span>
          </h2>
          <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
            Fresh stories and ideas from our community.
          </p>
        </div>

        <button
          onClick={() => navigate("/Blogs")}
          aria-label="See all blogs"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:border-[#e3637a] hover:bg-[#e3637a]/10 hover:text-[#e3637a] dark:border-gray-700 dark:text-gray-100 dark:hover:border-[#e3637a] dark:hover:text-[#e3637a]"
        >
          <span className="hidden sm:inline">See all</span>
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {visibleBlogs.length === 0 && (
        <p className="mt-12 text-center text-gray-500 dark:text-gray-400">
          No blogs found for this tag yet.
        </p>
      )}

      {/* Grid*/}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {visibleBlogs.map((blog, idx) => (
          <motion.article
            key={blog._id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
            onClick={() => handleDetails(blog._id)}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e3637a]">
                {blog.category}
              </span>

              <h3
                title={blog.title}
                className="mt-2 font-heading text-2xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#e3637a] dark:text-white line-clamp-2"
              >
                {blog.title}
              </h3>

              <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
                {blog.shortDesc || "No description available."}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetails(blog._id);
                }}
                aria-label={`Read ${blog.title}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#e3637a] dark:text-gray-100"
              >
                Read more
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
