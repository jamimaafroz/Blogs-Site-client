import React, { useContext, useEffect, useState } from "react";
import { FiArrowRight, FiHeart, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setWishlist(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your wishlist. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.email, navigate]);

  const handleRemove = async (id) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(
        `https://blogs-server-indol.vercel.app/wishlist/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setWishlist((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item removed from your wishlist.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to remove item. Please try again.",
      });
    }
  };

  const handleDetails = (blogId) => {
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-[#e3637a]/20 border-t-[#e3637a]"
          aria-label="Loading wishlist"
        />
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e3637a]/10 text-[#e3637a]">
          <FiHeart size={28} />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Your wishlist is <span className="text-[#e3637a]">empty.</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Save blogs you love and they'll show up here.
        </p>
        <button
          onClick={() => navigate("/Blogs")}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#e3637a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d8572a]"
        >
          Browse blogs
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      {/* Header */}
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
          Saved
        </span>
        <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          My <span className="text-[#e3637a]">wishlist.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
          {wishlist.length} {wishlist.length === 1 ? "blog" : "blogs"} saved for
          later.
        </p>
      </motion.header>

      {/* Grid */}
      <section
        className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Wishlist blogs"
      >
        {wishlist.map(({ _id, blogData, blogId }, idx) => (
          <motion.article
            key={_id}
            className="group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={blogData?.image}
                alt={`Cover image for ${blogData?.title}`}
                loading="lazy"
                onClick={() => handleDetails(blogId)}
                className="aspect-[4/3] w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <button
                onClick={() => handleRemove(_id)}
                aria-label={`Remove ${blogData?.title} from wishlist`}
                title="Remove"
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-600 backdrop-blur transition hover:bg-red-500 hover:text-white dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-red-500 dark:hover:text-white"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            {/* Text, no box */}
            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#e3637a]">
                {blogData?.category}
              </span>

              <h2
                title={blogData?.title}
                className="mt-2 line-clamp-2 font-heading text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#e3637a] dark:text-white"
              >
                {blogData?.title}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {blogData?.shortDesc}
              </p>

              <button
                onClick={() => handleDetails(blogId)}
                aria-label={`View details of ${blogData?.title}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#e3637a] dark:text-gray-100"
              >
                Read more
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
};

export default Wishlist;
