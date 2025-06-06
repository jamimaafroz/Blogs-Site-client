import React, { useState } from "react";

const AddBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    category: "",
    shortDesc: "",
    longDesc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog submitted:", blogData);
    // Optional: Reset form or send data to backend
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 my-8">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl p-6 rounded-md">
        <h2 className="text-2xl font-semibold text-[#780116] mb-4 text-center">
          Submit a New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#780116] mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block text-[#780116] mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={blogData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label className="block text-[#780116] mb-1">Category</label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div>
            <label className="block text-[#780116] mb-1">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              value={blogData.shortDesc}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Short summary of your blog"
              required
            />
          </div>

          <div>
            <label className="block text-[#780116] mb-1">
              Long Description
            </label>
            <textarea
              name="longDesc"
              value={blogData.longDesc}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-40"
              placeholder="Full content of your blog"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full mt-2 bg-[#c32f27] text-[#f7b538] hover:bg-[#d8572a] border-none"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
