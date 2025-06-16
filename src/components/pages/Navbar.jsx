import React, { useContext } from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, SignOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed out!",
          text: "See you next time 😊",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", error.message, "error");
      });
  };

  const links = [
    { to: "/", label: "Home" },
    ...(user ? [{ to: "/addBlog", label: "Add Blog" }] : []),
    { to: "/Blogs", label: "All Blogs" },
    { to: "/Features", label: "Featured Blogs" },
    ...(user ? [{ to: "/wishList", label: "Wishlist" }] : []),
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Mobile dropdown */}
          <div className="lg:hidden dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost p-2 text-[#780116] hover:text-[#d8572a]"
            >
              <FiAlignJustify size={28} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-[#f7b538] rounded-lg mt-3 w-52 p-3 shadow-lg border border-[#d8572a]"
            >
              {links.map(({ to, label }) => (
                <li key={to} className="mb-1 last:mb-0">
                  <Link
                    to={to}
                    className="block px-3 py-2 rounded font-semibold text-[#780116] hover:bg-[#d8572a] hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo icon */}
          <AiOutlineAliwangwang className="text-4xl text-[#780116]" />
          <Link
            to="/"
            className="text-3xl font-extrabold text-[#780116] hover:text-[#c32f27] transition"
            aria-label="Web-Blog Home"
          >
            Web-Blog
          </Link>
        </div>

        {/* Center: Desktop menu */}
        <ul className="hidden lg:flex gap-10 font-semibold text-[#780116]">
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.1, color: "#d8572a" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={to}
                className="px-2 py-1 rounded-md hover:bg-[#f7b538] transition"
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Right: Auth buttons or user avatar */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn bg-[#c32f27] px-5 py-2 rounded-md text-white font-semibold shadow-md hover:bg-[#d8572a] transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn bg-[#c32f27] px-5 py-2 rounded-md text-white font-semibold shadow-md hover:bg-[#d8572a] transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end relative">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-[#d8572a] hover:border-[#780116] transition rounded-full overflow-hidden"
              >
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-56 p-3 border border-[#d8572a]"
              >
                <li>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded hover:bg-[#f7b538] text-[#780116] font-semibold"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="px-3 py-2 rounded hover:bg-[#f7b538] text-[#780116] font-semibold"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded hover:bg-[#f7b538] text-[#780116] font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
