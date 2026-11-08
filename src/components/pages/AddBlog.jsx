import axios from "axios";
import Swal from "sweetalert2";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiImage } from "react-icons/fi";
import { AuthContext } from "../Contexts/AuthContext";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const blogData = Object.fromEntries(formData.entries());

    blogData.email = user?.email || "";
    blogData.username = user?.displayName || "";

    try {
      const token = await user.getIdToken();
      console.log("Access Token (frontend):", token); // ✅ ensures token is fresh

      const res = await axios.post(
        "https://blogs-server-indol.vercel.app/blog",
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(token);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Blog added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add blog.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-gray-900 placeholder-gray-400 transition focus:border-[#e3637a] focus:outline-none focus:ring-4 focus:ring-[#e3637a]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-widest text-[#e3637a]";

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6">
      {/* Animated background circles */}
      <motion.div
        className="pointer-events-none absolute left-8 top-12 h-40 w-40 rounded-full bg-[#d8572a]/15 blur-3xl sm:left-16 sm:h-52 sm:w-52"
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-12 right-8 h-52 w-52 rounded-full bg-[#e3637a]/20 blur-3xl sm:right-16 sm:h-72 sm:w-72"
        animate={{ x: [0, -35, 25, 0], y: [0, 20, -25, 0] }}
        transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
            New Blog
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Share your <span className="text-[#e3637a]">story.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
            Fill in the details below and publish your blog for the community.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className={inputClass}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Image URL + Category */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="image" className={labelClass}>
                Image URL
              </label>
              <input
                id="image"
                type="text"
                name="image"
                className={inputClass}
                placeholder="https://..."
                required
                onChange={(e) => {
                  setImageUrl(e.target.value.trim());
                  setImageError(false);
                }}
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={inputClass}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          {/* Image preview */}
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              {imageError ? (
                <div className="flex aspect-[16/7] items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FiImage />
                  Couldn't load this image. Check the URL.
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt="Preview"
                  onError={() => setImageError(true)}
                  className="aspect-[16/7] w-full object-cover"
                />
              )}
            </div>
          )}

          {/* Short Description */}
          <div>
            <label htmlFor="shortDesc" className={labelClass}>
              Short Description
            </label>
            <textarea
              id="shortDesc"
              name="shortDesc"
              rows="3"
              className={`${inputClass} resize-none`}
              placeholder="A short summary of your blog"
              required
            />
          </div>

          {/* Long Description */}
          <div>
            <label htmlFor="longDesc" className={labelClass}>
              Content
            </label>
            <textarea
              id="longDesc"
              name="longDesc"
              rows="9"
              className={`${inputClass} resize-y`}
              placeholder="Write the full content of your blog"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e3637a] px-6 py-3.5 font-semibold text-white transition hover:bg-[#d8572a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e3637a]/30"
          >
            Publish blog
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default AddBlog;
