import React, { useEffect, useMemo, useState } from "react";
import { FaSortUp, FaSortDown, FaSort, FaChartBar } from "react-icons/fa";

import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const TopBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allBlogs")
      .then((res) => {
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
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorFn: (_, index) => index + 1,
        id: "index",
        cell: (info) => info.getValue(),
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Author Email",
        accessorKey: "email",
        cell: (info) => info.getValue() || "N/A",
      },
      {
        header: "Word Count",
        accessorKey: "wordCount",
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#780116] border-solid border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl text-[#780116] font-bold mb-4 text-center flex items-center justify-center gap-2">
        <FaChartBar className="text-3xl" />
        Top 10 Blogs by Word Count
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 border text-[#780116] text-sm font-semibold cursor-pointer select-none hover:bg-gray-200 transition duration-200 text-left"
                  >
                    <div className="inline-flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortUp className="text-xs text-[#780116]" />,
                        desc: <FaSortDown className="text-xs text-[#780116]" />,
                      }[header.column.getIsSorted()] ?? (
                        <FaSort className="text-xs text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-center hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBlogs;
