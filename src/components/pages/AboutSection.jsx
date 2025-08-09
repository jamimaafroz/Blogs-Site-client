import React, { useState, useRef, useEffect } from "react";
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
  {
    icon: <FaLightbulb className="text-4xl text-[#d8572a]" />,
    title: "Innovative Features",
    desc: "Cutting-edge tools to enhance your writing and reading experience.",
  },
  {
    icon: <FaUsers className="text-4xl text-[#d8572a]" />,
    title: "Collaborative Network",
    desc: "Engage with fellow creators and expand your creative horizons.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-[#d8572a]" />,
    title: "Secure & Reliable",
    desc: "Your data and content are protected with industry-standard security.",
  },
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Card width + margin (w-72 = 18rem = 288px + 32px gap)
  const CARD_WIDTH = 288 + 32; // px

  // Scroll to specific card on dot click
  const scrollToIndex = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * CARD_WIDTH,
        behavior: "smooth",
      });
    }
  };

  // Update active dot on scroll
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / CARD_WIDTH);
      setActiveIndex(index);
    }
  };

  // Add throttling/debounce if needed for performance in large scale

  return (
    <section className="relative bg-gradient-to-r from-[#fff1e6] via-[#ffd6c2] to-[#fff7f0] py-20 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-10 text-[#780116]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-gray-700 mb-16 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We are a dynamic platform committed to empowering writers and
          inspiring readers globally. Our mission is to provide innovative
          tools, foster community collaboration, and ensure a secure environment
          for creative expression. Join us to elevate your storytelling journey.
        </motion.p>

        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex space-x-8 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {aboutPoints.map((point, idx) => (
            <motion.div
              key={idx}
              className="snap-start flex-shrink-0 w-72 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-400 cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#d8572a] tracking-wide">
                {point.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-4">
          {aboutPoints.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                idx === activeIndex
                  ? "bg-[#d8572a]"
                  : "bg-[#d8572a]/40 hover:bg-[#d8572a]/70"
              }`}
              aria-label={`Scroll to card ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Animated Background Circles */}
      <motion.div
        className="absolute top-12 left-12 w-32 h-32 bg-[#d8572a] opacity-10 rounded-full blur-3xl"
        animate={{ x: [0, 15, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
      />
      <motion.div
        className="absolute bottom-12 right-12 w-48 h-48 bg-[#780116] opacity-10 rounded-full blur-4xl"
        animate={{ x: [0, -20, 15, 0], y: [0, 10, -15, 0] }}
        transition={{ repeat: Infinity, duration: 24 }}
      />
    </section>
  );
};

export default AboutSection;
