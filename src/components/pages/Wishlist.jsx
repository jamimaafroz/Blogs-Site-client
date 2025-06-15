import React, { useContext, useEffect, useState } from "react";
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
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/wishlist/${user.email}`
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
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
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
        <span className="text-xl text-gray-500">Loading...</span>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-[#780116] mb-6">
        ❤️ My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(({ _id, blogData, blogId }) => (
          <div
            key={_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blogData?.image}
              alt={blogData?.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blogData?.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{blogData?.category}</p>
              <p className="text-sm text-gray-500">{blogData?.shortDesc}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDetails(blogId)}
                  className="text-blue-500 hover:underline"
                >
                  Details
                </button>
                <button
                  onClick={() => handleRemove(_id)}
                  className="text-red-500 hover:underline"
                >
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
