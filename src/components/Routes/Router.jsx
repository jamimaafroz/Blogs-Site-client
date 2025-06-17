import React from "react";
import { createBrowserRouter } from "react-router";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../pages/Home";
import login from "../pages/login";
import signup from "../pages/signup";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import PrivateRoutes from "./PrivateRoutes";
import ViewDetails from "../pages/ViewDetails";
import UpdateBlog from "../pages/UpdateBlog";
import TopBlogs from "../pages/TopBlogs";
import Wishlist from "../pages/Wishlist";
import ErrorPage from "../pages/ErrorPage";

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
        // loader: () => fetch("https://blogs-server-indol.vercel.app/allblogs"),
        Component: AllBlogs,
      },
      {
        path: "/viewDetails/:id",
        Component: ViewDetails,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateBlog></UpdateBlog>
          </PrivateRoutes>
        ),
      },
      {
        path: "/Features",
        Component: TopBlogs,
      },
      {
        path: "/wishList",
        element: (
          <PrivateRoutes>
            <Wishlist></Wishlist>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
