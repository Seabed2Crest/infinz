"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/app/components/BlogCard";
import { motion } from "framer-motion";
import Head from "next/head";
import { blogApi } from "../services/data.service";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogApi.getAll().then((res: any) => setBlogs(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Blogs | My Website</title>
        <meta name="description" content="Read latest blogs and articles." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Latest <span className="text-blue-600">Blogs</span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogs.map((blog: any, i: number) => (
            <BlogCard key={blog._id} blog={blog} index={i} />
          ))}
        </motion.div>
      </div>
    </>
  );
}
