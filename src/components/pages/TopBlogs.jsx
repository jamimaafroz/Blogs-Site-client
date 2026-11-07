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
  const maxWords = Math.max(...blogs.map((b) => b.wordCount), 1);

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
        id: "index",
        header: "#",
        enableSorting: false,
        cell: ({ row }) => {
          const rank = row.index + 1;
          const style =
            rank === 1
              ? "bg-yellow-400 text-yellow-900"
              : rank === 2
                ? "bg-gray-300 text-gray-800"
                : rank === 3
                  ? "bg-orange-400 text-orange-950"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
          return (
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${style}`}
            >
              {rank}
            </span>
          );
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        cell: (info) => (
          <span className="block max-w-xs truncate font-semibold text-gray-900 dark:text-white">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: (info) => (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e3637a]/10 text-[#c32f27] dark:text-[#e3637a]">
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Author Email",
        accessorKey: "email",
        cell: (info) => (
          <span className="text-gray-500 dark:text-gray-400">
            {info.getValue() || "N/A"}
          </span>
        ),
      },
      {
        header: "Word Count",
        accessorKey: "wordCount",
        cell: (info) => (
          <div className="flex items-center gap-3 min-w-[140px]">
            <span className="w-12 font-bold text-[#e3637a]">
              {info.getValue()}
            </span>
            <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d8572a] to-[#e3637a]"
                style={{ width: `${(info.getValue() / maxWords) * 100}%` }}
              />
            </div>
          </div>
        ),
      },
    ],
    [maxWords],
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
        <div className="w-12 h-12 border-4 border-[#e3637a]/20 border-t-[#e3637a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="p-3 rounded-xl bg-[#e3637a]/10 text-[#e3637a]">
            <FaChartBar className="text-2xl" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#780116] dark:text-[#e3637a]">
            Top 10 Blogs by Word Count
          </h2>
        </div>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Our longest reads. Click a column header to sort.
        </p>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl overflow-hidden backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-left text-xs uppercase tracking-wider font-bold text-gray-600 dark:text-gray-300 select-none transition-colors ${
                          canSort ? "cursor-pointer hover:text-[#e3637a]" : ""
                        }`}
                      >
                        <div className="inline-flex items-center gap-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort &&
                            ({
                              asc: <FaSortUp className="text-[#e3637a]" />,
                              desc: <FaSortDown className="text-[#e3637a]" />,
                            }[header.column.getIsSorted()] ?? (
                              <FaSort className="text-gray-400" />
                            ))}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#e3637a]/5 dark:hover:bg-[#e3637a]/10 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
