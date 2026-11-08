import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiEdit, FiClock } from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const avatarFallback = (name) =>
  `https://ui-avatars.com/api/?background=e3637a&color=fff&name=${encodeURIComponent(
    name || "User",
  )}`;

const ViewDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Fetch current blog, comments, and related blogs
  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchBlog = axios.get(
      `https://blogs-server-indol.vercel.app/allBlogs/${id}`,
    );
    const fetchComments = axios.get(
      `https://blogs-server-indol.vercel.app/comments/${id}`,
    );
    const fetchRelated = axios.get(
      `https://blogs-server-indol.vercel.app/allBlogs`,
    );

    Promise.all([fetchBlog, fetchComments, fetchRelated])
      .then(([blogRes, commentsRes, relatedRes]) => {
        setBlog(blogRes.data);
        setComments(commentsRes.data);
        const others = relatedRes.data.filter((b) => b._id !== id).slice(0, 5);
        setRelatedBlogs(others);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load data",
          text: "Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner = Boolean(user?.email) && user.email === blog?.email;

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Empty Comment",
        text: "Please write something before submitting.",
      });
    }

    if (!user) {
      return Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "You need to be logged in to post comments.",
      });
    }

    const newComment = {
      blogId: id,
      username: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      email: user.email,
      comment: commentText.trim(),
    };

    try {
      const res = await axios.post(
        "https://blogs-server-indol.vercel.app/comments",
        newComment,
      );
      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
      Swal.fire({
        icon: "success",
        title: "Comment Posted",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to post comment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to post comment. Try again later.",
      });
    }
  };

  const handleRelatedBlogClick = (blogId) => {
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-[#e3637a]/20 border-t-[#e3637a]"
          aria-label="Loading blog"
        />
      </div>
    );

  if (!blog)
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Blog <span className="text-[#e3637a]">not found.</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Sorry, the blog you're looking for doesn't exist or was removed.
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

  const readMinutes = Math.max(
    1,
    Math.ceil((blog.longDesc?.trim().split(/\s+/).length || 0) / 200),
  );

  return (
    <motion.main
      className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:flex-row lg:gap-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Article */}
      <article className="min-w-0 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#e3637a] dark:text-gray-400"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="overflow-hidden rounded-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>

        <div className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
            {blog.category}
          </span>

          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {blog.title}
          </h1>

          {/* Author row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3637a]/10 font-semibold text-[#e3637a]">
                {(blog.username || "A").charAt(0).toUpperCase()}
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {blog.username || "Anonymous"}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock />
              {readMinutes} min read
            </span>
          </div>

          {isOwner && (
            <motion.button
              onClick={() => navigate(`/update/${id}`)}
              whileTap={{ scale: 0.96 }}
              aria-label="Update blog"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:border-[#e3637a] hover:bg-[#e3637a]/10 hover:text-[#e3637a] dark:border-gray-700 dark:text-gray-100"
            >
              <FiEdit size={16} />
              Update blog
            </motion.button>
          )}

          <p className="mt-8 border-l-2 border-[#e3637a] pl-5 font-heading text-xl italic leading-relaxed text-gray-700 dark:text-gray-300">
            {blog.shortDesc}
          </p>

          <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-8 text-gray-700 dark:text-gray-300">
            {blog.longDesc}
          </p>
        </div>

        {/* Comments */}
        <section className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
            Discussion
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-gray-900 dark:text-white">
            Comments <span className="text-[#e3637a]">({comments.length})</span>
          </h2>

          <div className="mt-6">
            {isOwner ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You can't comment on your own blog.
              </p>
            ) : user ? (
              <div>
                <textarea
                  rows={4}
                  placeholder="Write your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  aria-label="Write your comment"
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-gray-900 placeholder-gray-400 transition focus:border-[#e3637a] focus:outline-none focus:ring-4 focus:ring-[#e3637a]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleCommentSubmit}
                  aria-label="Submit comment"
                  className="group mt-3 inline-flex items-center gap-2 rounded-full bg-[#e3637a] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d8572a]"
                >
                  Post comment
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-[#e3637a] underline hover:no-underline"
                >
                  log in
                </button>{" "}
                to post comments.
              </p>
            )}
          </div>

          <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-800">
            {comments.length === 0 && (
              <p className="py-4 text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts.
              </p>
            )}
            {comments.map(({ _id, userPhoto, username, comment }) => (
              <div key={_id} className="flex items-start gap-4 py-5">
                <img
                  src={userPhoto || avatarFallback(username)}
                  alt={username || "User avatar"}
                  onError={(e) => {
                    e.currentTarget.src = avatarFallback(username);
                  }}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {username || "Anonymous"}
                  </p>
                  <p className="mt-1 break-words leading-relaxed text-gray-600 dark:text-gray-300">
                    {comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Sidebar */}
      <aside className="w-full border-t border-gray-200 pt-10 dark:border-gray-800 lg:sticky lg:top-24 lg:max-h-[80vh] lg:w-80 lg:self-start lg:overflow-y-auto lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
          Keep reading
        </span>
        <h3 className="mt-3 font-heading text-2xl font-extrabold text-gray-900 dark:text-white">
          More <span className="text-[#e3637a]">blogs.</span>
        </h3>

        <div className="mt-6 space-y-6">
          {relatedBlogs.map(({ _id, title, image, shortDesc }) => (
            <button
              key={_id}
              onClick={() => handleRelatedBlogClick(_id)}
              aria-label={`View details for blog: ${title}`}
              className="group flex w-full gap-4 text-left"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0">
                <h4 className="line-clamp-2 font-heading text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#e3637a] dark:text-white">
                  {title}
                </h4>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {shortDesc}
                </p>
              </div>
            </button>
          ))}
          {relatedBlogs.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No other blogs available.
            </p>
          )}
        </div>
      </aside>
    </motion.main>
  );
};

export default ViewDetails;
