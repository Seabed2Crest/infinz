"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.gtag?.("config", "G-B5039X5VSP", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}