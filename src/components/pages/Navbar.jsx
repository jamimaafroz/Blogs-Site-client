import React, { useContext } from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

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
    { to: "/addBlog", label: "Add Blog" },
    { to: "/Blogs", label: "All Blogs" },
    { to: "/Features", label: "Featured Blogs" },
    { to: "/wishList", label: "Wishlist" },
  ];

  return (
    <div className="navbar shadow-sm px-4 bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden p-2 text-[#780116]"
          >
            <FiAlignJustify size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#f7b538] rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
          >
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-[#780116] hover:text-[#d8572a] font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <AiOutlineAliwangwang className="text-3xl text-[#780116]" />

        <Link
          to="/"
          className="text-3xl font-bold text-[#780116] hover:text-[#c32f27] ml-2"
          aria-label="Web-Blog Home"
        >
          Web-Blog
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 px-1">
          {links.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-[#780116] hover:text-[#d8572a] font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn bg-[#c32f27] text-white hover:bg-[#d8572a] border-none"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="btn bg-[#c32f27] text-white hover:bg-[#d8572a] border-none"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/">Settings</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
