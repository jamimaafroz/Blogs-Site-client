import React, { use } from "react";
import { AuthContext } from "../Context/AuthCOntext";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-start min-h-screen pt-4">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/Login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
