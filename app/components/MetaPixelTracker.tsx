"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MetaPixelTracker() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return; // skip first render
    }

    if ((window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
