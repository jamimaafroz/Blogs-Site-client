import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 max-w-7xl mx-auto">
      {/* Simple Image */}
      <div>
        <img
          src="https://i.ibb.co/qF4GtnTp/alert-6491216-1280.png" // Adjusted to work properly
          alt="Error Image"
          className="w-64 mb-6 rounded-lg"
        />
      </div>

      <div className="text-center text-gray-800">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          Sorry, the page you're looking for does not exist or has been moved.
        </p>

        {/* Button to go home */}
        <Link
          to="/"
          className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-6 rounded-md text-lg font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
