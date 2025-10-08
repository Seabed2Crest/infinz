"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoanCardsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handlePersonalLoanClick = () => {
    router.push("/personal-loan");
  };

  const handleBusinessLoanClick = () => {
    router.push("/business-loan");
  };

  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 py-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the right financial support for your needs — whether it’s for
            personal growth or business expansion, we’ve got you covered.
          </p>
        </div>

        {/* Loan Cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Personal Loan Card */}
          <div
            onClick={handlePersonalLoanClick}
            onMouseEnter={() => setHoveredCard("personal")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-transparent hover:border-teal-300/60 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 perspective-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Glow border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-700"></div>

            <div className="relative z-10 p-10">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {/* Credit Card Outline */}
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    ry="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

              {/* Title & Desc */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                  Personal Loan
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Flexible personal loans for life’s milestones and unexpected
                  needs — quick, simple, and secure.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg group-hover:scale-105 transition-all duration-500 shadow-lg">
                  Explore Personal Loan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Business Loan Card */}
          <div
            onClick={handleBusinessLoanClick}
            onMouseEnter={() => setHoveredCard("business")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-transparent hover:border-teal-300/60 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 perspective-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Glow border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-700"></div>

            <div className="relative z-10 p-10">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {/* Bar chart */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 20v-6m4 6v-10m4 10v-14m4 14v-8m4 8V4"
                  />
                  {/* Growth arrow */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l3-3 3 3m-3-3v12"
                  />
                </svg>
              </div>

              {/* Title & Desc */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                  Business Loan
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Smart funding solutions designed to power your business growth
                  and expansion with ease.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg group-hover:scale-105 transition-all duration-500 shadow-lg">
                  Explore Business Loan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
