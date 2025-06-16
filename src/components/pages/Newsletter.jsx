import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <motion.div
      className="bg-[#f7f7f7] py-12 px-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" />

      <h2 className="text-3xl font-bold mb-4 text-[#780116]">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 mb-6">
        Get the latest blog updates and tips in your inbox.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 w-full sm:w-80 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#d8572a] text-white px-6 py-3 rounded-md"
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Newsletter;
