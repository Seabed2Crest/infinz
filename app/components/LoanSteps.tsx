'use client';

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
  Zap
} from "lucide-react";

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
            const progressPercent = Math.min(100, (visibleHeight / elementHeight) * 100);
            
            setProgress(progressPercent);
          }
        });
      },
      { threshold: Array.from(Array(101).keys(), i => i / 100) }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { progress, timelineRef };
}

const loanSteps = [
  {
    id: 1,
    title: "Verify Mobile Number",
    description: "Instant mobile authentication to protect your application",
    icon: Smartphone,
    color: "blue",
    delay: 0,
    features: ["OTP Verification", "Secure Process", "30 Seconds"]
  },
  {
    id: 2,
    title: "Enter Basic Details",
    description: "Share basic personal and professional information quickly",
    icon: User,
    color: "green",
    delay: 300,
    features: ["Personal Info", "Professional Details", "2 Minutes"]
  },
  {
    id: 3,
    title: "Fill-up Loan Requirement",
    description: "Select your loan amount, tenure, and purpose from our flexible options",
    icon: Calculator,
    color: "purple",
    delay: 600,
    features: ["Loan Amount", "Tenure Selection", "Purpose Details"]
  },
  {
    id: 4,
    title: "Complete KYC",
    description: "Upload documents digitally for instant verification and compliance",
    icon: Shield,
    color: "orange",
    delay: 900,
    features: ["Document Upload", "AI Verification", "Instant Process"]
  },
  {
    id: 5,
    title: "Get Your Loan",
    description: "Receive funds directly in your bank account within 24 hours of approval",
    icon: Banknote,
    color: "teal",
    delay: 1200,
    features: ["Direct Transfer", "24 Hours", "Bank Account"]
  }
];

const colorClasses = {
  blue: {
    bg: "from-blue-400 to-blue-600",
    light: "from-blue-100 to-blue-200",
    border: "border-blue-300",
    text: "text-blue-600",
    shadow: "shadow-blue-500/25",
    glow: "shadow-blue-500/40"
  },
  green: {
    bg: "from-green-400 to-green-600",
    light: "from-green-100 to-green-200",
    border: "border-green-300",
    text: "text-green-600",
    shadow: "shadow-green-500/25",
    glow: "shadow-green-500/40"
  },
  purple: {
    bg: "from-purple-400 to-purple-600",
    light: "from-purple-100 to-purple-200",
    border: "border-purple-300",
    text: "text-purple-600",
    shadow: "shadow-purple-500/25",
    glow: "shadow-purple-500/40"
  },
  orange: {
    bg: "from-orange-400 to-orange-600",
    light: "from-orange-100 to-orange-200",
    border: "border-orange-300",
    text: "text-orange-600",
    shadow: "shadow-orange-500/25",
    glow: "shadow-orange-500/40"
  },
  teal: {
    bg: "from-teal-400 to-teal-600",
    light: "from-teal-100 to-teal-200",
    border: "border-teal-300",
    text: "text-teal-600",
    shadow: "shadow-teal-500/25",
    glow: "shadow-teal-500/40"
  }
};

function StepCard({ step, index, isActive }: { step: any, index: number, isActive: boolean }) {
  const { isInView, elementRef } = useStepInView(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = step.icon;
  const colors = colorClasses[step.color as keyof typeof colorClasses];

  return (
    <div
      ref={elementRef}
      className={`relative flex items-center gap-8 transform transition-all duration-1000 ${
        isInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
      }`}
      style={{ transitionDelay: `${step.delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`
          w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} 
          flex items-center justify-center shadow-2xl transform transition-all duration-500
          ${isHovered ? `scale-125 rotate-12 ${colors.glow}` : 'scale-100'}
          ${isInView ? 'animate-pulse' : ''}
        `}
        style={{
          animationDuration: '2s',
          animationDelay: `${step.delay + 500}ms`,
          animationIterationCount: '3'
        }}
        >
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        
        {/* Step Number Badge */}
        <div className={`
          absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 ${colors.border}
          flex items-center justify-center text-xs font-bold ${colors.text}
          transform transition-all duration-300
          ${isHovered ? 'scale-125' : 'scale-100'}
        `}>
          {step.id}
        </div>
      </div>

      {/* Content Card */}
      <div className={`
        flex-1 bg-white rounded-3xl p-8 shadow-xl border-2 ${colors.border}
        transform transition-all duration-500 relative overflow-hidden
        ${isHovered ? `scale-105 -translate-y-2 ${colors.glow} shadow-2xl` : 'hover:scale-102'}
      `}>
        {/* Background Pattern */}
        <div className={`
          absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.light} 
          rounded-full blur-2xl opacity-30 transform transition-all duration-500
          ${isHovered ? 'scale-150 opacity-50' : 'scale-100'}
        `} />

        {/* Content */}
        <div className="relative z-10">
          <h3 className={`text-2xl font-bold text-gray-900 mb-3 transform transition-all duration-300 ${
            isHovered ? colors.text : ''
          }`}>
            {step.title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {step.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3">
            {step.features.map((feature: string, idx: number) => (
              <div
                key={idx}
                className={`
                  px-4 py-2 rounded-full bg-gradient-to-r ${colors.light} 
                  text-sm font-medium ${colors.text} border ${colors.border}
                  transform transition-all duration-300
                  ${isHovered ? 'scale-105 -translate-y-1' : ''}
                `}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* 3D Floating Icons */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <CheckCircle className={`absolute top-4 right-4 h-6 w-6 ${colors.text} animate-bounce opacity-70`} 
                        style={{ animationDelay: '0s', animationDuration: '2s' }} />
            <Clock className={`absolute bottom-4 right-8 h-5 w-5 ${colors.text} animate-bounce opacity-60`} 
                   style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
            <Zap className={`absolute top-1/2 right-2 h-4 w-4 ${colors.text} animate-bounce opacity-50`} 
                 style={{ animationDelay: '1s', animationDuration: '3s' }} />
          </div>
        )}

        {/* Progress Indicator */}
        <div className={`
          absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.bg} 
          transform transition-all duration-1000 origin-left
          ${isInView ? 'scale-x-100' : 'scale-x-0'}
        `}
        style={{ transitionDelay: `${step.delay + 800}ms` }}
        />
      </div>
    </div>
  );
}

interface LoanStepsProps {
  onOpenModal: () => void;
}

function LoanSteps({ onOpenModal }: LoanStepsProps) {
  const { progress, timelineRef } = useTimelineProgress();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerInView, setHeaderInView] = useState(false);

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
    <section id="loan-steps" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-teal-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
            headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Get a Loan Online in <span className="text-teal-600">5 Simple Steps</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 ${
            headerInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
          >
            Experience the fastest and most convenient way to secure your loan with our streamlined digital process that puts you in control
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
            <div 
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
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
                isActive={progress > (index * 20)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className={`transform transition-all duration-1000 ${
            progress > 80 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <button className="
              bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white 
              px-12 py-6 rounded-3xl font-bold text-xl 
              hover:from-teal-700 hover:via-blue-700 hover:to-purple-700
              transform hover:scale-110 hover:-translate-y-2
              transition-all duration-500 shadow-2xl hover:shadow-3xl
              relative overflow-hidden group
            ">
              <span className="relative z-10 flex items-center gap-3">
                Start Your Loan Journey
                <Zap className="h-6 w-6 group-hover:animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <p className="mt-6 text-gray-500 text-lg">
              ⚡ Get approved in minutes • 🔒 100% secure process • 💰 Competitive rates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanSteps;
