import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const AddBlog = () => {
  const { user } = useContext(AuthContext);

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
        }
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

  return (
    <div className="flex justify-center items-center min-h-screen px-4 my-8">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl p-6 rounded-md">
        <h2 className="text-2xl font-semibold text-[#780116] mb-4 text-center">
          Submit a New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[#780116] mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[#780116] mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#780116] mb-1">Category</label>
            <select
              name="category"
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

          {/* Short Description */}
          <div>
            <label className="block text-[#780116] mb-1">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              className="textarea textarea-bordered w-full"
              placeholder="Short summary of your blog"
              required
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-[#780116] mb-1">
              Long Description
            </label>
            <textarea
              name="longDesc"
              className="textarea textarea-bordered w-full h-40"
              placeholder="Full content of your blog"
              required
            />
          </div>

          {/* Submit Button */}
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
