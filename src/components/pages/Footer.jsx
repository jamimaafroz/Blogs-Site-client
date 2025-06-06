import React from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-[#fff] text-base-content p-10 border-t border-[#db7c26]">
      <aside>
        <div className="text-7xl text-[#780116]">
          <AiOutlineAliwangwang />
        </div>
        <p className="text-[#c32f27] font-semibold mt-2">
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-[#780116]">Services</h6>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Branding
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Design
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Marketing
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Advertisement
        </a>
      </nav>
      <nav>
        <h6 className="footer-title text-[#780116]">Company</h6>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          About us
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Contact
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Jobs
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Press kit
        </a>
      </nav>
      <nav>
        <h6 className="footer-title text-[#780116]">Legal</h6>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Terms of use
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Privacy policy
        </a>
        <a className="link link-hover text-[#d8572a] hover:text-[#f7b538]">
          Cookie policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
