import React, { useContext } from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, SignOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed out",
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
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Dropdown */}
          <div className="lg:hidden dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost p-2 text-[#780116] dark:text-[#c32f27]"
            >
              <FiAlignJustify size={26} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-white dark:bg-gray-800 rounded-lg mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="px-3 py-2 rounded font-medium text-[#c32f27] dark:text-[#c32f27] hover:bg-[#d8572a] hover:text-white dark:hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <AiOutlineAliwangwang className="text-4xl text-[#780116] group-hover:text-[#c32f27] dark:text-[#c32f27] dark:group-hover:text-[#c32f27] transition-colors" />
            <span className="text-2xl font-extrabold text-[#780116] group-hover:text-[#c32f27] dark:text-[#c32f27] dark:group-hover:text-[#c32f27] transition-colors">
              Web-Blog
            </span>
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <ul className="hidden lg:flex gap-8 font-medium">
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={to}
                className="px-3 py-2 rounded-md text-[#c32f27] dark:text-[#c32f27] hover:bg-[#d8572a] hover:text-white dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-md font-semibold border border-[#c32f27] text-[#c32f27] hover:bg-[#c32f27] hover:text-white transition-colors duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-md font-semibold bg-[#c32f27] text-white shadow-md hover:bg-[#a1251a] transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-[#d8572a] hover:border-[#780116] dark:hover:border-[#c32f27] transition"
              >
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-3 w-56 p-2 border border-gray-200 dark:border-gray-700"
              >
                <li>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded hover:bg-[#d8572a] hover:text-white text-[#c32f27] dark:text-white font-medium"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="px-3 py-2 rounded hover:bg-[#d8572a] hover:text-white text-[#c32f27] dark:text-white font-medium"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded hover:bg-[#d8572a] hover:text-white text-[#c32f27] dark:text-white font-medium"
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
