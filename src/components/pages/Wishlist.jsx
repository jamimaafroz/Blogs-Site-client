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
        const token = await user.getIdToken(); // ✅ Get Firebase token
        const res = await axios.get(
          `https://blogs-server-indol.vercel.app/wishlist/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Include in headers
            },
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
      const token = await user.getIdToken(); // ✅ Get Firebase token
      await axios.delete(
        `https://blogs-server-indol.vercel.app/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include in headers
          },
        }
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
        <div className="loader border-8 border-t-8 border-gray-200 rounded-full h-16 w-16"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        Your wishlist is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="flex items-center justify-center text-4xl font-extrabold text-[#780116] mb-10 space-x-3">
        <FiHeart className="text-red-500" size={36} />
        <span>My Wishlist</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map(({ _id, blogData, blogId }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={blogData?.image}
              alt={blogData?.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-[#780116] truncate mb-2">
                {blogData?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{blogData?.category}</p>
              <p className="text-gray-500 flex-grow">{blogData?.shortDesc}</p>
              <div className="flex justify-between mt-5 gap-3 flex-wrap">
                <button
                  onClick={() => handleDetails(blogId)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  <FiInfo size={18} />
                  Details
                </button>
                <button
                  onClick={() => handleRemove(_id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  <FiTrash2 size={18} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
