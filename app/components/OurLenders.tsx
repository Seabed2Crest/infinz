"use client";

import { useState, useEffect, useRef } from "react";

// Dummy lender data with proper logo paths
const lenders = [
  { id: 1, name: "HDFC Bank", logo: "/logos/HDFCBank.jpg", color: "blue" },
  { id: 2, name: "ICICI Bank", logo: "/logos/ICICBank.jpg", color: "orange" },
  { id: 3, name: "Axis Bank", logo: "/logos/Axis.png", color: "red" },
  { id: 4, name: "Bajaj Finserv", logo: "/logos/Bajaj.png", color: "green" },
  { id: 5, name: "Kotak Bank", logo: "/logos/Kotak.png", color: "purple" },
  { id: 6, name: "SBI Bank", logo: "/logos/SBI.webp", color: "blue" },
  { id: 7, name: "YES Bank", logo: "/logos/YES.png", color: "blue" },
  {
    id: 8,
    name: "IndusInd Bank",
    logo: "/logos/IndusInd.png",
    color: "indigo",
  },
  { id: 9, name: "IDFC First", logo: "/logos/IDFC.png", color: "pink" },
  { id: 10, name: "Tata Capital", logo: "/logos/Tata.png", color: "yellow" },
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
};

function LenderCard({ lender, index }: { lender: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = colorClasses[lender.color as keyof typeof colorClasses];
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`
        flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-xl border border-gray-100
        transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
        hover:shadow-2xl cursor-pointer relative overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Gradient */}
      <div
        className={`
          absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClass} 
          rounded-full blur-2xl opacity-20 transform transition-all duration-500
          ${isHovered ? "scale-150 opacity-30" : "scale-100"}
        `}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {/* Removed colored background behind logo */}
          <div
            className={`
              w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-lg
              transform transition-all duration-300
              ${isHovered ? "scale-110 rotate-6" : ""}
            `}
          >
            <img
              src={!imgError ? lender.logo : "/logos/default.png"}
              alt={`${lender.name} logo`}
              onError={() => setImgError(true)}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{lender.name}</h3>
            <p className="text-gray-500 text-sm">Trusted Partner</p>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
        )}
      </div>

      {/* Bottom Accent */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass}
          transform transition-all duration-300 origin-left
          ${isHovered ? "scale-x-100" : "scale-x-0"}
        `}
      />
    </div>
  );
}

interface OurLendersProps {
  onOpenModal: () => void;
}

function OurLenders({ onOpenModal }: OurLendersProps) {
  const [headerInView, setHeaderInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Header animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHeaderInView(true),
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect (slower)
useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 2; // ⬅️ reduced speed (was 1)
    const cardWidth = 320;
    const totalWidth = lenders.length * cardWidth;
    let animation: number;
    let isScrolling = false;

    const scroll = () => {
      if (!isScrolling) return;
      scrollPosition += scrollSpeed;
      if (scrollPosition >= totalWidth) scrollPosition = 0;
      if (scrollContainer) scrollContainer.scrollLeft = scrollPosition;
      animation = requestAnimationFrame(scroll);
    };

    const startScrolling = () => {
      if (!isScrolling) {
        isScrolling = true;
        animation = requestAnimationFrame(scroll);
      }
    };

    const stopScrolling = () => {
      isScrolling = false;
      if (animation) cancelAnimationFrame(animation);
    };

    startScrolling();

    scrollContainer.addEventListener("mouseenter", stopScrolling);
    scrollContainer.addEventListener("mouseleave", startScrolling);

    return () => {
      stopScrolling();
      scrollContainer.removeEventListener("mouseenter", stopScrolling);
      scrollContainer.removeEventListener("mouseleave", startScrolling);
    };
  }, []);

  const duplicatedLenders = [...lenders, ...lenders, ...lenders];

  return (
    <section
      id="our-lenders"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Our <span className="text-blue-600">Trusted</span> Lenders
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Partner with India's leading financial institutions for the best
            loan rates and seamless approval process
          </p>
        </div>

        {/* Auto-scrolling Lenders */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{
              scrollBehavior: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {duplicatedLenders.map((lender, index) => (
              <LenderCard
                key={`${lender.id}-${index}`}
                lender={lender}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurLenders;
