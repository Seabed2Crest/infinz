'use client';

import { useState, useEffect, useRef } from "react";
import { CreditCard, Calculator, TrendingUp, Shield } from "lucide-react";
import Image from "next/image";

// Custom hook for intersection observer with one-time trigger
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { isInView, elementRef };
}

interface CreditScoreProps {
  onOpenModal: () => void;
}

function CreditScore({ onOpenModal }: CreditScoreProps) {
  const { isInView, elementRef } = useInView(0.2);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <section id="credit-score" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Check Your <span className="text-blue-600">Credit Score</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
          >
            Unlock your credit potential and get insights on how to improve your credit score with our free tools
          </p>
        </div>

        <div ref={elementRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Animated Graphic */}
          <div className={`relative transform transition-all duration-1200 ease-out ${
            isInView ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-12 opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '400ms' }}
          >
            {/* Main Phone Graphic Container */}
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-70 animate-bounce" 
                   style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full opacity-60 animate-bounce" 
                   style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-yellow-400 rounded-full opacity-50 animate-bounce" 
                   style={{ animationDelay: '2s', animationDuration: '4s' }}></div>

              {/* Phone UI Graphic */}
              <div className="relative group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/credit-score.jpg" 
                  alt="Credit Score Check Interface"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  priority
                />
                
                {/* Overlay Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Credit Score Badge */}
              <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg border-4 border-green-400 transition-all duration-700 ${
                isInView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}
              style={{ transitionDelay: '800ms' }}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-gray-800">750+</span>
                  <span className="text-sm text-gray-600">Excellent</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className={`absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border-2 border-blue-300 transition-all duration-700 ${
                isInView ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
              }`}
              style={{ transitionDelay: '1000ms' }}
              >
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Buttons */}
          <div className={`space-y-6 transform transition-all duration-1000 ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
          >
            {/* Check EMI Options Button */}
            <div 
              className={`group cursor-pointer transform transition-all duration-500 ${
                hoveredButton === 'emi' ? 'scale-105 -translate-y-2' : 'hover:scale-102 hover:-translate-y-1'
              }`}
              onMouseEnter={() => setHoveredButton('emi')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className={`
                bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300
                ${hoveredButton === 'emi' 
                  ? 'border-blue-400 shadow-2xl shadow-blue-500/25' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-2xl'
                }
              `}>
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 
                    flex items-center justify-center transform transition-all duration-300
                    ${hoveredButton === 'emi' ? 'scale-110 rotate-6' : 'group-hover:scale-105'}
                  `}>
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Check EMI Options</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Calculate your loan EMI based on your credit score and find the best repayment options for your budget.
                    </p>
                  </div>
                  <div className={`
                    transform transition-all duration-300 
                    ${hoveredButton === 'emi' ? 'translate-x-2' : 'group-hover:translate-x-1'}
                  `}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Credit Score Check Button */}
            <div 
              className={`group cursor-pointer transform transition-all duration-500 ${
                hoveredButton === 'credit' ? 'scale-105 -translate-y-2' : 'hover:scale-102 hover:-translate-y-1'
              }`}
              onMouseEnter={() => setHoveredButton('credit')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className={`
                bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300
                ${hoveredButton === 'credit' 
                  ? 'border-green-400 shadow-2xl shadow-green-500/25' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-2xl'
                }
              `}>
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 
                    flex items-center justify-center transform transition-all duration-300
                    ${hoveredButton === 'credit' ? 'scale-110 rotate-6' : 'group-hover:scale-105'}
                  `}>
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Credit Score Check</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get your free credit score instantly and understand your creditworthiness with detailed insights.
                    </p>
                  </div>
                  <div className={`
                    transform transition-all duration-300 
                    ${hoveredButton === 'credit' ? 'translate-x-2' : 'group-hover:translate-x-1'}
                  `}>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className={`text-center pt-6 transform transition-all duration-1000 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '1200ms' }}
            >
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Secure & Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreditScore;
