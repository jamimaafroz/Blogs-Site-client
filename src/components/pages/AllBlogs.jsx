import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AllBlogs = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/allblogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return <div></div>;
};

export default AllBlogs;
