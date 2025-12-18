"use client";

import { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  User,
  Calculator,
  Shield,
  Banknote,
  CheckCircle,
  Clock,
  FileText,
  CreditCard,
  Zap,
  Lock,
  Briefcase,
  ArrowUpCircle,
  Send,
  Building2,
  Phone,
  ShieldCheck,
  Upload,
  BadgeCheck,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Custom hook for individual step visibility
function useStepInView(threshold = 0.6) {
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

// Timeline progress hook
function useTimelineProgress() {
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Calculate progress based on how much of the timeline is visible
            const visibleTop = Math.max(0, windowHeight - elementTop);
            const visibleHeight = Math.min(visibleTop, elementHeight);
            const progressPercent = Math.min(
              100,
              (visibleHeight / elementHeight) * 100
            );

            setProgress(progressPercent);
          }
        });
      },
      { threshold: Array.from(Array(101).keys(), (i) => i / 100) }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { progress, timelineRef };
}

// Loan steps data with enhanced features including icons
const loanSteps = [
  {
    id: 1,
    title: "Verify Mobile Number",
    description: "Instant mobile authentication to protect your application",
    icon: Smartphone,
    delay: 0,
    features: [
      { text: "OTP Verification", icon: ShieldCheck },
      { text: "Secure Process", icon: Lock },
      { text: "30 Seconds", icon: Clock },
    ],
  },
  {
    id: 2,
    title: "Enter Basic Details",
    description: "Share basic personal and professional information quickly",
    icon: User,
    delay: 300,
    features: [
      { text: "Personal Info", icon: User },
      { text: "Professional Details", icon: Briefcase },
      { text: "2 Minutes", icon: Clock },
    ],
  },
  {
    id: 3,
    title: "Fill-up Loan Requirement",
    description:
      "Select your loan amount, tenure, and purpose from our flexible options",
    icon: Calculator,
    delay: 600,
    features: [
      { text: "Loan Amount", icon: Banknote },
      { text: "Tenure Selection", icon: Target },
      { text: "Purpose Details", icon: FileText },
    ],
  },
  {
    id: 4,
    title: "Complete KYC",
    description:
      "Upload documents digitally for instant verification and compliance",
    icon: Shield,
    delay: 900,
    features: [
      { text: "Document Upload", icon: Upload },
      { text: "AI Verification", icon: Zap },
      { text: "Instant Process", icon: BadgeCheck },
    ],
  },
  {
    id: 5,
    title: "Get Your Loan",
    description:
      "Receive funds directly in your bank account within 24 hours of approval",
    icon: Banknote,
    delay: 1200,
    features: [
      { text: "Direct Transfer", icon: Send },
      { text: "24 Hours", icon: Clock },
      { text: "Bank Account", icon: Building2 },
    ],
  },
];

// Unified ocean blue color scheme for all steps
const oceanBlueColors = {
  bg: "from-blue-500 to-blue-600",
  light: "from-blue-100 to-blue-200",
  border: "border-blue-300",
  text: "text-blue-600",
  shadow: "shadow-blue-500/25",
  glow: "shadow-blue-500/40",
};

// Step card component
function StepCard({
  step,
  index,
  isActive,
}: {
  step: any;
  index: number;
  isActive: boolean;
}) {
  const { isInView, elementRef } = useStepInView(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = step.icon;

  return (
    <div
      ref={elementRef}
      className={`relative flex items-center gap-8 transform transition-all duration-1000 ${
        isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
      }`}
      style={{ transitionDelay: `${step.delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div
          className={`
          w-16 h-16 rounded-full bg-gradient-to-br ${oceanBlueColors.bg} 
          flex items-center justify-center shadow-2xl transform transition-all duration-500
          ${
            isHovered
              ? `scale-125 rotate-12 ${oceanBlueColors.glow}`
              : "scale-100"
          }
          ${isInView ? "animate-pulse" : ""}
        `}
          style={{
            animationDuration: "2s",
            animationDelay: `${step.delay + 500}ms`,
            animationIterationCount: "3",
          }}
        >
          <IconComponent className="h-8 w-8 text-white" />
        </div>

        {/* Step Number Badge */}
        <div
          className={`
          absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 ${
            oceanBlueColors.border
          }
          flex items-center justify-center text-xs font-bold ${
            oceanBlueColors.text
          }
          transform transition-all duration-300
          ${isHovered ? "scale-125" : "scale-100"}
        `}
        >
          {step.id}
        </div>
      </div>

      {/* Content Card */}
      <div
        className={`
        flex-1 bg-white rounded-3xl p-8 shadow-xl border-2 ${
          oceanBlueColors.border
        }
        transform transition-all duration-500 relative overflow-hidden
        ${
          isHovered
            ? `scale-105 -translate-y-2 ${oceanBlueColors.glow} shadow-2xl`
            : "hover:scale-102"
        }
      `}
      >
        {/* Background Pattern */}
        <div
          className={`
          absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
            oceanBlueColors.light
          } 
          rounded-full blur-2xl opacity-30 transform transition-all duration-500
          ${isHovered ? "scale-150 opacity-50" : "scale-100"}
        `}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3
            className={`text-2xl font-bold text-gray-900 mb-3 transition-all duration-300 ${
              isHovered ? oceanBlueColors.text : ""
            }`}
          >
            {step.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {step.description}
          </p>

          {/* Features with Icons */}
          <div className="flex flex-wrap gap-3">
            {step.features.map((feature: any, idx: number) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`
                    px-4 py-2 rounded-full bg-gradient-to-r ${
                      oceanBlueColors.light
                    } 
                    text-sm font-medium ${oceanBlueColors.text} border ${
                    oceanBlueColors.border
                  }
                    flex items-center gap-2
                    transform transition-all duration-300
                    ${isHovered ? "scale-105 -translate-y-1" : ""}
                  `}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <FeatureIcon className="h-4 w-4" />
                  {feature.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div
          className={`
          absolute bottom-0 left-0 h-1 bg-gradient-to-r ${oceanBlueColors.bg} 
          transform transition-all duration-1000 origin-left
          ${isInView ? "scale-x-100" : "scale-x-0"}
        `}
          style={{ transitionDelay: `${step.delay + 800}ms` }}
        />
      </div>
    </div>
  );
}

// Main component
interface LoanStepsProps {
  onOpenModal?: () => void;
}

function LoanSteps({ onOpenModal }: LoanStepsProps) {
  const { progress, timelineRef } = useTimelineProgress();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);
  const router = useRouter();

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

  return (
    <section
      id="loan-steps"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Get a Loan Online in{" "}
            <span className="text-blue-600">5 Simple Steps</span>
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Experience the fastest and most convenient way to secure your loan
            with our streamlined digital process that puts you in control
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
            <div
              className="w-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ height: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {loanSteps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isActive={progress > index * 20}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div
            className={`transition-all duration-1000 ${
              progress > 80
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <button
              className="
              bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white 
              px-12 py-6 rounded-3xl font-bold text-xl 
              hover:from-blue-700 hover:via-blue-800 hover:to-blue-900
              transform hover:scale-110 hover:-translate-y-2
              transition-all duration-500 shadow-2xl hover:shadow-3xl
              relative overflow-hidden group
            "
              onClick={() => router.push("/login?loan=personal&apply=false")}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Loan Journey
                <Zap className="h-6 w-6 group-hover:animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <p className="mt-6 text-gray-500 text-lg">
              ⚡ Get approved in minutes • 🔒 100% secure process • 💰
              Competitive rates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanSteps;
