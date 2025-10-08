'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import Image from "next/image";

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What is an Instant Loan, and how does it work?",
    answer: "Instant loan designed to help you with immediate expenses, and provides quick access to funds through an online application process. It works by using AI-powered algorithms to assess your creditworthiness within minutes based on your profile, credit score, and banking data. Once approved, funds are disbursed directly to your bank account, typically within 24 hours."
  },
  {
    id: 2,
    question: "Do you offer services in my city?",
    answer: "Infinz is currently offering its personal loan services all over India, and business loan services only in Bengaluru and around locations within 150 KM."
  },
  {
    id: 3,
    question: "What is my loan eligibility / How much can I borrow?",
    answer: "Your loan eligibility depends on factors like your monthly income, credit score, employment history, and existing obligations. Generally, you can borrow 10-15 times your monthly salary, with loan amounts ranging from ₹10,000 to ₹1 crore. Use our eligibility calculator on the website for an instant assessment of your borrowing capacity."
  },
  {
    id: 4,
    question: "What all Documents are required to apply for a Loan?",
    answer: "Basic documents include: PAN Card, Aadhaar Card, salary slips (last 3 months), bank statements (last 3-6 months), employment letter or offer letter, and recent passport-size photographs. Additional documents may be requested based on your employment type and loan amount."
  },
  {
    id: 5,
    question: "How can I Repay the Loan?",
    answer: "We offer multiple repayment options: Auto-debit from your bank account (recommended), online payment through net banking, UPI payments, and NEFT/RTGS transfers."
  },
  {
    id: 6,
    question: "How will I know if I am Approved? When will I receive my Funds?",
    answer: "You'll receive instant approval notification via SMS and email within a few minutes of application completion. Once all documentation is verified, funds are typically disbursed within 24 hours on business days. You'll get real-time updates throughout the process via SMS and email."
  },
  {
    id: 7,
    question: "What if I am unable to Pay the Loan at the agreed time?",
    answer: "Contact our customer support team immediately if you anticipate payment difficulties. We offer flexible solutions like EMI restructuring, payment holidays, or tenure extension based on your situation. Early communication helps avoid late payment charges and protects your credit score."
  },
  {
    id: 8,
    question: "Once the existing Loan is paid, when can I apply for a New Loan?",
    answer: "You can apply for a new loan immediately after full repayment of your existing loan. In fact, timely repayment makes you eligible for higher loan amounts and better interest rates on future loans. Repeat customers often get instant pre-approved offers."
  }
];


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

function FaqItem({ faq, index, isOpen, onToggle }: { faq: any, index: number, isOpen: boolean, onToggle: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 overflow-hidden
        ${isOpen ? 'border-teal-300 shadow-xl' : 'border-gray-100 hover:border-teal-200'}
        ${isHovered ? 'shadow-xl' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {faq.question}
        </h3>
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center
          transition-all duration-300
          ${isOpen ? 'bg-teal-200 rotate-180' : ''}
          ${isHovered ? 'scale-110' : ''}
        `}>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-teal-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-teal-600" />
          )}
        </div>
      </button>

      {/* Answer Content */}
      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FaqProps {
  onOpenModal: () => void;
}

function Faq({ onOpenModal }: FaqProps) {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default
  const { isInView, elementRef } = useInView(0.2);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-teal-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={elementRef} className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Frequently Asked Questions?
            <span className="inline-block ml-3 text-yellow-500 transform transition-all duration-500 hover:rotate-12">
              →
            </span>
          </h2>
          {/* <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
          >
            Get answers to all your questions about our loan services and application process
          </p> */}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - 3D Illustration */}
          <div className={`transform transition-all duration-1000 ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
                {/* FAQ Image */}
                <div className="relative group">
                  <Image 
                    src="/faq.jpg" 
                    alt="FAQ Illustration"
                    width={500}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-1/2 -right-6 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '2s' }}>
                  <span className="text-white font-bold text-sm">?</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-gradient-to-br from-teal-200 to-blue-200 rounded-3xl transform rotate-3"></div>
            </div>
          </div>

          {/* Right Side - FAQ List */}
          <div className={`space-y-4 transform transition-all duration-1000 ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
          >
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={`transform transition-all duration-700 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <FaqItem
                  faq={faq}
                  index={index}
                  isOpen={openItems.includes(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className={`text-center mt-16 transform transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
        >
          <p className="text-gray-600 mb-6">
            Still have questions? Our support team is here to help!
          </p>
          <button className="
            bg-gradient-to-r from-teal-600 to-blue-600 text-white 
            px-8 py-4 rounded-2xl font-semibold text-lg 
            hover:from-teal-700 hover:to-blue-700 
            transform hover:scale-105 hover:-translate-y-1
            transition-all duration-300 shadow-xl hover:shadow-2xl
            relative overflow-hidden group
          ">
            <span className="relative z-10">Contact Support</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div> */}
      </div>
    </section>
  );
}
export default Faq;
