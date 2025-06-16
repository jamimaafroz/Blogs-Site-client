import React from "react";
import { motion } from "framer-motion";
import { FaPenNib, FaLightbulb, FaFeatherAlt, FaMagic } from "react-icons/fa";

const tips = [
  {
    icon: <FaPenNib className="text-3xl text-[#d8572a]" />,
    title: "Write What You Love",
    desc: "Your passion brings authenticity. Start with topics that excite you most.",
  },
  {
    icon: <FaLightbulb className="text-3xl text-[#d8572a]" />,
    title: "Be Clear & Concise",
    desc: "Keep your writing simple and focused. Readers value clarity over complexity.",
  },
  {
    icon: <FaFeatherAlt className="text-3xl text-[#d8572a]" />,
    title: "Inspire Through Stories",
    desc: "Engage your audience by weaving stories from personal experiences.",
  },
];

const TipsSection = () => {
  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-br from-[#fff7f0] via-[#ffe1d6] to-[#ffffff]">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 text-[#780116] flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FaMagic className="text-[#d8572a]" />
          Writing Tips & Inspiration
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Boost your blogging journey with these quick and effective writing
          tips designed to elevate your content.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#d8572a]">
                {tip.title}
              </h3>
              <p className="text-gray-600">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-[#d8572a] opacity-10 rounded-full blur-2xl"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-[#780116] opacity-10 rounded-full blur-3xl"
        animate={{ x: [0, -60, 40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />
    </div>
  );
};

export default TipsSection;
