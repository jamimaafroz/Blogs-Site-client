import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Mainlayout = () => {
  return (
    <div className="max-w-full mx-auto min-h-screen bg-bg font-heading text-fg">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Mainlayout;
