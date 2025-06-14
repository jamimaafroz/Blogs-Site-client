import React, { useEffect, useState } from "react";
import axios from "axios";

const TopBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/allBlogs").then((res) => {
      const blogsWithWordCount = res.data.map((blog) => {
        const wordCount = blog.longDesc
          ? blog.longDesc.trim().split(/\s+/).length
          : 0;
        return { ...blog, wordCount };
      });

      const topBlogs = blogsWithWordCount
        .sort((a, b) => b.wordCount - a.wordCount)
        .slice(0, 10);

      setBlogs(topBlogs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl  text-[#780116] font-bold mb-4 text-center">
        📈 Top 10 Blogs by Word Count
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4  text-[#780116] py-2 border">#</th>
              <th className="px-4  text-[#780116] py-2 border">Title</th>
              <th className="px-4  text-[#780116] py-2 border">Category</th>
              <th className="px-4  text-[#780116] py-2 border">Author Email</th>
              <th className="px-4  text-[#780116] py-2 border">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{blog.title}</td>
                <td className="px-4 py-2 border">{blog.category}</td>
                <td className="px-4 py-2 border">{blog.email || "N/A"}</td>
                <td className="px-4 py-2 border">{blog.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBlogs;
