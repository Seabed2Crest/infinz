"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { blogApi } from "@/app/services/data.service";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    blogApi.getBySlug(slug as string).then((res: any) => setBlog(res.data));
  }, [slug]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Head>
        <title>{blog.title} | My Website</title>
        <meta name="description" content={blog.content.slice(0, 150)} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/blogs" className="text-blue-600 hover:underline">
          ← Back to Blogs
        </Link>

        {/* Hero */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={blog.thumbnail || ""}
          className="w-full h-72 object-cover rounded-xl mt-6 shadow"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mt-8 leading-tight">
          {blog.title}
        </h1>

        {/* Category + Date */}
        <div className="flex items-center gap-4 text-gray-500 mt-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            {blog.category}
          </span>

          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-lg max-w-none mt-10"
        >
          {blog.content}
        </motion.div>
      </div>
    </>
  );
}
