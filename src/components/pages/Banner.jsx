import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { FiArrowRight } from "react-icons/fi";

const images = [
  "https://i.ibb.co/FkdMGG1P/best-travel-background.jpg",
  "https://i.ibb.co/kPVy2vG/adult-blur-camera-368893.jpg",
  "https://i.ibb.co/4R7JKhgZ/webpc-passthru.webp",
];

const SLIDE_MS = 6000;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const BannerWithSlider = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Restarts whenever the slide changes, so clicking an indicator resets the timer
  useEffect(() => {
    const t = setTimeout(
      () => setCurrent((prev) => (prev + 1) % images.length),
      SLIDE_MS,
    );
    return () => clearTimeout(t);
  }, [current]);

  return (
    <section className="relative -mt-[73px] h-screen min-h-[560px] w-full overflow-hidden bg-black">
      {/* Slides: crossfade + slow zoom */}
      <AnimatePresence>
        <motion.img
          key={images[current]}
          src={images[current]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 7, ease: "easeOut" },
          }}
        />
      </AnimatePresence>

      {/* Overlays: darker on the text side, plus a fade behind the navbar */}
      <div className="absolute inset-0 bg-black/50 md:bg-transparent md:bg-gradient-to-l md:from-black/80 md:via-black/45 md:to-black/5" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Content (right side) */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center justify-center px-6 md:justify-end md:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-xl flex-col items-center text-center md:items-end md:text-right"
        >
          <motion.span
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#f7ac91]"
          >
            Welcome to Web-Blog
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Discover.
            <br />
            Read.
            <br />
            <span className="text-[#e3637a]">Share.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base text-gray-200 sm:text-lg"
          >
            Dive into trending blogs, explore fresh perspectives, and share your
            own stories with the world.
          </motion.p>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Blogs")}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#d8572a] to-[#e3637a] px-8 py-3.5 font-semibold text-white shadow-xl shadow-[#e3637a]/30 hover:brightness-110"
          >
            Explore
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Slide indicators with progress fill */}
      <div className="absolute inset-x-0 bottom-10 z-20 mx-auto flex max-w-7xl justify-center gap-2 px-6 md:justify-end md:px-12">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1 w-10 overflow-hidden rounded-full bg-white/30 sm:w-14"
          >
            {i === current && (
              <motion.span
                key={current}
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BannerWithSlider;
