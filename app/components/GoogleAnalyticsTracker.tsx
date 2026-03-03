"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (typeof window !== "undefined") {
      window.gtag?.("config", "G-B5039X5VSP", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}