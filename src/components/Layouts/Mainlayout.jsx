import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const Mainlayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
