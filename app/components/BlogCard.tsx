import Link from "next/link";
import { motion } from "framer-motion";
import CategoryBadge from "./CategoryBadge";

export default function BlogCard({ blog, index }: any) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="block cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-xl shadow hover:shadow-xl border group overflow-hidden h-full flex flex-col"
      >
        {/* Thumbnail */}
        <div className="h-56 w-full overflow-hidden bg-gray-50">
          <img
            src={blog.thumbnail || "https://via.placeholder.com/600x400"}
            alt={blog.thumbnailAlt || blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <CategoryBadge category={blog.category} />

          <h2 className="text-xl font-bold line-clamp-2 mb-2 group-hover:text-blue-600 transition">
            {blog.title}
          </h2>

          <p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-1">
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