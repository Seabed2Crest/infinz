"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { newsApi, NewsItem } from "@/app/services/data.service";

export default function NewsDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (!id) return;
    newsApi.getById(id as string).then((res: any) => {
      setItem(res.data || null);
    });
  }, [id]);

  if (!item) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const pageTitle =
    item.type === "press-release"
      ? `${item.title} | Press Release`
      : `${item.title} | News`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={item.summary} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/news-and-press"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to News & Press Releases
        </Link>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-72 object-cover rounded-xl mt-6 shadow"
        />

        <div className="mt-6 flex items-center gap-3 text-gray-500 text-sm">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
            {item.type === "press-release" ? "Press Release" : "News"}
          </span>
          <span>{new Date(item.publishedAt).toDateString()}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
          {item.title}
        </h1>

        <p className="mt-4 text-gray-600">{item.summary}</p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-lg max-w-none mt-8"
        >
          {item.content}
        </motion.div>
      </div>
    </>
  );
}



