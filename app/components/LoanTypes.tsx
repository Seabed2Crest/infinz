"use client";

import { useState, useEffect, useRef } from "react";

// Custom hook for counter animation
function useCounterAnimation(
  endValue: number,
  duration: number = 2000,
  trigger: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trigger) {
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
  }, [trigger, endValue, duration]);

  return count;
}

interface LoanTypesProps {
  onOpenModal: () => void;
}

function LoanTypes({ onOpenModal }: LoanTypesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pass isVisible to trigger all counters
  const trustYears = useCounterAnimation(7, 3500, isVisible);
  const loanAmount = useCounterAnimation(100, 4000, isVisible);
  const happyCustomers = useCounterAnimation(50, 3500, isVisible);

  return (
    <section id="statistics" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-slide-up">
            Trusted by Thousands
          </h2>
        </div>

        {/* Single Card with Ocean Blue Gradient Background */}
        <div
          ref={cardRef}
          className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-10 rounded-2xl text-center border border-blue-700 hover:shadow-xl transition-all duration-300 animate-bounce-in"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* 7 Years of Abiding Trust */}
            <div>
              <div className="text-4xl font-bold text-white mb-1">
                {trustYears}+
              </div>
              <div className="text-base font-semibold text-white mb-1">
                Years of Abiding Trust
              </div>
              <div className="text-xs text-blue-100">
                Building relationships since {new Date().getFullYear() - 7}
              </div>
            </div>

            {/* 100 Cr+ Loan Approved */}
            <div>
              <div className="text-4xl font-bold text-white mb-1">
                ₹{loanAmount}Cr+
              </div>
              <div className="text-base font-semibold text-white mb-1">
                Loans Approved
              </div>
              <div className="text-xs text-blue-100">
                Total amount disbursed
              </div>
            </div>

            {/* 50K Happy Customers */}
            <div>
              <div className="text-4xl font-bold text-white mb-1">
                {happyCustomers}K+
              </div>
              <div className="text-base font-semibold text-white mb-1">
                Happy Customers
              </div>
              <div className="text-xs text-blue-100">
                Satisfied with our service
              </div>
            </div>
          </div>
        </div>

        {/* Additional trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-sm text-gray-500">
              Trusted by leading banks
            </div>
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
