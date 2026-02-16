import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.1infinz.com";
const API_BASE = "https://backend.infinz.seabed2crest.com";

/* ----------------------------------------
   ✅ Auto-scan static routes
----------------------------------------- */
function getAppRoutes(dir: string, baseRoute = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    if (entry.name === "api") continue;
    if (entry.name === "components") continue;
    if (entry.name.startsWith("[")) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const hasPage =
        fs.existsSync(path.join(fullPath, "page.tsx")) ||
        fs.existsSync(path.join(fullPath, "page.jsx"));

      if (hasPage) {
        routes.push(`${baseRoute}/${entry.name}`);
      }

      routes = routes.concat(
        getAppRoutes(fullPath, `${baseRoute}/${entry.name}`)
      );
    }
  }

  return routes;
}

/* ----------------------------------------
   ✅ Fetch Blog URLs + lastModified
----------------------------------------- */
async function fetchBlogs(): Promise<MetadataRoute.Sitemap> {
    try {
      const res = await fetch(`${API_BASE}/api/v1/blogs`, {
        next: { revalidate: 3600 },
      });
  
      const json = await res.json();
  
      // ✅ Ensure array extraction
      const blogs = Array.isArray(json) ? json : json.data;
  
      if (!Array.isArray(blogs)) return [];
  
      return blogs.map((blog: any) => ({
        url: `${BASE_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
      }));
    } catch (err) {
      console.error("❌ Blog sitemap fetch failed:", err);
      return [];
    }
}
  

/* ----------------------------------------
   ✅ Fetch News URLs + lastModified
----------------------------------------- */
async function fetchNews(): Promise<MetadataRoute.Sitemap> {
    try {
      const res = await fetch(`${API_BASE}/api/v1/news`, {
        next: { revalidate: 3600 },
      });
  
      const json = await res.json();
  
      // ✅ Ensure array extraction
      const news = Array.isArray(json) ? json : json.data;
  
      if (!Array.isArray(news)) return [];
  
      return news.map((item: any) => ({
        url: `${BASE_URL}/news-and-press/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.publishedAt),
      }));
    } catch (err) {
      console.error("❌ News sitemap fetch failed:", err);
      return [];
    }
}


/* ----------------------------------------
   ✅ Final Sitemap Generator
----------------------------------------- */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");

  // ✅ Static pages
  const staticRoutes = getAppRoutes(appDir).map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  // Homepage
  staticRoutes.unshift({
    url: BASE_URL,
    lastModified: new Date(),
  });

  // ✅ Dynamic API pages
  const blogRoutes = await fetchBlogs();
  const newsRoutes = await fetchNews();

  // ✅ Merge everything
  return [...staticRoutes, ...blogRoutes, ...newsRoutes];
}