import React, { useContext } from "react";

import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

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
