import React, { useContext, useEffect, useState } from "react";
import { FiHeart, FiInfo, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWishlist(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your wishlist. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.email, navigate]);

  const handleRemove = async (id) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(
        `https://blogs-server-indol.vercel.app/wishlist/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item removed from your wishlist.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to remove item. Please try again.",
      });
    }
  };

  const handleDetails = (blogId) => {
    navigate(`/viewdetails/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-12 w-12 text-[#c32f27]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center mt-16 text-gray-600 text-xl font-medium">
        Your wishlist is currently empty.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="flex flex-col items-center justify-center mb-8 space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center space-x-3">
          <FiHeart size={36} className="text-[#c32f27]" aria-hidden="true" />
          <h1 className="text-4xl font-extrabold text-[#780116]">
            My Wishlist
          </h1>
        </div>
        <p className="text-gray-700 text-lg">
          Keep track of your favorite blogs all in one place. Your wishlist lets
          you easily revisit inspiring posts, discover fresh perspectives, and
          manage content that matters most to you. Stay organized and never miss
          out on what sparks your creativity!
        </p>
      </header>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        aria-label="Wishlist blogs"
      >
        {wishlist.map(({ _id, blogData, blogId }) => (
          <article
            key={_id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={blogData?.image}
              alt={`Cover image for ${blogData?.title}`}
              className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2
                className="text-lg font-semibold text-[#780116] truncate mb-1"
                title={blogData?.title}
              >
                {blogData?.title}
              </h2>
              <p className="text-xs font-medium text-[#c32f27] mb-2">
                {blogData?.category}
              </p>
              <p className="text-gray-600 flex-grow text-sm">
                {blogData?.shortDesc}
              </p>

              <div className="mt-4 flex justify-between gap-3 flex-wrap">
                <button
                  onClick={() => handleDetails(blogId)}
                  className="flex items-center gap-2 text-[#1D4ED8] hover:text-[#2563EB] font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] rounded"
                  aria-label={`View details of ${blogData?.title}`}
                >
                  <FiInfo size={16} />
                  Details
                </button>
                <button
                  onClick={() => handleRemove(_id)}
                  className="flex items-center gap-2 text-[#dc2626] hover:text-[#b91c1c] font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#dc2626] rounded"
                  aria-label={`Remove ${blogData?.title} from wishlist`}
                >
                  <FiTrash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Wishlist;
