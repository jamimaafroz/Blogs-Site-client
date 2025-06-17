import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { FiBookOpen, FiMessageCircle, FiEdit } from "react-icons/fi";

const ViewDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBlog = axios.get(
      `https://blogs-server-indol.vercel.app/allBlogs/${id}`
    );
    const fetchComments = axios.get(
      `https://blogs-server-indol.vercel.app/comments/${id}`
    );

    Promise.all([fetchBlog, fetchComments])
      .then(([blogRes, commentsRes]) => {
        setBlog(blogRes.data);
        setComments(commentsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return alert("Comment cannot be empty");

    const newComment = {
      blogId: id,
      username: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      email: user.email,
      comment: commentText.trim(),
    };

    axios
      .post("https://blogs-server-indol.vercel.app/comments", newComment)
      .then((res) => {
        setComments([res.data, ...comments]);
        setCommentText("");
      })
      .catch((err) => console.error("Failed to post comment", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
      </div>
    );
  }

  if (!blog) return <p className="text-center text-gray-500">Blog not found</p>;

  const isOwner = user?.email === blog.email;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <h1 className="text-4xl font-bold">{blog.title}</h1>
      </motion.div>

      <p className="text-md text-gray-600 italic mb-4">{blog.shortDesc}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {blog.category}</p>
      <p className="mb-6 leading-relaxed text-gray-700">{blog.longDesc}</p>
      <p className="text-sm text-gray-500 mb-10">
        Posted by: {blog.username || "Anonymous"}
      </p>

      {isOwner && (
        <motion.button
          onClick={() => navigate(`/update/${id}`)}
          className="mb-8 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
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
          <p className="text-red-500 mb-4">
            You cannot comment on your own blog.
          </p>
        ) : user ? (
          <div className="mb-6">
            <textarea
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="4"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <motion.button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              whileTap={{ scale: 0.95 }}
            >
              Submit Comment
            </motion.button>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">Please log in to comment.</p>
        )}

        <div className="space-y-4">
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex items-start space-x-4 border-b pb-4"
            >
              <img
                src={c.userPhoto || "https://via.placeholder.com/40"}
                alt={c.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{c.username}</p>
                <p>{c.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ViewDetails;
