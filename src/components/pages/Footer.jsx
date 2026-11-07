import React from "react";
import { Link } from "react-router";
import { AiOutlineAliwangwang } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/Blogs", label: "All Blogs" },
      { to: "/Features", label: "Featured Blogs" },
      { to: "/#recent", label: "Recent Posts" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/#about", label: "About Us" },
      { to: "/#tips", label: "Writing Tips" },
      { to: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log In" },
      { to: "/addBlog", label: "Write a Blog" },
      { to: "/wishList", label: "Wishlist" },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d8572a] via-[#e3637a] to-[#c32f27]" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <AiOutlineAliwangwang className="text-5xl text-[#e3637a] group-hover:text-[#c32f27] transition-colors" />
              <span className="font-heading text-3xl font-extrabold text-[#e3637a] group-hover:text-[#c32f27] transition-colors">
                Web-Blog
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              A community for curious readers and passionate writers. Discover
              fresh perspectives and share your own story with the world.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#d8572a] hover:to-[#e3637a] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h6 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                {title}
              </h6>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#e3637a] dark:hover:text-[#e3637a] hover:translate-x-1 inline-block transition-all"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Web-Blog. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-[#e3637a] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-[#e3637a] transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
