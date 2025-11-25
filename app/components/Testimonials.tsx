"use client";

import { useState, useEffect, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Unified ocean blue color scheme for all testimonials
const oceanBlueColors = {
  bg: "from-blue-50 to-blue-100",
  accent: "text-blue-600",
  border: "border-blue-200",
  shadow: "shadow-blue-500/20",
};

// Custom hook for intersection observer
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
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { isInView, elementRef };
}

function TestimonialCard({
  testimonial,
  index,
  isVisible,
}: {
  testimonial: any;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex-shrink-0 w-96 bg-white rounded-3xl p-8 shadow-xl border-2 ${
          oceanBlueColors.border
        }
        transform transition-all duration-700 relative overflow-hidden
        ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-95"
        }
        ${
          isHovered
            ? `hover:scale-105 hover:-translate-y-2 ${oceanBlueColors.shadow} shadow-2xl`
            : ""
        }
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div
        className={`
        absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
          oceanBlueColors.bg
        } 
        rounded-full blur-2xl opacity-50 transform transition-all duration-500
        ${isHovered ? "scale-150 opacity-70" : "scale-100"}
      `}
      />

      {/* Quote Icon */}
      <div
        className={`
        absolute top-6 right-6 w-12 h-12 ${oceanBlueColors.accent} opacity-20
        transform transition-all duration-300
        ${isHovered ? "scale-125 opacity-30" : ""}
      `}
      >
        <Quote className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s testimonial`}
              className={`w-16 h-16 rounded-full object-cover border-4 ${
                oceanBlueColors.border
              } transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
            />
            <div
              className={`
              absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white
              flex items-center justify-center transform transition-all duration-300
              ${isHovered ? "scale-125" : ""}
            `}
            >
              <Heart className="w-3 h-3 text-white fill-current" />
            </div>
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            <p className="text-gray-600 text-sm">{testimonial.role}</p>
            <p className="text-gray-500 text-xs">{testimonial.location}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-gray-600 text-sm font-medium">
            ({testimonial.rating}.0)
          </span>
        </div>

        {/* Savings */}
        <div className="mb-4">
          <div className={`text-3xl font-bold ${oceanBlueColors.accent} mb-1`}>
            {testimonial.savings}
          </div>
          <p className="text-gray-600 text-sm">
            Saved on {testimonial.loanType}
          </p>
        </div>

        {/* Testimonial */}
        <p className="text-gray-700 leading-relaxed italic mb-4">
          "{testimonial.testimonial}"
        </p>

        {/* Loan Type Badge */}
        <div
          className={`
          inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${
            oceanBlueColors.bg
          } 
          ${oceanBlueColors.accent} text-sm font-medium border ${
            oceanBlueColors.border
          }
          transform transition-all duration-300
          ${isHovered ? "scale-105" : ""}
        `}
        >
          {testimonial.loanType}
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className={`
        absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          oceanBlueColors.bg
        }
        transform transition-all duration-500 origin-left
        ${isVisible ? "scale-x-100" : "scale-x-0"}
      `}
        style={{ transitionDelay: `${index * 150 + 500}ms` }}
      />
    </div>
  );
}

interface TestimonialsProps {
  onOpenModal: () => void;
}

function Testimonials({ onOpenModal }: TestimonialsProps) {
  const { isInView, elementRef } = useInView(0.2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("https://backend.infinz.seabed2crest.com/api/v1/testimonials", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });

        const json = await res.json();
        console.log("API RESPONSE:", json);

        if (json.success && Array.isArray(json.data)) {
          // Transform API data to match component structure
          const transformedData = json.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            role: item.role,
            location: item.location,
            image: `https://infinz.s3.ap-south-1.amazonaws.com/${item.image}`, // Adjust path as needed
            savings: `₹${item.savedAmount.toLocaleString('en-IN')}`,
            rating: item.rating,
            testimonial: item.testimonial,
            loanType: getLoanTypeLabel(item.category),
          }));
          setTestimonials(transformedData);
        } else {
          console.warn("Unexpected API format:", json);
        }
      } catch (error) {
        console.error("FAILED TO FETCH TESTIMONIALS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Helper function to format loan type
  const getLoanTypeLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'home': 'Home Loan',
      'personal': 'Personal Loan',
      'business': 'Business Loan',
      'auto': 'Auto Loan',
      'education': 'Education Loan',
      'car': 'Car Loan',
    };
    return categoryMap[category.toLowerCase()] || `${category.charAt(0).toUpperCase() + category.slice(1)} Loan`;
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [testimonials]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Width of one card plus gap
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={elementRef} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Real people, real savings. See how Infinz helped our customers find
            better loan deals and achieve their financial goals
          </p>
        </div>

        {/* Navigation Buttons */}
        {!loading && testimonials.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`
                w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200
                flex items-center justify-center transition-all duration-300
                ${
                  canScrollLeft
                    ? "hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600"
                    : "text-gray-300 cursor-not-allowed"
                }
              `}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`
                w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200
                flex items-center justify-center transition-all duration-300
                ${
                  canScrollRight
                    ? "hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-600"
                    : "text-gray-300 cursor-not-allowed"
                }
              `}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Scrollable Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          {!loading && testimonials.length > 0 && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </>
          )}

          {/* Testimonials Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
            }}
          >
            {loading ? (
              <div className="w-full text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="w-full text-center py-20">
                <p className="text-gray-600 text-lg">No testimonials available</p>
              </div>
            ) : (
              testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  isVisible={isInView}
                />
              ))
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        {!loading && testimonials.length > 0 && (
          <div
            className={`mt-16 text-center transform transition-all duration-1000 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹500Cr+
                </div>
                <div className="text-gray-600">Total Disbursements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;