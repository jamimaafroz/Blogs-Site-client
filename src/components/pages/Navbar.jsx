import React, { useContext, useEffect, useState } from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ThemeToggle from "../../theme/ThemeToggle";
import { useLocation } from "react-router";

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
    { to: "/#recent", label: "Recent" },
    { to: "/#tips", label: "Tips" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
  ];

  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = pathname === "/" && !scrolled;
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-transparent backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile Dropdown */}
          <div className="xl:hidden dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost p-1 sm:p-2 text-[#e3637a] dark:text-[#e3637a]"
            >
              <FiAlignJustify size={24} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-white dark:bg-gray-800 rounded-lg mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="px-3 py-2 rounded font-medium text-[#c32f27] dark:text-[#e3637a] hover:bg-[#f7ac91] hover:text-white dark:hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <AiOutlineAliwangwang className="text-3xl sm:text-4xl text-[#e3637a] group-hover:text-[#c32f27] dark:text-[#e3637a] dark:group-hover:text-[#c32f27] transition-colors" />
            <span className="text-xl sm:text-2xl font-extrabold text-[#e3637a] group-hover:text-[#c32f27] dark:text-[#e3637a] dark:group-hover:text-[#c32f27] transition-colors">
              Web-Blog
            </span>
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <ul className="hidden xl:flex gap-1 font-medium text-sm">
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={to}
                className="px-3 py-2 rounded-md text-[#c32f27] dark:text-[#e3637a] hover:bg-[#f7ac91] hover:text-white dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Right: Auth Actions & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {!user ? (
            <Link
              to="/login"
              aria-label="Log in"
              title="Log in"
              className="btn btn-ghost btn-circle text-[#e3637a] hover:bg-[#f7ac91] hover:text-white transition-colors"
            >
              <FiUser size={22} />
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-[#d8572a] hover:border-[#780116] dark:hover:border-[#e3637a] transition"
              >
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-3 w-56 p-2 border border-gray-200 dark:border-gray-700 z-50"
              >
                <li>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded hover:bg-[#f7ac91] hover:text-white text-[#c32f27] dark:text-white font-medium"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="px-3 py-2 rounded hover:bg-[#f7ac91] hover:text-white text-[#c32f27] dark:text-white font-medium"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 rounded hover:bg-[#f7ac91] hover:text-white text-[#c32f27] dark:text-white font-medium"
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
