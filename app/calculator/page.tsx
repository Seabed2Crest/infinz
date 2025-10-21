"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  User,
  Briefcase,
  Info,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Percent,
  Calendar,
  Shield,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Faq from "../components/Faq";

// Loan Eligibility Calculator Component
function LoanEligibilityCalculator({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal"
  );

  // Personal Loan Eligibility State
  const [personalMonthlyIncome, setPersonalMonthlyIncome] = useState(25000);
  const [personalMonthlyExpense, setPersonalMonthlyExpense] = useState(15000);
  const [personalCreditScore, setPersonalCreditScore] = useState(750);

  // Business Loan Eligibility State
  const [businessYearlyTurnover, setBusinessYearlyTurnover] = useState(1000000);
  const [businessMonthlyRevenue, setBusinessMonthlyRevenue] = useState(200000);
  const [businessCreditScore, setBusinessCreditScore] = useState(700);

  // Eligibility Calculation
  const calculatePersonalLoanEligibility = () => {
    const disposableIncome = personalMonthlyIncome - personalMonthlyExpense;
    const eligibilityFactor =
      personalCreditScore >= 750 ? 0.6 : personalCreditScore >= 650 ? 0.4 : 0.2;
    const eligibleAmount = Math.min(
      disposableIncome * 12 * eligibilityFactor,
      5000000
    );
    return Math.max(12000, Math.round(eligibleAmount / 10000) * 10000);
  };

  const calculateBusinessLoanEligibility = () => {
    const revenueFactor = businessMonthlyRevenue / 50000;
    const creditFactor =
      businessCreditScore >= 700 ? 0.8 : businessCreditScore >= 600 ? 0.5 : 0.3;
    const eligibleAmount = Math.min(
      businessYearlyTurnover * 0.5 * creditFactor,
      5000000
    );
    return Math.max(50000, Math.round(eligibleAmount / 10000) * 10000);
  };

  // EMI Calculation for eligible amount
  const calculateEMI = (amount: number, tenure: number) => {
    const interestRate = activeTab === "personal" ? 12 : 15; // Sample interest rates
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  // Current values based on active tab
  const eligibleAmount =
    activeTab === "personal"
      ? calculatePersonalLoanEligibility()
      : calculateBusinessLoanEligibility();

  const suggestedTenure = activeTab === "personal" ? 24 : 18;
  const emiAmount = calculateEMI(eligibleAmount, suggestedTenure);

  return (
    <section
      id="eligibility-calculator"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Eligibility Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check if you qualify for a loan and discover your eligible amount
            instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Tabs */}
            <div className="flex mb-8">
              <div className="inline-flex bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
                    activeTab === "personal"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Personal Loan
                </button>
                <button
                  onClick={() => setActiveTab("business")}
                  className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
                    activeTab === "business"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Business Loan
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              {activeTab === "personal" ? (
                <>
                  {/* Monthly Income */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Monthly Income: ₹{personalMonthlyIncome.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={15000}
                      max={500000}
                      step={5000}
                      value={personalMonthlyIncome}
                      onChange={(e) =>
                        setPersonalMonthlyIncome(Number(e.target.value))
                      }
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹15K</span>
                      <span>₹5L</span>
                    </div>
                  </div>

                  {/* Monthly Expense */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Monthly Expense: ₹
                      {personalMonthlyExpense.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={5000}
                      value={personalMonthlyExpense}
                      onChange={(e) =>
                        setPersonalMonthlyExpense(Number(e.target.value))
                      }
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹0</span>
                      <span>₹1L</span>
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Credit Score: {personalCreditScore}
                    </label>
                    <input
                      type="range"
                      min={300}
                      max={900}
                      step={10}
                      value={personalCreditScore}
                      onChange={(e) =>
                        setPersonalCreditScore(Number(e.target.value))
                      }
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>300</span>
                      <span>900</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Yearly Turnover */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Yearly Turnover: ₹
                      {businessYearlyTurnover.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={200000} // 2 Lakh
                      max={50000000} // 5 Crore
                      step={100000} // 1 Lakh step
                      value={businessYearlyTurnover}
                      onChange={(e) =>
                        setBusinessYearlyTurnover(Number(e.target.value))
                      }
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹2L</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Monthly Revenue: ₹
                      {businessMonthlyRevenue.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={50000}
                      max={40000000}
                      step={50000}
                      value={businessMonthlyRevenue}
                      onChange={(e) =>
                        setBusinessMonthlyRevenue(Number(e.target.value))
                      }
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹50K</span>
                      <span>₹4Cr</span>
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Credit Score: {businessCreditScore}
                    </label>
                    <input
                      type="range"
                      min={300}
                      max={900}
                      step={10}
                      value={businessCreditScore}
                      onChange={(e) =>
                        setBusinessCreditScore(Number(e.target.value))
                      }
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>300</span>
                      <span>900</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <Calculator className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Eligibility Results</h3>
              <p className="text-blue-100">Based on your financial profile</p>
            </div>

            <div className="space-y-6">
              {/* Eligible Amount */}
              <div className="text-center">
                <p className="text-blue-200 mb-2">
                  You are eligible for a loan of up to
                </p>
                <div className="text-4xl font-bold mb-2">
                  ₹{eligibleAmount.toLocaleString()}
                </div>
              </div>

              {/* Tenure & EMI */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-sm text-blue-200 mb-1">Tenure</div>
                  <div className="text-xl font-bold">
                    {suggestedTenure} Months
                  </div>
                </div>
                <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                  <div className="text-sm text-blue-200 mb-1">EMI Amount</div>
                  <div className="text-xl font-bold">
                    ₹{emiAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <Link
                href="/apply_now"
                className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Apply for Loan
              </Link>

              {/* Additional Info */}
              <div className="text-center text-sm text-blue-200">
                <p>
                  This is an estimated eligibility. Final approval subject to
                  document verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// EMI Calculator Component with Tabs
function EMICalculator({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal"
  );

  // Personal Loan State
  const [personalLoanAmount, setPersonalLoanAmount] = useState(500000);
  const [personalInterestRate, setPersonalInterestRate] = useState(10.5);
  const [personalTenure, setPersonalTenure] = useState(36);

  // Business Loan State
  const [businessLoanAmount, setBusinessLoanAmount] = useState(500000);
  const [businessInterestRate, setBusinessInterestRate] = useState(13);
  const [businessTenure, setBusinessTenure] = useState(24);

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
    <section
      id="emi-calculator"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-blue-600">EMI Calculator</span>
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
              className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "personal"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <User className="h-4 w-4" />
              Personal Loan
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "business"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <Briefcase className="h-4 w-4" />
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
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                min={params.minAmount}
                max={params.maxAmount}
                step={1000}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-48 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={params.minAmount}
                max={params.maxAmount}
                step={1000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹{params.minAmount.toLocaleString()}</span>
                <span>₹{params.maxAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                min={params.minRate}
                max={params.maxRate}
                step={0.1}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-32 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={params.minRate}
                max={params.maxRate}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{params.minRate}%</span>
                <span>{params.maxRate}%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                EMI Tenure (Months)
              </label>
              <input
                type="number"
                value={tenure}
                min={params.minTenure}
                max={params.maxTenure}
                step={1}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-28 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={params.minTenure}
                max={params.maxTenure}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{params.minTenure} Months</span>
                <span>{params.maxTenure} Months</span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center items-center">
              <Link
                href="/apply_now"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
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
                <div className="text-4xl font-bold text-blue-600 mb-2">
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

// Information Section for Eligibility Calculator
function EligibilityCalculatorInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is an Eligibility Calculator?
            </h2>
            <p className="text-gray-600 mb-6">
              An eligibility calculator is an online tool that helps individuals
              and businesses assess their qualification for a loan before
              applying. By entering key financial details such as income,
              employment history, existing debts, business turnover, or loan
              tenure, users can estimate the amount they are likely to be
              eligible to borrow.
            </p>
            <p className="text-gray-600 mb-8">
              This quick and convenient assessment helps borrowers plan
              effectively, avoid rejections, and choose suitable loan options
              with confidence. Eligibility calculators for personal or business
              loans also highlight benefits like competitive interest rates,
              flexible loan amounts, and seamless processing, enabling better
              financial decision-making.
            </p>
          </div>

          {/* Right Content - Eligibility Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Why Use an Eligibility Calculator?
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Financial Clarity
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Understand exactly how much you can borrow — before
                    applying.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Personalized Insights
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Tailored eligibility results based on your income and credit
                    score.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Business Evaluation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Get business loan insights based on turnover and monthly
                    revenue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Instant Results
                  </h4>
                  <p className="text-gray-600 text-sm">
                    No waiting, no paperwork — see your eligibility within
                    seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white border border-gray-100 rounded-xl">
              <p className="text-gray-700 text-sm leading-relaxed">
                💡 <span className="font-semibold">Pro Tip:</span> Knowing your
                eligibility beforehand boosts your approval chances and helps
                you apply smarter.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// Benefits Section for EMI Calculator
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
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="h-8 w-8 text-blue-600" />
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

// Info Section Component for EMI Calculator
function EMICalculatorInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What is an EMI Calculator?
        </h2>
        <p className="text-gray-600 mb-8">
          An EMI (Equated Monthly Installment) calculator is a digital tool that
          helps you estimate your monthly loan repayments. By inputting the loan
          amount, interest rate, and tenure, it calculates the fixed monthly
          payment required to repay a loan within a specified tenure, making
          loan planning easier and more transparent. This tool simplifies
          financial planning by providing quick and accurate EMI values without
          manual calculations.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How to Calculate EMI?
        </h2>
        <p className="text-gray-600 mb-8">
          An EMI calculator enables you to calculate the EMI by entering the
          loan amount, tenure, and rate of interest. Here are the steps to
          calculate EMI using an EMI calculator:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
          <li>
            <b> Enter the Loan Amount: </b>Specify the principal amount you
            intend to borrow.
          </li>
          <li>
            <b>Input the Interest Rate:</b> Provide the annual interest rate
            offered by the lender.
          </li>
          <li>
            <b> Select the Loan Tenure:</b> Specify the loan tenure (duration)
            in months.
          </li>
          <li>
            <b> Calculate:</b> Click the calculate button to instantly get your
            monthly EMI amount.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Formula for EMI Calculation
        </h2>
        <p className="text-gray-600 mb-4">
          The EMI is determined using a widely accepted mathematical formula
          that accounts for loan principal, interest rate, and tenure:
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 overflow-x-auto">
          EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
        </pre>
        <p className="text-gray-600 mb-8">
          Where:
          <br />P = Principal loan amount
          <br />R = Monthly interest rate (annual rate divided by 12 and
          converted to decimal)
          <br />N = Number of monthly installments (loan tenure in months)
        </p>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Benefits of EMI Calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
          <li>
            <b>Instant Calculations:</b> Provides quick and accurate EMI figures
            in real time, eliminating manual errors.
          </li>
          <li>
            <b>Effective Budget Planning:</b> Helps borrowers manage monthly
            cash flows effectively.
          </li>
          <li>
            <b>Loan Comparison:</b> Enables comparison of loans with different
            rates, tenures, and amounts.
          </li>
          <li>
            <b>Improved Decision-Making:</b> Visualizes financial impact for
            informed choices.
          </li>
          <li>
            <b>Transparency on Costs: </b>Breaks down repayment into principal
            and interest over time.
          </li>
          <li>
            <b>Flexibility to Experiment:</b> Modify inputs to see how EMI
            changes with rate or tenure adjustments.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Factors to Consider While Calculating EMIs
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <b>Loan Amount:</b> Higher loans increase EMI and total repayment.
          </li>
          <li>
            <b>Interest Rate:</b> Fixed or floating rates impact monthly and
            total payments.
          </li>
          <li>
            <b> Loan Tenure: </b>Longer tenure lowers monthly EMI but increases
            total interest.
          </li>
          <li>
            <b>Processing Fees:</b> Some lenders add fees upfront or include
            them in EMI.
          </li>
          <li>
            <b>Prepayment:</b> Early repayment can reduce principal and
            interest.
          </li>
          <li>
            <b>Repayment Schedule: </b> Monthly or quarterly affects cash flow
            planning.
          </li>
          <li>
            <b>Lender's Policies:</b> Interest compounding, penalties, and
            schedules vary.
          </li>
          <li>
            <b>Credit Score:</b> Better credit scores may secure lower interest
            rates.
          </li>
        </ul>
      </div>
    </section>
  );
}

// Navigation CTA Section
function CalculatorNavigation() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Choose Your Calculator
        </h3>
        <p className="text-blue-100 mb-8">
          Use our specialized calculators to plan your loan journey
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#eligibility-calculator"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Check Eligibility
          </a>
          <a
            href="#emi-calculator"
            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-400 transition-all duration-200 shadow-lg border border-blue-400"
          >
            Calculate EMI
          </a>
        </div>
      </div>
    </section>
  );
}

// Main Calculator Page Component
export default function CalculatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <CalculatorNavigation /> */}

      <EMICalculator onOpenModal={() => setIsModalOpen(true)} />
      <LoanEligibilityCalculator onOpenModal={() => setIsModalOpen(true)} />
      <EligibilityCalculatorInfo />
      <CalculatorBenefits />
      <EMICalculatorInfo />
      <Faq topic="calculator" />
    </>
  );
}
