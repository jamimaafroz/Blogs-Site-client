import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    image: "",
    longDesc: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch blog data for pre-fill
    axios
      .get(`http://localhost:3000/allBlogs/${id}`)
      .then((res) => {
        // Check ownership before allowing update
        if (res.data.email !== user.email) {
          setError("You are not authorized to update this blog.");
          setLoading(false);
          return;
        }
        setBlogData({
          title: res.data.title || "",
          category: res.data.category || "",
          image: res.data.image || "",
          longDesc: res.data.longDesc || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load blog data.");
        setLoading(false);
      });
  }, [id, user.email]);

  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation (you can expand this)
    if (!blogData.title.trim() || !blogData.longDesc.trim()) {
      setError("Title and Description are required.");
      return;
    }

    // Send update request
    axios
      .put(`http://localhost:3000/blogs/${id}`, blogData)
      .then(() => {
        alert("Blog updated successfully!");
        navigate(`/details/${id}`);
      })
      .catch(() => {
        setError("Failed to update blog.");
      });
  };

  if (loading) return <p>Loading blog data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={blogData.image}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="longDesc"
            value={blogData.longDesc}
            onChange={handleChange}
            rows="6"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
