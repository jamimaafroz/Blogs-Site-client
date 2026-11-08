import React from "react";
import { motion } from "framer-motion";

const tags = [
  "Technology",
  "Travel",
  "Education",
  "Health",
  "Lifestyle",
  "Programming",
  "Food",
  "Fitness",
];

const TrendingTags = ({ onTagClick }) => {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-label="Trending tags"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e3637a]">
        Trending
      </span>

      <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Explore by <span className="text-[#e3637a]">topic.</span>
      </h2>

      <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-400">
        Pick a tag to filter the latest blogs.
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            aria-label={`Filter blogs by ${tag}`}
            className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e3637a] hover:bg-[#e3637a]/10 hover:text-[#e3637a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e3637a]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-[#e3637a] dark:hover:text-[#e3637a]"
          >
            <span className="text-[#e3637a]">#</span>
            {tag}
          </button>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingTags;
