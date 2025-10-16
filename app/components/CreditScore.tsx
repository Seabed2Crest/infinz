"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Intersection observer hook
function useInView(threshold = 0.3) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { isInView, elementRef };
}

interface CreditBannerProps {
  onOpenModal?: () => void;
}

export default function CreditBanner({ onOpenModal }: CreditBannerProps) {
  const { isInView, elementRef } = useInView(0.2);
  const router = useRouter();

  return (
    <section
      ref={elementRef}
      className="w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12  flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Image */}
        <div
          className={`flex-1 relative flex justify-center transform transition-all duration-1000 ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <Image
            src="/mobilepic.png"
            alt="Credit Score App"
            width={200}
            height={200}
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>

        {/* Right Text */}
        <div
          className={`flex-1 text-white flex flex-col justify-center transform transition-all duration-1000 ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Check Your EMI Now
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 mb-6 max-w-md">
            Quickly calculate your EMI and plan your payments with ease — smart,
            simple, and accurate.
          </p>
          <button
            onClick={() => router.push("/calculator")}
            className="bg-white text-teal-800 font-semibold px-6 py-3 rounded-lg w-fit hover:bg-gray-100 transition"
          >
            Try It Now
          </button>
        </div>
      </div>
    </section>
  );
}
