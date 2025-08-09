import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className="bg-[#f7f7f7] py-12 px-6 text-center rounded-lg shadow-md max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-label="Newsletter subscription section"
    >
      <Toaster position="top-center" />

      <motion.h2
        className="text-3xl font-extrabold mb-4 text-[#780116]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Subscribe to Our Newsletter
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Stay updated with the latest blog posts, tips, and insights delivered
        directly to your inbox.
      </motion.p>

      <motion.form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        noValidate
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.input
          type="email"
          placeholder="Enter your email address"
          className="p-3 w-full sm:w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#780116] transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          disabled={isSubmitting}
          required
          whileFocus={{ scale: 1.03, borderColor: "#780116" }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.button
          whileHover={{ scale: 1.07, backgroundColor: "#780116" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`bg-[#d8572a] text-white px-6 py-3 rounded-md font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isSubmitting}
          aria-live="polite"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default Newsletter;
