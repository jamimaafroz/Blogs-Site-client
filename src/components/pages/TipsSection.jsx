import React from "react";
import { motion } from "framer-motion";
import { FaPenNib, FaLightbulb, FaFeatherAlt } from "react-icons/fa";

const tips = [
  {
    icon: FaPenNib,
    title: "Write What You Love",
    desc: "Your passion brings authenticity. Start with topics that excite you most.",
  },
  {
    icon: FaLightbulb,
    title: "Be Clear & Concise",
    desc: "Keep your writing simple and focused. Readers value clarity over complexity.",
  },
  {
    icon: FaFeatherAlt,
    title: "Inspire Through Stories",
    desc: "Engage your audience by weaving stories from personal experiences.",
  },
];

const TipsSection = () => {
  return (
    <section
      className="relative overflow-hidden px-4 py-30 sm:px-6"
      aria-label="Writing tips"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-[#d8572a]/15 via-[#e3637a]/15 to-[#f7ac91]/10 blur-3xl" />

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
            Writing Tips
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Write with <span className="text-[#e3637a]">purpose.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
            Quick tips to elevate your content and grow your blogging journey.
          </p>
        </motion.div>

        {/* Tips: open columns, no cards */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {tips.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              className="group text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d8572a] to-[#e3637a] text-white shadow-lg shadow-[#e3637a]/20 transition-transform duration-300 group-hover:-translate-y-1">
                <Icon size={20} />
              </span>

              <h3 className="mt-5 font-heading text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {desc}
              </p>

              <div className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#d8572a] to-[#e3637a] transition-all duration-300 group-hover:w-20 md:mx-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
