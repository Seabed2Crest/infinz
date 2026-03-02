import type { Metadata } from "next";
import NewsAndPressPage from "./NewsPressRelease";

export const metadata: Metadata = {
  title: "Latest News and Press Releases | Infinz",
  description:
    " Explore the latest news and press releases from Infinz. Get official company updates, media mentions, announcements, and insights into our financial solutions.",
  alternates: {
    canonical: "https://www.1infinz.com/news-and-press",
  },
};

export default function Page() {
  return <NewsAndPressPage />;
}