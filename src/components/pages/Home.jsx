import React, { useState } from "react";
import Banner from "./Banner";
import TrendingTags from "./TrendingTags";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "./Newsletter";
import TipsSection from "./TipsSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

const Home = () => {
  const [filterTag, setFilterTag] = useState("");

  const handleTagClick = (tag) => {
    setFilterTag(tag);
  };

  return (
    <div>
      <Banner />
      <Newsletter />
      <TrendingTags onTagClick={handleTagClick} />
      <RecentBlogs filterCategory={filterTag} />
      <TipsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;
