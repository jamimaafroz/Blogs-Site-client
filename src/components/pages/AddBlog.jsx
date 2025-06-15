import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2"; // import Swal
import { AuthContext } from "../Contexts/AuthContext";

const AllBlogs = ({ onWishlistChange }) => {
  const { user } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) return;

    const fetchBlogsAndWishlist = async () => {
      try {
        const [blogsRes, wishlistRes] = await Promise.all([
          axios.get("http://localhost:3000/allBlogs"),
          axios.get(`http://localhost:3000/wishlist/${user.email}`),
        ]);
        setBlogs(blogsRes.data);
        setFilteredBlogs(blogsRes.data);
        setWishlist(wishlistRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBlogsAndWishlist();
  }, [user]);

  const handleSearch = () => {
    let filtered = blogs;
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBlogs(filtered);
  };

  const handleWishlistToggle = async (blog) => {
    if (!user || !user.email) {
      Swal.fire("Oops!", "Please log in to modify your wishlist.", "warning");
      return;
    }

    const blogId = blog._id;
    const userEmail = user.email;

    try {
      const isInWishlist = wishlist.some((item) => item.blogId === blogId);

      if (isInWishlist) {
        const wishlistItem = wishlist.find((item) => item.blogId === blogId);
        if (!wishlistItem) {
          Swal.fire("Error", "Wishlist item not found", "error");
          return;
        }
        await axios.delete(
          `http://localhost:3000/wishlist/${wishlistItem._id}`
        );

        setWishlist((prev) => prev.filter((item) => item.blogId !== blogId));
        Swal.fire("Removed!", "Removed from wishlist.", "success");

        if (onWishlistChange) onWishlistChange();
      } else {
        const res = await axios.post("http://localhost:3000/wishlist", {
          blogId,
          userEmail,
          blogData: blog,
        });

        if (res.data.acknowledged) {
          const newWishlistItem = {
            _id: res.data.insertedId,
            blogId,
            userEmail,
            blogData: blog,
          };
          setWishlist((prev) => [...prev, newWishlistItem]);
          Swal.fire("Added!", "Added to wishlist!", "success");

          if (onWishlistChange) onWishlistChange();
        }
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      Swal.fire("Error", "Error updating wishlist.", "error");
    }
  };

  const handleViewDetails = (blogId) => {
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-[#780116] font-bold text-center mb-6">
        All Blogs
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blogs by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-64"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-48"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#d8572a] text-white p-2 rounded hover:bg-[#780116]"
          aria-label="Search blogs"
        >
          <FaSearch />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => {
          const isWishlisted = wishlist.some(
            (item) => item.blogId === blog._id
          );

          return (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600">{blog.shortDesc}</p>
                <p className="text-sm text-gray-500">
                  Category: {blog.category}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleWishlistToggle(blog)}
                    className={`btn text-blue-500 hover:underline ${
                      isWishlisted ? "text-red-500" : ""
                    }`}
                  >
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                  <button
                    className="btn text-blue-500 hover:underline"
                    onClick={() => handleViewDetails(blog._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
