import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiImage } from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const categories = ["Technology", "Travel", "Education", "Health", "Lifestyle"];

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-gray-900 placeholder-gray-400 transition focus:border-[#e3637a] focus:outline-none focus:ring-4 focus:ring-[#e3637a]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-widest text-[#e3637a]";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    image: "",
    shortDesc: "",
    longDesc: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBlog = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://blogs-server-indol.vercel.app/allBlogs/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res.data.email !== user.email) {
          setLoadError("You are not authorized to update this blog.");
          return;
        }

        setBlogData({
          title: res.data.title || "",
          category: res.data.category || "",
          image: res.data.image || "",
          shortDesc: res.data.shortDesc || "",
          longDesc: res.data.longDesc || "",
        });
      } catch (err) {
        console.error("Failed to load blog:", err);
        setLoadError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!blogData.title.trim() || !blogData.longDesc.trim()) {
      setFormError("Title and content are required.");
      return;
    }

    setSubmitting(true);
    try {
      const token = await user.getIdToken();
      const response = await axios.put(
        `https://blogs-server-indol.vercel.app/blogs/${id}`,
        blogData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Blog updated!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/Blogs"));
      } else {
        setFormError("No changes were made.");
      }
    } catch (err) {
      console.error("Failed to update blog:", err);
      setFormError("Failed to update blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !loadError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-[#e3637a]/20 border-t-[#e3637a]"
          aria-label="Loading blog"
        />
      </div>
    );
  }

  if (loadError) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Something <span className="text-[#e3637a]">went wrong.</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">{loadError}</p>
        <button
          onClick={() => navigate("/Blogs")}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#e3637a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d8572a]"
        >
          Back to blogs
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </section>
    );
  }

  // Keep an old category selectable even if it isn't in the list
  const categoryOptions =
    blogData.category && !categories.includes(blogData.category)
      ? [blogData.category, ...categories]
      : categories;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#e3637a] dark:text-gray-400"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
          Edit Blog
        </span>
        <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Update your <span className="text-[#e3637a]">story.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
          Make your changes below and save them.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-12 space-y-6"
        noValidate
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
            value={blogData.title}
            onChange={handleChange}
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
              value={blogData.image}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>
                Select category
              </option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image preview */}
        {blogData.image.trim() && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            {imageError ? (
              <div className="flex aspect-[16/7] items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiImage />
                Couldn't load this image. Check the URL.
              </div>
            ) : (
              <img
                src={blogData.image.trim()}
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
            value={blogData.shortDesc}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
            placeholder="A short summary of your blog"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="longDesc" className={labelClass}>
            Content
          </label>
          <textarea
            id="longDesc"
            name="longDesc"
            rows="9"
            value={blogData.longDesc}
            onChange={handleChange}
            className={`${inputClass} resize-y`}
            placeholder="Write the full content of your blog"
            required
          />
        </div>

        {/* Inline error, form stays visible */}
        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
          >
            {formError}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-gray-300 px-6 py-3.5 font-semibold text-gray-900 transition hover:border-[#e3637a] hover:text-[#e3637a] dark:border-gray-700 dark:text-gray-100 sm:w-40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#e3637a] px-6 py-3.5 font-semibold text-white transition hover:bg-[#d8572a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e3637a]/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              "Saving..."
            ) : (
              <>
                Save changes
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </motion.form>
    </section>
  );
};

export default UpdateBlog;
