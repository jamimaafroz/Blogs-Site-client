import React from "react";
import { motion } from "framer-motion";
import {
  FaPenFancy,
  FaGlobeAmericas,
  FaHandsHelping,
  FaLightbulb,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const aboutPoints = [
  {
    Icon: FaPenFancy,
    title: "Passionate Writing",
    desc: "We believe every story deserves to be told with passion and authenticity.",
  },
  {
    Icon: FaGlobeAmericas,
    title: "Global Reach",
    desc: "Connecting writers and readers across cultures and continents.",
  },
  {
    Icon: FaHandsHelping,
    title: "Supportive Community",
    desc: "A safe space where ideas flourish and support is always available.",
  },
  {
    Icon: FaLightbulb,
    title: "Innovative Features",
    desc: "Cutting-edge tools to enhance your writing and reading experience.",
  },
  {
    Icon: FaUsers,
    title: "Collaborative Network",
    desc: "Engage with fellow creators and expand your creative horizons.",
  },
  {
    Icon: FaShieldAlt,
    title: "Secure & Reliable",
    desc: "Your data and content are protected with industry-standard security.",
  },
];

const AboutSection = () => {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6"
      aria-label="About us"
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

      <div className="pointer-events-none absolute bottom-0 left-1/2 ..." />

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
            About Us
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            A home for <span className="text-[#e3637a]">every story.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-400">
            We are a platform committed to empowering writers and inspiring
            readers globally, with innovative tools, a collaborative community
            and a secure space for creative expression.
          </p>
        </motion.div>

        {/* Points */}
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {aboutPoints.map(({ Icon, title, desc }, index) => (
            <motion.div
              key={title}
              className="group border-t border-gray-200 pt-6 dark:border-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3637a]/10 text-[#e3637a] transition-all duration-300 group-hover:bg-[#e3637a] group-hover:text-white">
                <Icon size={18} />
              </span>

              <h3 className="mt-5 font-heading text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
