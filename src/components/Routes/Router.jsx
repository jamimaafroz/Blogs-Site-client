import React from "react";
import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../pages/Home";
import login from "../pages/login";
import signup from "../pages/signup";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: login,
      },
      {
        path: "/signup",
        Component: signup,
      },
      {
        path: "/addBlog",
        element: (
          <PrivateRoutes>
            <AddBlog></AddBlog>
          </PrivateRoutes>
        ),
      },
      {
        path: "/Blogs",
        // loader: () => fetch("http://localhost:3000/allblogs"),
        Component: AllBlogs,
      },
    ],
  },
]);

export default router;
