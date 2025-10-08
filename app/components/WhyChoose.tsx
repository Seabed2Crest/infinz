'use client';

import { useState, useEffect, useRef } from "react";
import { Building2, Clock, Zap, Percent, Calendar } from "lucide-react";

// Custom hook for intersection observer - triggers only once
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
          // Disconnect observer after first trigger
          observer.disconnect();
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

const milestones = [
  {
    id: 1,
    icon: Building2,
    title: "Multiple Offers from Top NBFCs & Banks",
    description: "Compare loan offers from over 50+ leading NBFCs and banks, including HDFC, ICICI, Bajaj Finserv, and more.",
    color: "blue",
    delay: 0
  },
  {
    id: 2,
    icon: Clock,
    title: "Faster Approval",
    description: "Get instant pre-approval within 2 minutes with our streamlined digital assessment.",
    color: "green",
    delay: 200
  },
  {
    id: 3,
    icon: Zap,
    title: "Quick Disbursal",
    description: "Receive funds within 24 hours after final approval. Our direct partnerships with lenders ensure seamless processing.",
    color: "yellow",
    delay: 400
  },
  {
    id: 4,
    icon: Percent,
    title: "Lower Interest Rates",
    description: "Save thousands with our competitive interest rates starting from 10.49% per annum.",
    color: "red",
    delay: 600
  },
  {
    id: 5,
    icon: Calendar,
    title: "Flexible Repayment",
    description: "Choose repayment tenures from 6 months to 7 years based on your comfort and cash flow.",
    color: "purple",
    delay: 800
  }
];

const colorClasses = {
  blue: {
    bg: "from-blue-100 to-blue-200",
    icon: "text-blue-600",
    border: "border-blue-300",
    glow: "shadow-blue-500/25",
    accent: "bg-blue-500"
  },
  green: {
    bg: "from-green-100 to-green-200",
    icon: "text-green-600",
    border: "border-green-300",
    glow: "shadow-green-500/25",
    accent: "bg-green-500"
  },
  yellow: {
    bg: "from-yellow-100 to-yellow-200",
    icon: "text-yellow-600",
    border: "border-yellow-300",
    glow: "shadow-yellow-500/25",
    accent: "bg-yellow-500"
  },
  red: {
    bg: "from-red-100 to-red-200",
    icon: "text-red-600",
    border: "border-red-300",
    glow: "shadow-red-500/25",
    accent: "bg-red-500"
  },
  purple: {
    bg: "from-purple-100 to-purple-200",
    icon: "text-purple-600",
    border: "border-purple-300",
    glow: "shadow-purple-500/25",
    accent: "bg-purple-500"
  }
};

interface WhyChooseProps {
  onOpenModal: () => void;
}

function WhyChoose({ onOpenModal }: WhyChooseProps) {
  const { isInView, elementRef } = useInView(0.2);

  return (
    <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-teal-600">Infinz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your trusted partner for smart borrowing decisions with India's most comprehensive loan marketplace
          </p>
        </div>

        {/* Milestone Path */}
        <div ref={elementRef} className="relative">
          {/* Animated Path Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2 hidden lg:block">
            <div 
              className={`h-full bg-gradient-to-r from-teal-500 to-orange-500 rounded-full transition-all duration-2000 ease-out ${
                isInView ? 'w-full' : 'w-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />
          </div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {milestones.map((milestone) => {
              const IconComponent = milestone.icon;
              const colors = colorClasses[milestone.color as keyof typeof colorClasses];
              
              return (
                <div
                  key={milestone.id}
                  className={`relative transform transition-all duration-1000 ease-out ${
                    isInView 
                      ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                      : 'translate-y-16 opacity-0 scale-75 -rotate-12'
                  }`}
                  style={{ 
                    transitionDelay: isInView ? `${milestone.delay}ms` : '0ms' 
                  }}
                >
                  {/* Milestone Card */}
                  <div className={`
                    bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl 
                    transition-all duration-500 border-2 ${colors.border}
                    transform hover:-translate-y-2 hover:scale-105
                    ${isInView ? `${colors.glow}` : ''}
                  `}>
                    {/* Icon Container */}
                    <div className={`
                      w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.bg}
                      flex items-center justify-center transform transition-all duration-700
                      ${isInView ? 'animate-bounce' : ''}
                    `}
                    style={{
                      animationDelay: isInView ? `${milestone.delay + 300}ms` : '0ms',
                      animationDuration: '1s',
                      animationIterationCount: '2'
                    }}
                    >
                      <IconComponent className={`h-8 w-8 ${colors.icon} transform transition-all duration-500 ${
                        isInView ? 'scale-100' : 'scale-0'
                      }`}
                      style={{
                        transitionDelay: isInView ? `${milestone.delay + 500}ms` : '0ms'
                      }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`text-lg font-bold text-gray-900 mb-3 leading-tight transform transition-all duration-700 ${
                        isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{
                        transitionDelay: isInView ? `${milestone.delay + 600}ms` : '0ms'
                      }}
                      >
                        {milestone.title}
                      </h3>
                      <p className={`text-sm text-gray-600 leading-relaxed transform transition-all duration-700 ${
                        isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{
                        transitionDelay: isInView ? `${milestone.delay + 800}ms` : '0ms'
                      }}
                      >
                        {milestone.description}
                      </p>
                    </div>

                    {/* Step Number */}
                    <div className={`
                      absolute -top-3 -right-3 w-8 h-8 rounded-full ${colors.accent}
                      flex items-center justify-center text-white font-bold text-sm
                      transform transition-all duration-700
                      ${isInView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
                    `}
                    style={{
                      transitionDelay: isInView ? `${milestone.delay + 200}ms` : '0ms'
                    }}
                    >
                      <span className={`transform transition-all duration-500 ${
                        isInView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                      }`}
                      style={{
                        transitionDelay: isInView ? `${milestone.delay + 400}ms` : '0ms'
                      }}
                      >
                        {milestone.id}
                      </span>
                    </div>

                    {/* Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.bg} opacity-0 
                      hover:opacity-20 transition-opacity duration-300 pointer-events-none
                    `} />
                  </div>

                  {/* Connection Line for Mobile */}
                  {milestone.id < milestones.length && (
                    <div className="lg:hidden flex justify-center mt-6 mb-2">
                      <div className={`
                        w-1 h-8 bg-gradient-to-b from-teal-500 to-orange-500 rounded-full
                        transform transition-all duration-700 ${isInView ? 'scale-y-100' : 'scale-y-0'}
                      `}
                      style={{ 
                        transitionDelay: isInView ? `${milestone.delay + 200}ms` : '0ms' 
                      }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Particles Animation */}
          {isInView && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-2 h-2 bg-teal-400 rounded-full opacity-60
                    animate-bounce
                  `}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;
