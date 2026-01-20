"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { blogApi } from "@/app/services/data.service";
import CategoryBadge from "@/app/components/CategoryBadge";
import { formatBlogDate } from "@/app/utils/date.utils";

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
        <div className="w-full overflow-hidden rounded-xl mt-6 shadow bg-gray-900">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={blog.thumbnail || ""}
            alt={blog.thumbnailAlt || blog.title}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mt-8 leading-tight">
          {blog.title}
        </h1>

        {/* Category + Date */}
        <div className="flex items-center gap-4 text-gray-500 mt-3">
          <CategoryBadge category={blog.category} />

          <span>{formatBlogDate(blog.createdAt)}</span>
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