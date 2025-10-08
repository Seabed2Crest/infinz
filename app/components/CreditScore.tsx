"use client";

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
      className="w-full bg-gradient-to-r from-teal-400 to-teal-700 rounded-3xl overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center lg:items-stretch">
        {/* Left Image */}
        <div
          className={`flex-1 relative w-full lg:w-1/2 mb-6 lg:mb-0 transform transition-all duration-1000 ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <Image
            src="/credit-score.png" // replace with your banner image
            alt="Credit Score App"
            width={600}
            height={400}
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>

        {/* Right Text */}
        <div
          className={`flex-1 text-white flex flex-col justify-center lg:pl-12 transform transition-all duration-1000 ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Check Your Emi Now
          </h2>
          {/* <p className="text-lg sm:text-xl text-gray-200 mb-6">
            Unlock your credit potential with Credit Assist and get insights on how to improve your credit score.
          </p> */}
          <button
            onClick={() => router.push("/calculator")}
            className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Try It Now
          </button>
        </div>
      </div>
    </section>
  );
}
