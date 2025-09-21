'use client';

import { useState, useEffect, useRef } from "react";
import { Building2, Star, Shield, Award } from "lucide-react";

// Dummy lender data with placeholder information
const lenders = [
  {
    id: 1,
    name: "HDFC Bank",
    logo: "🏦",
    rating: 4.8,
    loans: "50K+",
    color: "blue"
  },
  {
    id: 2,
    name: "ICICI Bank",
    logo: "🏛️",
    rating: 4.7,
    loans: "45K+",
    color: "orange"
  },
  {
    id: 3,
    name: "Axis Bank",
    logo: "🏢",
    rating: 4.6,
    loans: "40K+",
    color: "red"
  },
  {
    id: 4,
    name: "Bajaj Finserv",
    logo: "💳",
    rating: 4.9,
    loans: "60K+",
    color: "green"
  },
  {
    id: 5,
    name: "Kotak Bank",
    logo: "🏪",
    rating: 4.5,
    loans: "35K+",
    color: "purple"
  },
  {
    id: 6,
    name: "SBI Bank",
    logo: "🏦",
    rating: 4.4,
    loans: "80K+",
    color: "blue"
  },
  {
    id: 7,
    name: "YES Bank",
    logo: "🏛️",
    rating: 4.3,
    loans: "25K+",
    color: "teal"
  },
  {
    id: 8,
    name: "IndusInd Bank",
    logo: "🏢",
    rating: 4.6,
    loans: "30K+",
    color: "indigo"
  },
  {
    id: 9,
    name: "IDFC First",
    logo: "💼",
    rating: 4.7,
    loans: "28K+",
    color: "pink"
  },
  {
    id: 10,
    name: "Tata Capital",
    logo: "🏭",
    rating: 4.5,
    loans: "32K+",
    color: "yellow"
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  teal: "from-teal-500 to-teal-600",
  indigo: "from-indigo-500 to-indigo-600",
  pink: "from-pink-500 to-pink-600",
  yellow: "from-yellow-500 to-yellow-600"
};

function LenderCard({ lender, index }: { lender: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = colorClasses[lender.color as keyof typeof colorClasses];

  return (
    <div
      className={`
        flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-xl border border-gray-100
        transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
        hover:shadow-2xl cursor-pointer relative overflow-hidden
        ${isHovered ? 'shadow-2xl' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Gradient */}
      <div className={`
        absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClass} 
        rounded-full blur-2xl opacity-20 transform transition-all duration-500
        ${isHovered ? 'scale-150 opacity-30' : 'scale-100'}
      `} />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`
            w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} 
            flex items-center justify-center text-2xl shadow-lg
            transform transition-all duration-300
            ${isHovered ? 'scale-110 rotate-6' : ''}
          `}>
            {lender.logo}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{lender.name}</h3>
            <p className="text-gray-500 text-sm">Trusted Partner</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-700">{lender.rating}</span>
            <span className="text-gray-500 text-sm">Rating</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900">{lender.loans}</div>
            <div className="text-gray-500 text-sm">Loans Approved</div>
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            <Shield className="h-3 w-3" />
            Secure
          </div>
          <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            <Award className="h-3 w-3" />
            Verified
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
        )}
      </div>

      {/* Bottom Accent */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass}
        transform transition-all duration-300 origin-left
        ${isHovered ? 'scale-x-100' : 'scale-x-0'}
      `} />
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame
    const cardWidth = 320; // Width of each card including margin
    const totalWidth = lenders.length * cardWidth;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through all original cards
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const scrollAnimation = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(scrollAnimation);
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(scrollAnimation);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Duplicate lenders for seamless infinite scroll
  const duplicatedLenders = [...lenders, ...lenders, ...lenders];

  return (
    <section id="our-lenders" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
            headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Our <span className="text-teal-600">Trusted</span> Lenders
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
            headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
          >
            Partner with India's leading financial institutions for the best loan rates and seamless approval process
          </p>
        </div>

        {/* Auto-scrolling Lenders */}
        <div className="relative">
          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{ 
              scrollBehavior: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {duplicatedLenders.map((lender, index) => (
              <LenderCard 
                key={`${lender.id}-${Math.floor(index / lenders.length)}`} 
                lender={lender} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 text-center transform transition-all duration-1000 ${
          headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-600">Partner Lenders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5M+</div>
              <div className="text-gray-600">Loans Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹500Cr+</div>
              <div className="text-gray-600">Amount Disbursed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 transform transition-all duration-1000 ${
          headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <span>RBI Approved Partners</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>100% Secure Process</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span>Industry Leading Rates</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurLenders;
