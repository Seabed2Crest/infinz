"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { newsApi, NewsItem } from "@/app/services/data.service";

export default function NewsAndPressPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<"all" | "news" | "press-release">("all");

  useEffect(() => {
    const type = filter === "all" ? undefined : filter;
    newsApi.getAll(type as any).then((res: any) => {
      setItems(res.data || []);
    });
  }, [filter]);

  return (
    <>
      <Head>
        <title>News & Press Releases | Infinz</title>
        <meta
          name="description"
          content="Stay updated with the latest news and press releases from Infinz."
        />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h1 className="text-4xl font-bold">
            News &{" "}
            <span className="text-blue-600">Press Releases</span>
          </h1>

          <div className="flex gap-2">
            {[
              { label: "All", value: "all" },
              { label: "News", value: "news" },
              { label: "Press Releases", value: "press-release" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setFilter(opt.value as "all" | "news" | "press-release")
                }
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  filter === opt.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">
            No news or press releases available right now.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {items.map((item, index) => (
              <Link
                key={item._id}
                href={`/news-and-press/${item._id}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow hover:shadow-xl border overflow-hidden group h-full flex flex-col"
                >
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {item.type === "press-release"
                          ? "Press Release"
                          : "News"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {item.summary}
                    </p>

                    <span className="mt-auto text-blue-600 text-sm font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}



