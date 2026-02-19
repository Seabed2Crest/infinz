"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import Lottie from "react-lottie-player";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const heroSlides = [
  {
    title: "Find the right solution for all your",
    subtitle: "financial needs",
    description:
      "Get personalized loan offers from 30+ trusted lending partners - the best rates, terms, and features that match your unique requirements",
    stats: [
      { value: "50+", label: "Trusted Lenders" },
      { value: "100 CR", label: "Loans Facilitated" },
      { value: "98%", label: "Approval Rate" },
    ],
    buttonText: "Check & Apply",
    lottiePath: "/lottie/Animation - financial.json", // 👈 slide-specific Lottie
  },
  {
    title: "Get an instant loan up to 1 Crore.",
    subtitle: "in just 5 minutes",
    description:
      "Skip the paperwork and long waits. Get quick approvals and disbursal within 3 days for your urgent financial needs with Our digital-first process",
    buttonText: "Apply Now",
    stats: [
      { value: "5 min", label: "Quick Apply" },
      { value: "100%", label: "Digital Process" },
      { value: "3 Day", label: "Loan Disbursment" },
    ],
    lottiePath: "/lottie/Revenue.json", // 👈 different animation
  },
];

interface HeroProps {
  onOpenModal: () => void;
  onOpenLeadForm: () => void;
}

function Hero({ onOpenModal, onOpenLeadForm }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight transition-all duration-500 animate-slide-up">
                {currentSlideData.title}
                <br />
                <span className="relative inline-block ml-2">
                  <span className="text-blue-600">
                    {" "}
                    {currentSlideData.subtitle}
                  </span>
                  <span className="absolute left-0 right-0 -bottom-2 h-2 bg-blue-200 rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl transition-all duration-500 animate-slide-up animate-delay-200">
                {currentSlideData.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-300">
              <button
                onClick={() => {
                  console.log("btn clicked");
                  
                  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
                    (window as any).fbq("track", "InitiateCheckout");
                  }
                  router.push("/login");
                }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                {currentSlideData.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-8 pt-2 animate-slide-up animate-delay-400">
              {currentSlideData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="transition-all duration-500 animate-bounce-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-blue-700">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative animate-slide-right animate-delay-200">
            <div className="relative">
              <div className="aspect-[4/3] w-full flex items-center justify-center">
                <Lottie
                  play
                  loop
                  path={currentSlideData.lottiePath} // 👈 slide-specific Lottie
                  className="h-80 sm:h-96 lg:h-[520px] w-auto animate-scale-in animate-delay-500"
                />
              </div>

              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-full shadow-md px-4 py-2 flex items-center gap-2 animate-bounce-in animate-delay-700">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-800">
                  Loan Approved
                </span>
              </div>
            </div>

            {/* Slide Dots */}
            <div className="mt-6 flex items-center justify-center gap-2 animate-fade-in-up animate-delay-600">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
