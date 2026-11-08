import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

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
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6"
      aria-label="Newsletter subscription section"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: { borderRadius: "12px", background: "#1f2937", color: "#fff" },
        }}
      />

      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3637a]/10 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
          Newsletter
        </span>

        <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Stories worth <span className="text-[#e3637a]">your inbox.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
          One short email a week with fresh blogs, writing tips and ideas. No
          noise.
        </p>

        <form
          onSubmit={handleSubscribe}
          noValidate
          className="mx-auto mt-8 max-w-md"
        >
          <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1.5 transition focus-within:border-[#e3637a] focus-within:ring-4 focus-within:ring-[#e3637a]/10 dark:border-gray-700 dark:bg-gray-800">
            <input
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              aria-live="polite"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e3637a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d8572a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
