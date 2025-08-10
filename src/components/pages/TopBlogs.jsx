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
      .get("https://blogs-server-indol.vercel.app/allBlogs")
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
        cell: (info) => (
          <span className="font-semibold text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => (
          <span className="text-gray-800 font-medium">{info.getValue()}</span>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        header: "Author Email",
        accessorKey: "email",
        cell: (info) => (
          <span className="text-gray-500">{info.getValue() || "N/A"}</span>
        ),
      },
      {
        header: "Word Count",
        accessorKey: "wordCount",
        cell: (info) => (
          <span className="font-semibold text-[#780116]">
            {info.getValue()}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#ffd6c2] border-t-[#780116] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaChartBar className="text-3xl text-[#780116]" />
        <h2 className="text-3xl font-bold text-[#780116] text-center">
          Top 10 Blogs by Word Count
        </h2>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-6 py-4 border-b text-[#780116] font-semibold cursor-pointer select-none hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="inline-flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <FaSortUp className="text-xs text-[#780116]" />,
                          desc: (
                            <FaSortDown className="text-xs text-[#780116]" />
                          ),
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
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-3 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopBlogs;
