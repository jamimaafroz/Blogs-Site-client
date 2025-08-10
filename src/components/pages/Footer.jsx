import React from "react";
import { AiOutlineAliwangwang } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-white text-base-content p-10 border-t border-[#db7c26]">
      <section className="flex flex-col items-start space-y-3">
        <div className="text-7xl text-[#780116]" aria-label="Company Logo">
          <AiOutlineAliwangwang />
        </div>
        <p className="text-[#c32f27] font-semibold mt-2 leading-relaxed max-w-xs">
          ACME Industries Ltd.
          <br />
          Delivering reliable technology solutions since 1992
        </p>
      </section>

      <section>
        <h6 className="footer-title text-[#780116] font-semibold mb-3">
          Services
        </h6>
        <p className="text-[#d8572a] mb-1">Branding</p>
        <p className="text-[#d8572a] mb-1">Design</p>
        <p className="text-[#d8572a] mb-1">Marketing</p>
        <p className="text-[#d8572a] mb-1">Advertisement</p>
      </section>

      <section>
        <h6 className="footer-title text-[#780116] font-semibold mb-3">
          Company
        </h6>
        <p className="text-[#d8572a] mb-1">About Us</p>
        <p className="text-[#d8572a] mb-1">Contact</p>
        <p className="text-[#d8572a] mb-1">Careers</p>
        <p className="text-[#d8572a] mb-1">Press Kit</p>
      </section>

      <section>
        <h6 className="footer-title text-[#780116] font-semibold mb-3">
          Legal
        </h6>
        <p className="text-[#d8572a] mb-1">Terms of Use</p>
        <p className="text-[#d8572a] mb-1">Privacy Policy</p>
        <p className="text-[#d8572a] mb-1">Cookie Policy</p>
      </section>
    </footer>
  );
};

export default Footer;
