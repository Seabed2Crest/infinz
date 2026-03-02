import type { Metadata } from "next";
import BlogsPage from "./blogsClient";

export const metadata: Metadata = {
  title: "Smart Finance Advice & Guides | Infinz Blogs",
  description:
    "Read the latest loan & finance articles, guides, and tips on Infinz. Learn how to plan EMIs, manage debt, choose loans, and improve financial health.",
  alternates: {
    canonical: "https://www.1infinz.com/blogs",
  },
};

export default function Page() {
  return <BlogsPage />;
}