import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiBookOpen, FiMessageCircle, FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Fetch current blog, comments, and related blogs
  useEffect(() => {
    setLoading(true);

    const fetchBlog = axios.get(
      `https://blogs-server-indol.vercel.app/allBlogs/${id}`
    );
    const fetchComments = axios.get(
      `https://blogs-server-indol.vercel.app/comments/${id}`
    );
    const fetchRelated = axios.get(
      `https://blogs-server-indol.vercel.app/allBlogs`
    );

    Promise.all([fetchBlog, fetchComments, fetchRelated])
      .then(([blogRes, commentsRes, relatedRes]) => {
        setBlog(blogRes.data);
        setComments(commentsRes.data);

        // Filter out current blog and pick latest 5 for sidebar
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

  const isOwner = user?.email === blog?.email;

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
        newComment
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
    // Navigate to the clicked blog's detail page
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader border-8 border-t-8 border-gray-200 rounded-full h-16 w-16" />
      </div>
    );

  if (!blog)
    return (
      <p className="text-center text-gray-500 text-lg mt-20">
        Sorry, the requested blog was not found.
      </p>
    );

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main blog content */}
      <section className="flex-1 min-w-0">
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="flex items-center mb-2 space-x-2 text-[#780116]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FiBookOpen size={28} />
          <h1 className="text-4xl font-bold truncate">{blog.title}</h1>
        </motion.div>

        <p className="text-md text-gray-600 italic mb-4">{blog.shortDesc}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {blog.category}</p>
        <p className="mb-6 leading-relaxed text-gray-700 whitespace-pre-line">
          {blog.longDesc}
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Posted by: {blog.username || "Anonymous"}
        </p>

        {isOwner && (
          <motion.button
            onClick={() => navigate(`/update/${id}`)}
            className="mb-8 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            whileTap={{ scale: 0.95 }}
            aria-label="Update blog"
          >
            <FiEdit size={18} />
            Update Blog
          </motion.button>
        )}

        {/* Comments Section */}
        <section className="comments-section mt-10">
          <div className="flex items-center mb-4 space-x-2 text-[#780116]">
            <FiMessageCircle size={26} />
            <h2 className="text-2xl font-semibold">Comments</h2>
          </div>

          {isOwner ? (
            <p className="text-red-600 mb-4 font-semibold">
              You cannot comment on your own blog.
            </p>
          ) : user ? (
            <div className="mb-6">
              <textarea
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#780116]"
                rows={4}
                placeholder="Write your comment here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                aria-label="Write your comment"
              />
              <motion.button
                onClick={handleCommentSubmit}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileTap={{ scale: 0.95 }}
                aria-label="Submit comment"
              >
                Submit Comment
              </motion.button>
            </div>
          ) : (
            <p className="text-gray-600 mb-4 italic">
              Please log in to post comments.
            </p>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.length === 0 && (
              <p className="text-gray-500 italic">No comments yet.</p>
            )}
            {comments.map(({ _id, userPhoto, username, comment }) => (
              <div
                key={_id}
                className="flex items-start space-x-4 border-b border-gray-300 pb-4"
              >
                <img
                  src={userPhoto || "https://via.placeholder.com/40"}
                  alt={username || "User avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {username || "Anonymous"}
                  </p>
                  <p className="text-gray-700">{comment}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Sidebar with related blogs */}
      <aside className="w-full lg:w-80 border-l border-gray-300 pl-6 sticky top-24 self-start max-h-[80vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#780116] mb-6">More Blogs</h3>
        <div className="space-y-6">
          {relatedBlogs.map(({ _id, title, image, shortDesc }) => (
            <motion.div
              key={_id}
              className="flex gap-3 cursor-pointer hover:bg-[#f7f7f7] rounded-lg p-3 transition"
              onClick={() => handleRelatedBlogClick(_id)}
              whileHover={{ scale: 1.02 }}
              aria-label={`View details for blog: ${title}`}
            >
              <img
                src={image}
                alt={title}
                className="w-20 h-20 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-[#780116] truncate max-w-[12rem]">
                  {title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2 max-w-[12rem]">
                  {shortDesc}
                </p>
              </div>
            </motion.div>
          ))}
          {relatedBlogs.length === 0 && (
            <p className="text-gray-500 italic">No other blogs available.</p>
          )}
        </div>
      </aside>
    </motion.div>
  );
};

export default ViewDetails;
