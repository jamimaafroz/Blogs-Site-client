import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }

    // No real submission, just simulate success
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your message has been sent successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative bg-gradient-to-r from-[#fff7f0] via-[#ffd6c2] to-[#fff1e6] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-[#780116]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>

        <div className="mb-12 max-w-2xl mx-auto text-gray-700 text-lg space-y-6">
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <FaMapMarkerAlt className="text-[#d8572a] text-2xl" />
            <p>123 Blog Street, Writer City, Country</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <FaPhone className="text-[#d8572a] text-2xl" />
            <p>+123 456 7890</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <FaEnvelope className="text-[#d8572a] text-2xl" />
            <p>contact@yourblog.com</p>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6 text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d8572a]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d8572a]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d8572a]"
          />

          <button
            type="submit"
            className="w-full bg-[#d8572a] text-white py-3 rounded font-semibold hover:bg-[#780116] transition-colors"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      {/* Animated background circles */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-[#d8572a] opacity-10 rounded-full blur-3xl"
        animate={{ x: [0, 20, -15, 0], y: [0, -10, 15, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 bg-[#780116] opacity-10 rounded-full blur-4xl"
        animate={{ x: [0, -25, 20, 0], y: [0, 15, -20, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
      />
    </section>
  );
};

export default ContactSection;
