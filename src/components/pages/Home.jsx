import React from "react";
import Banner from "./Banner";
import RecentBlogs from "./RecentBlogs";
import Newsletter from "./Newsletter";
import TipsSection from "./TipsSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Newsletter></Newsletter>
      <AboutSection></AboutSection>
      <RecentBlogs></RecentBlogs>
      <TipsSection></TipsSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
