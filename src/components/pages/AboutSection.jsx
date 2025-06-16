import React from "react";
import { motion } from "framer-motion";
import { FaPenFancy, FaGlobeAmericas, FaHandsHelping } from "react-icons/fa";

const aboutPoints = [
  {
    icon: <FaPenFancy className="text-4xl text-[#d8572a]" />,
    title: "Passionate Writing",
    desc: "We believe every story deserves to be told with passion and authenticity.",
  },
  {
    icon: <FaGlobeAmericas className="text-4xl text-[#d8572a]" />,
    title: "Global Reach",
    desc: "Connecting writers and readers across cultures and continents.",
  },
  {
    icon: <FaHandsHelping className="text-4xl text-[#d8572a]" />,
    title: "Supportive Community",
    desc: "A safe space where ideas flourish and support is always available.",
  },
];

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#fff1e6] via-[#ffd6c2] to-[#fff7f0] py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-[#780116]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-gray-700 mb-12 text-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We’re a platform designed to empower writers and inspire readers
          worldwide. Join us and share your unique voice.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {aboutPoints.map((point, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-5">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#d8572a]">
                {point.title}
              </h3>
              <p className="text-gray-600">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated background circles */}
      <motion.div
        className="absolute top-12 left-12 w-28 h-28 bg-[#d8572a] opacity-10 rounded-full blur-3xl"
        animate={{ x: [0, 15, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      />
      <motion.div
        className="absolute bottom-12 right-12 w-40 h-40 bg-[#780116] opacity-10 rounded-full blur-4xl"
        animate={{ x: [0, -20, 15, 0], y: [0, 10, -15, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
      />
    </section>
  );
};

export default AboutSection;
