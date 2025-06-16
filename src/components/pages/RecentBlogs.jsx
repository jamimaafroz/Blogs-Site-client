import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RecentBlogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get("http://localhost:3000/allBlogs");
        setBlogs(blogRes.data.slice(0, 6)); // Only show 6
        if (user?.email) {
          const wishRes = await axios.get(
            `http://localhost:3000/wishlist/${user.email}`
          );
          setWishlist(wishRes.data);
        }
      } catch (err) {
        console.error("Error loading recent blogs or wishlist:", err);
      }
    };
    fetchData();
  }, [user]);

  const handleDetails = (id) => {
    navigate(`/viewdetails/${id}`);
  };

  const handleAddToWishlist = async (blog) => {
    if (!user) {
      Swal.fire("Please log in to use the wishlist", "", "info");
      return;
    }

    const alreadyExists = wishlist.some((item) => item.blogId === blog._id);
    if (alreadyExists) {
      Swal.fire(
        "Already in wishlist!",
        `"${blog.title}" is already added.`,
        "info"
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/wishlist", {
        blogId: blog._id,
        userEmail: user.email,
        blogData: blog,
      });

      if (res.data.insertedId) {
        setWishlist((prev) => [
          ...prev,
          { ...blog, blogId: blog._id, _id: res.data.insertedId },
        ]);
        Swal.fire("Added!", `"${blog.title}" added to wishlist.`, "success");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      Swal.fire("Failed to add to wishlist", "", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-[#780116] mb-8">
        Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mb-2">
                {blog.shortDesc?.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500">Category: {blog.category}</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleDetails(blog._id)}
                >
                  Details
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleAddToWishlist(blog)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
