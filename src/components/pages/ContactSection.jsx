import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
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

    // Simulate success response
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your message has been sent successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-gray-900 placeholder-gray-400 transition focus:border-[#e3637a] focus:outline-none focus:ring-4 focus:ring-[#e3637a]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white";

  const contactItems = [
    {
      Icon: FaMapMarkerAlt,
      label: "Address",
      value: "123 Blog Street, Dhaka, Bangladesh",
    },
    { Icon: FaPhone, label: "Phone", value: "+880 199168xx87" },
    { Icon: FaEnvelope, label: "Email", value: "jamimaafroz123@gmail.com" },
  ];

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6"
      aria-label="Contact us"
    >
      {/* Animated background circles */}
      <motion.div
        className="pointer-events-none absolute left-8 top-12 h-40 w-40 rounded-full bg-[#d8572a]/15 blur-3xl sm:left-16 sm:h-52 sm:w-52"
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-12 right-8 h-52 w-52 rounded-full bg-[#e3637a]/20 blur-3xl sm:right-16 sm:h-72 sm:w-72"
        animate={{ x: [0, -35, 25, 0], y: [0, 20, -25, 0] }}
        transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
            Contact
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Let's <span className="text-[#e3637a]">talk.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
            Questions, ideas or feedback? Send us a message and we'll get back
            to you.
          </p>
        </motion.div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact info */}
          <div className="space-y-8">
            {contactItems.map(({ Icon, label, value }, index) => (
              <motion.div
                key={label}
                className="group flex items-center gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e3637a]/10 text-[#e3637a] transition-all duration-300 group-hover:bg-[#e3637a] group-hover:text-white">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#e3637a]">
                    {label}
                  </p>
                  <p className="mt-1 break-words text-gray-900 dark:text-gray-100">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              aria-label="Your name"
              aria-required="true"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              aria-label="Your email"
              aria-required="true"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              aria-label="Your message"
              aria-required="true"
            />

            <button
              type="submit"
              aria-label="Send message"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e3637a] px-6 py-3.5 font-semibold text-white transition hover:bg-[#d8572a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e3637a]/30"
            >
              Send message
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
