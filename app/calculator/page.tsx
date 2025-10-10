"use client";

import { useState } from "react";
import LoanApplicationModal from "../components/LoanApplicationModal";
import { ArrowRight, CheckCircle, Clock, Info } from "lucide-react";
import Link from "next/link";

// EMI Calculator Component with Tabs
function EMICalculator({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal"
  );

  // Personal Loan State
  const [personalLoanAmount, setPersonalLoanAmount] = useState(12000);
  const [personalInterestRate, setPersonalInterestRate] = useState(9.99);
  const [personalTenure, setPersonalTenure] = useState(12);

  // Business Loan State
  const [businessLoanAmount, setBusinessLoanAmount] = useState(50000);
  const [businessInterestRate, setBusinessInterestRate] = useState(13);
  const [businessTenure, setBusinessTenure] = useState(12);

  // Tab-specific setter helpers
  const setLoanAmount = (val: number) =>
    activeTab === "personal"
      ? setPersonalLoanAmount(val)
      : setBusinessLoanAmount(val);
  const setInterestRate = (val: number) =>
    activeTab === "personal"
      ? setPersonalInterestRate(val)
      : setBusinessInterestRate(val);
  const setTenure = (val: number) =>
    activeTab === "personal" ? setPersonalTenure(val) : setBusinessTenure(val);

  // EMI Calculation
  const calculateEMI = (amount: number, rate: number, tenureMonths: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  };

  // Current values based on active tab
  const loanAmount =
    activeTab === "personal" ? personalLoanAmount : businessLoanAmount;
  const interestRate =
    activeTab === "personal" ? personalInterestRate : businessInterestRate;
  const tenure = activeTab === "personal" ? personalTenure : businessTenure;

  const totalEMI = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = totalEMI * tenure;
  const totalInterest = totalAmount - loanAmount;

  // Tab-specific slider parameters
  const params =
    activeTab === "personal"
      ? {
          minAmount: 12000,
          maxAmount: 10000000,
          minRate: 9.99,
          maxRate: 28,
          minTenure: 12,
          maxTenure: 84,
        }
      : {
          minAmount: 50000,
          maxAmount: 5000000,
          minRate: 13,
          maxRate: 33,
          minTenure: 12,
          maxTenure: 60,
        };

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-teal-600">EMI Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the total repayment and EMI amount and plan your finances
            smartly with the EMI calculator.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === "personal"
                  ? "bg-teal-600 text-white"
                  : "text-gray-700 hover:bg-teal-100"
              }`}
            >
              Personal Loan
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-3 font-semibold transition-all duration-200 ${
                activeTab === "business"
                  ? "bg-teal-600 text-white"
                  : "text-gray-700 hover:bg-teal-100"
              }`}
            >
              Business Loan
            </button>
          </div>
        </div>

        {/* Calculator */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-8">
            {/* Loan Amount */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Loan Amount: ₹{loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min={params.minAmount}
                max={params.maxAmount}
                step={1000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹{params.minAmount.toLocaleString()}</span>
                <span>₹{params.maxAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Interest Rate: {interestRate}% p.a.
              </label>
              <input
                type="range"
                min={params.minRate}
                max={params.maxRate}
                step={0.01}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{params.minRate}%</span>
                <span>{params.maxRate}%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                EMI Tenure: {tenure} Months
              </label>
              <input
                type="range"
                min={params.minTenure}
                max={params.maxTenure}
                step={6}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{params.minTenure} Months</span>
                <span>{params.maxTenure} Months</span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply_now"
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Loan Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Loan Breakdown
            </h3>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  ₹{totalEMI.toLocaleString()}
                </div>
                <div className="text-gray-600">Monthly EMI</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{totalInterest.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Interest</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{loanAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Principal Amount</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {interestRate}%
                  </div>
                  <div className="text-sm text-gray-600">Interest Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function CalculatorBenefits() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Accurate Calculations",
      description: "Get precise EMI calculations with our advanced algorithms",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Real-time calculations as you adjust loan parameters",
    },
    {
      icon: Info,
      title: "Detailed Breakdown",
      description: "Comprehensive loan breakdown with all financial details",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Use Our Calculator?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our EMI calculator helps you make informed financial decisions with
            accurate calculations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Calculator Page
export default function CalculatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EMICalculator onOpenModal={() => setIsModalOpen(true)} />
      <CalculatorBenefits />
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
