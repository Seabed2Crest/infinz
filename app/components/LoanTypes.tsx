'use client';

import { useState, useEffect, useRef } from "react";

// Custom hook for counter animation
function useCounterAnimation(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * endValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, endValue, duration]);

  return { count, elementRef };
}

interface LoanTypesProps {
  onOpenModal: () => void;
}

function LoanTypes({ onOpenModal }: LoanTypesProps) {
  const trustYears = useCounterAnimation(7, 3500);
  const loanAmount = useCounterAnimation(100, 4000);
  const happyCustomers = useCounterAnimation(50, 3500);

  return (
    <section id="statistics" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-slide-up">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Our track record speaks for itself - delivering exceptional financial solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* 7 Years of Abiding Trust */}
          <div 
            ref={trustYears.elementRef}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center border border-blue-200 hover:shadow-lg transition-all duration-300 animate-bounce-in animate-delay-300"
          >
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {trustYears.count}+
            </div>
            <div className="text-base font-semibold text-blue-800 mb-1">
              Years of Abiding Trust
            </div>
            <div className="text-xs text-blue-600">
              Building relationships since {new Date().getFullYear() - 7}
            </div>
          </div>

          {/* 100 Cr+ Loan Approved */}
          <div 
            ref={loanAmount.elementRef}
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center border border-orange-200 hover:shadow-lg transition-all duration-300 animate-bounce-in animate-delay-400"
          >
            <div className="text-4xl font-bold text-orange-600 mb-1">
              ₹{loanAmount.count}Cr+
            </div>
            <div className="text-base font-semibold text-orange-800 mb-1">
              Loans Approved
            </div>
            <div className="text-xs text-orange-600">
              Total amount disbursed
            </div>
          </div>

          {/* 50K Happy Customers */}
          <div 
            ref={happyCustomers.elementRef}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center border border-green-200 hover:shadow-lg transition-all duration-300 animate-bounce-in animate-delay-500"
          >
            <div className="text-4xl font-bold text-green-600 mb-1">
              {happyCustomers.count}K+
            </div>
            <div className="text-base font-semibold text-green-800 mb-1">
              Happy Customers
            </div>
            <div className="text-xs text-green-600">
              Satisfied with our service
            </div>
          </div>
        </div>

        {/* Additional trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm text-gray-500">Trusted by leading banks</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="text-sm text-gray-500">RBI Approved Partners</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="text-sm text-gray-500">Secure & Encrypted</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanTypes;
