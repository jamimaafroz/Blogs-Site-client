import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router";

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
    const fetchBlog = axios.get(`http://localhost:3000/allBlogs/${id}`);
    const fetchComments = axios.get(`http://localhost:3000/comments/${id}`);

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
      .post("http://localhost:3000/comments", newComment)
      .then((res) => {
        setComments([res.data, ...comments]);
        setCommentText("");
      })
      .catch((err) => console.error("Failed to post comment", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (!blog) return <p>Blog not found</p>;

  const isOwner = user?.email === blog.email;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={blog.image} alt={blog.title} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-4">Category: {blog.category}</p>
      <p className="mb-6">{blog.longDesc}</p>
      <p className="text-sm text-gray-600 mb-10">
        Posted by: {blog.username || "Anonymous"}
      </p>

      {/* Show Update button if current user is the owner */}
      {isOwner && (
        <button
          onClick={() => navigate(`/update/${id}`)}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      )}

      <section className="comments-section">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {isOwner ? (
          <p className="text-red-500 mb-4">
            You cannot comment on your own blog.
          </p>
        ) : user ? (
          <div className="mb-6">
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Comment
            </button>
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
    </div>
  );
};

export default ViewDetails;
