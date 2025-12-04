import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogCard({ blog, index }: any) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="block cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-xl shadow hover:shadow-xl border group overflow-hidden"
      >
        {/* Thumbnail */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={blog.thumbnail || "https://via.placeholder.com/600x400"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full mb-3">
            {blog.category}
          </span>

          <h2 className="text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-600 transition">
            {blog.title}
          </h2>

          <p className="text-gray-600 line-clamp-3 text-sm mb-4">
            {blog.content.slice(0, 120)}...
          </p>

          <span className="text-blue-600 font-medium hover:underline">
            Read more →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
