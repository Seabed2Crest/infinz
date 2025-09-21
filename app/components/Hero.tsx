'use client';

import { ArrowRight, CheckCircle } from "lucide-react";
import Lottie from "react-lottie-player";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    title: "Find the right solution for all your",
    subtitle: "financial needs",
    description: "Compare personalized loan offers from 50+ top lenders and choose the best rates, terms, and features that match your unique requirements",
    buttonText: "Compare & Apply",
    stats: [
      { value: "50+", label: "Trusted Lenders" },
      { value: "₹50M+", label: "Loans Facilitated" },
      { value: "98%", label: "Approval Happiness" }
    ]
  },
  {
    title: "Get an instant loan up to 1 Cr.",
    subtitle: "in just 5 minutes",
    description: "Skip the paperwork and long waits. Our digital-first process delivers quick approvals and same-day disbursal for your urgent financial needs",
    buttonText: "Apply Now",
    stats: [
      { value: "5 min", label: "Quick Process" },
      { value: "₹1Cr", label: "Max Loan Amount" },
      { value: "Same Day", label: "Disbursal" }
    ]
  }
];

function Hero () {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

    return (
  <section
        id="hero"
        className="bg-gradient-to-br from-teal-50 via-white to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight transition-all duration-500">
                  {currentSlideData.title}
                  <br />
                  with
                  <span className="relative inline-block ml-2">
                    <span className="text-teal-600"> {currentSlideData.subtitle}</span>
                    <span className="absolute left-0 right-0 -bottom-2 h-2 bg-teal-200 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl transition-all duration-500">
                  {currentSlideData.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {}}
                  className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg inline-flex items-center justify-center"
                >
                  {currentSlideData.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-8 pt-2">
                {currentSlideData.stats.map((stat, index) => (
                  <div key={index} className="transition-all duration-500">
                    <div className="text-2xl font-bold text-teal-700">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="aspect-[4/3] w-full flex items-center justify-center">
                  <Lottie
                    play
                    loop
                    path="/lottie/Animation - financial.json"
                    className="h-80 sm:h-96 lg:h-[520px] w-auto"
                  />
                </div>

                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-full shadow-md px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-800">Loan Approved</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-6 bg-teal-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Hero;