import React, { useState } from "react";
import Banner from "./Banner";
import TrendingTags from "./TrendingTags";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "./Newsletter";
import TipsSection from "./TipsSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import { useEffect } from "react";
import { useLocation } from "react-router";

const Home = () => {
  const [filterTag, setFilterTag] = useState("");

  const handleTagClick = (tag) => {
    setFilterTag(tag);
  };

  // inside your Home component, above return:
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
  }, [hash, key]);

  return (
    <div className="min-h-screen space-y-8">
      <Banner />
      <Newsletter />
      <div id="trending" className="scroll-mt-20">
        <TrendingTags onTagClick={handleTagClick} />
      </div>
      <div id="recent" className="scroll-mt-20">
        <RecentBlogs filterCategory={filterTag} />
      </div>
      <div id="tips" className="scroll-mt-20">
        <TipsSection />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div>
      <div id="contact" className="scroll-mt-20">
        <ContactSection />
      </div>
    </div>
  );
};

export default Home;
