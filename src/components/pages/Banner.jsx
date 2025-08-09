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
    <div className="relative w-full h-[90vh] overflow-hidden font-sans">
      {/* Background Image with Gradient Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentIndex]}
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center max-w-2xl border border-white/20 shadow-lg"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Discover. Read. Share.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-4 mb-8">
            Dive into trending blogs, explore fresh perspectives, and share your
            own stories with the world.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition-all"
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
