import React from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link
          to="/"
          className="text-[#780116] hover:text-[#d8572a] font-semibold"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/addBlog"
          className="text-[#780116] hover:text-[#d8572a] font-semibold"
        >
          Add Blog
        </Link>
      </li>
      <li>
        <Link
          to="/Blogs"
          className="text-[#780116] hover:text-[#d8572a] font-semibold"
        >
          All Blogs
        </Link>
      </li>
      <li>
        <Link
          to="/Features"
          className="text-[#780116] hover:text-[#d8572a] font-semibold"
        >
          Featured Blogs
        </Link>
      </li>
      <li>
        <Link
          to="/wishList"
          className="text-[#780116] hover:text-[#d8572a] font-semibold"
        >
          Wishlist
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar  shadow-sm px-4">
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
            {links}
          </ul>
        </div>
        <icon className="text-3xl text-[#780116]">
          <AiOutlineAliwangwang />
        </icon>

        <Link
          to="/"
          className="text-3xl font-bold text-[#780116] hover:text-[#c32f27] ml-2"
          aria-label="Web-Blog Home"
        >
          Web-Blog
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 px-1">{links}</ul>
      </div>

      <div className="navbar-end flex gap-3">
        <Link
          to="/login"
          className="btn bg-[#c32f27] text-white hover:bg-[#d8572a] border-none"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="btn bg-[#c32f27]  text-white hover:bg-[#d8572a] border-none"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
    <div class="w-10 rounded-full">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <ul
    tabindex="0"
    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  >
    <li>
      <a class="justify-between">
        Profile
        <span class="badge">New</span>
      </a>
    </li>
    <li>
      <a>Settings</a>
    </li>
    <li>
      <a>Logout</a>
    </li>
  </ul>
</div> */
}
