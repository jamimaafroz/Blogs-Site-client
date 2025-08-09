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
      className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-[#780116] mb-6 text-center">
        Trending Tags
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => onTagClick(tag)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#d8572a] text-white rounded-full shadow-md hover:bg-[#780116] transition"
            aria-label={`Filter blogs by ${tag}`}
          >
            #{tag}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingTags;
