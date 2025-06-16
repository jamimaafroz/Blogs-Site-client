import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const images = [
  "https://i.ibb.co/FkdMGG1P/best-travel-background.jpg",
  "https://i.ibb.co/kPVy2vG/adult-blur-camera-368893.jpg",
  "https://i.ibb.co/4R7JKhgZ/webpc-passthru.webp",
];

const BannerWithSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slide Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="Banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow">
            Discover. Read. Share.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            Explore trending blogs and write your own story.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg"
            onClick={() => navigate("/Blogs")}
          >
            Browse Blogs
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerWithSlider;
