"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemType {
  id: number;
  question: string;
  answer: string;
}

interface FaqProps {
  topic?: "home" | "business-loan" | "personal-loan" | "calculator";
}

const faqTopics: Record<string, FaqItemType[]> = {
  home: [
    {
      id: 1,
      question: "What is an instant loan, and how does it work?",
      answer:
        "Instant loan designed to help you with immediate expenses, and provides quick access to funds through an online application process. It works by using AI-powered algorithms to assess your creditworthiness within minutes based on your profile, credit score, and banking data. Once approved, funds are disbursed directly to your bank account, typically within 24 hours.",
    },
    {
      id: 2,
      question: "Do you offer services in my city?",
      answer:
        "Infinz is currently offering its personal loan services all over India, and business loan services only in Bengaluru and around locations within 150 KM.",
    },
    {
      id: 3,
      question: "What is my loan eligibility/how much can I borrow?",
      answer:
        "Your loan eligibility depends on factors like your monthly income, credit score, employment history, and existing obligations. Generally, you can borrow 10-15 times your monthly salary, with loan amounts ranging from ₹10,000 to ₹1 crore. Use our eligibility calculator on the website for an instant assessment of your borrowing capacity.",
    },
    {
      id: 4,
      question: "What all documents are required to apply for a loan?",
      answer:
        "Basic documents include: PAN Card, Aadhaar Card, salary slips (last 3 months), bank statements (last 3-6 months), employment letter or offer letter, and recent passport-size photographs. Additional documents may be requested based on your employment type and loan amount.",
    },
    {
      id: 5,
      question: "How can I repay the loan?",
      answer:
        "We offer multiple repayment options: Auto-debit from your bank account (recommended), online payment through net banking, UPI payments, and NEFT/RTGS transfers.",
    },
    {
      id: 6,
      question:
        "How will I know if I am approved? When will I receive my funds?",
      answer:
        "You'll receive instant approval notification via SMS and email within a few minutes of application completion. Once all documentation is verified, funds are typically disbursed within 24 hours on business days. You'll get real-time updates throughout the process via SMS and email.",
    },
    {
      id: 7,
      question: "What if I am unable to pay the loan at the agreed time?",
      answer:
        "Contact our customer support team immediately if you anticipate payment difficulties. We offer flexible solutions like EMI restructuring, payment holidays, or tenure extension based on your situation. Early communication helps avoid late payment charges and protects your credit score.",
    },
    {
      id: 8,
      question:
        "Once the existing loan is paid, when can I apply for a new loan?",
      answer:
        "You can apply for a new loan immediately after full repayment of your existing loan. In fact, timely repayment makes you eligible for higher loan amounts and better interest rates on future loans. Repeat customers often get instant pre-approved offers.",
    },
  ],
  "business-loan": [
    {
      id: 1,
      question: "What is a business loan, and who can apply?",
      answer:
        "A business loan is funding provided to businesses for various purposes, like expansion, working capital, equipment purchase, or inventory management. Any registered business owner aged 23-65 years, with a minimum of 1 year of business vintage and an annual turnover of ₹2 lakhs, can apply.",
    },
    {
      id: 2,
      question: "How does a business loan differ from a personal loan?",
      answer:
        "Business loans are specifically designed for business purposes with higher loan amounts (up to ₹1 crore) and longer repayment tenures (up to 7 years), and require business documentation like GST, ITR, and turnover proof. Personal loans are for individual needs with lower amounts (up to ₹40 lakhs), shorter tenures, and require only salary/income proof.",
    },
    {
      id: 3,
      question:
        "What is the maximum loan amount I can get, and at what interest rate?",
      answer:
        "You can get business loans up to ₹1 crore based on your business turnover, credit score, and repayment capacity. Interest rates start from 12% per annum and can go up to 24% depending on your business profile, credit history, and chosen tenure.",
    },
    {
      id: 4,
      question:
        "How quickly can I get the business loan approved and disbursed?",
      answer:
        "Our AI-powered system provides instant pre-approval within 10 minutes of application. After document verification and final approval, funds are disbursed directly to your business account within 72 hours (3 working days).",
    },
    {
      id: 5,
      question: "What documents are required for a business loan application?",
      answer:
        "Essential documents include: Aadhaar card, PAN card (personal & business), GST registration and returns, last 2 years of ITR, business registration certificate, address proof, and 6 months of bank statements. All documents can be uploaded digitally.",
    },
    {
      id: 6,
      question: "Do I need collateral or a guarantor for a business loan?",
      answer:
        "No, our business loans up to ₹50 lakhs are completely unsecured and don't require any collateral, security, or guarantor. For higher amounts, we may request additional documentation or a co-applicant based on your profile.",
    },
    {
      id: 7,
      question: "What if my business is new, or I don't have GST registration?",
      answer:
        "For businesses under 1 year or without GST registration, we evaluate applications based on alternative criteria like bank statements, ITR, business licenses, and cash flow patterns. However, having GST registration significantly improves your approval chances.",
    },
    {
      id: 8,
      question: "How is my business loan eligibility calculated?",
      answer:
        "Eligibility is determined by factors including your business vintage, annual turnover, credit score, existing EMIs, cash flow stability, and business type. Generally, you can get 15-20 times your monthly business income as a loan amount, subject to maximum limits.",
    },
  ],
  "personal-loan": [
    {
      id: 1,
      question: "What is a personal loan?",
      answer:
        "A personal loan is an unsecured credit facility that provides you with a lump sum amount for any personal financial need without requiring collateral. Unlike specific-purpose loans (like home or car loans), personal loans offer complete flexibility in usage - whether for medical emergencies, wedding expenses, debt consolidation, home renovation, travel, or education. You receive the entire loan amount upfront and repay it through fixed monthly installments (EMIs) over a predetermined tenure of 1-7 years.",
    },
    {
      id: 2,
      question: "What is the minimum salary required for a personal loan?",
      answer:
        "The minimum salary requirement is ₹12,000 per month for salaried employees. Higher salaries (₹25,000+) typically qualify for better interest rates and higher loan amounts. Self-employed individuals need a minimum annual income of ₹2 lakhs with proper ITR documentation.",
    },
    {
      id: 3,
      question: "How quickly can I get a personal loan approved?",
      answer:
        "With Infinz, you can get instant approval within 5 to 8 minutes of completing your application. Our AI-powered system provides real-time decisions based on your credit profile. After approval, fund disbursal typically happens within 24 hours on business days, provided all documents are verified. The entire process usually takes 1-3 working days.",
    },
    {
      id: 4,
      question: "Can I prepay my personal loan without penalty?",
      answer:
        "Yes, most of our lending partners allow prepayment without penalty charges after completing 6-12 EMI payments. You can make partial prepayments to reduce your outstanding principal or foreclose the entire loan early.",
    },
    {
      id: 5,
      question: "What factors affect my personal loan interest rate terms?",
      answer:
        "Your interest rate depends on several factors: credit score, monthly income and employment stability, existing debt obligations, loan amount and tenure, relationship with the lender, and market conditions.",
    },
    {
      id: 6,
      question: "Do I need to provide collateral or a guarantor?",
      answer:
        "No, personal loans from Infinz are completely unsecured. Guarantors are not mandatory for most loan applications.",
    },
    {
      id: 7,
      question: "Can I apply for a personal loan with a low credit score?",
      answer:
        "Yes, you can apply with a credit score as low as 650, though options may be limited with higher interest rates. Scores below 650 might require a co-applicant or guarantor.",
    },
    {
      id: 8,
      question: "How much personal loan amount can I get based on my salary?",
      answer:
        "Generally, you can get a personal loan of 10-15 times your monthly salary, depending on your credit profile and existing obligations.",
    },
  ],
  calculator: [
    {
      id: 1,
      question: "How reliable is the EMI calculator's estimate?",
      answer:
        "EMI calculators provide highly accurate estimates based on input data but may not reflect last-minute lender fees or minor variations in interest computation.",
    },
    {
      id: 2,
      question: "Are EMIs fixed throughout the loan tenure?",
      answer:
        "For fixed interest rate loans, EMIs remain consistent. However, for loans with floating rates, EMIs may vary based on interest rate changes over time.",
    },
    {
      id: 3,
      question: "Do EMI calculators account for additional taxes and charges?",
      answer:
        "Generally, the EMIs calculated represent principal and interest repayment only. Additional charges such as taxes, insurance, or processing fees are usually separate.",
    },
    {
      id: 4,
      question: "What should I consider while choosing a loan tenure?",
      answer:
        "Opt for a loan tenure that balances monthly affordability with minimizing total interest paid. Longer tenure lowers EMI but increases total interest; shorter tenure increases EMI but reduces interest cost.",
    },
    {
      id: 5,
      question: "What happens if I fail to make an EMI payment?",
      answer:
        "If you fail to make an EMI payment on time, it could result in penalties and charges. Moreover, missing an EMI payment can affect your credit score.",
    },
    {
      id: 6,
      question: "What is the EMI for a 5 lakh loan for 5 years?",
      answer:
        "To calculate the 5 lakh loan EMI for 5 years, use the formula:\n\nEMI = [P × R × (1+R)^N] / [(1+R)^N – 1]\n\nFor a ₹5 lakh loan at 12% annual interest over 5 years:\n\n• Principal Amount = ₹5,00,000\n• Monthly Interest Rate = 1% (12% ÷ 12 ÷ 100)\n• Loan Tenure = 60 months\n\nEMI: ₹11,122.22/month\n\n*Disclaimer: The EMI displayed is for illustrative purposes only. Actual amounts may vary based on the applicable interest rate, loan tenure, and terms set by the lender.*",
    },
  ],
};

// Intersection Observer hook
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

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { isInView, elementRef };
}

// FaqItem Component
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 overflow-hidden ${
        isOpen
          ? "border-teal-300 shadow-xl"
          : "border-gray-100 hover:border-teal-200"
      } ${isHovered ? "shadow-xl" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {faq.question}
        </h3>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-teal-200 rotate-180" : ""
          } ${isHovered ? "scale-110" : ""}`}
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-teal-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-teal-600" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Component
export default function Faq({ topic = "home" }: FaqProps) {
  const faqData = faqTopics[topic] || faqTopics["home"];
  const [openItem, setOpenItem] = useState<number>(faqData[0]?.id || 1);
  const { isInView, elementRef } = useInView(0.2);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? 0 : id)); // Only one open at a time
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={elementRef} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Frequently Asked Questions?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FAQ List */}
          <div
            className={`space-y-4 transform transition-all duration-1000 ${
              isInView
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={`transform transition-all duration-700 ${
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <FaqItem
                  faq={faq}
                  isOpen={openItem === faq.id}
                  onToggle={() => toggleItem(faq.id)}
                />
              </div>
            ))}
          </div>

          {/* Right Side Image */}
          <div className="hidden lg:flex justify-center items-center">
            <Image
              src="/book.jpg"
              alt="FAQ Illustration"
              width={500}
              height={500}
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
