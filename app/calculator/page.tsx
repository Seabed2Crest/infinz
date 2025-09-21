'use client';

import { useState } from "react";
import LoanApplicationModal from "../components/LoanApplicationModal";
import { 
  Calculator, 
  Clock, 
  Percent, 
  CreditCard,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Info
} from "lucide-react";

// EMI Calculator Component
function EMICalculator({ onOpenModal }: { onOpenModal: () => void }) {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(15);
  const [tenure, setTenure] = useState(24);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const totalAmount = calculateEMI() * tenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-teal-600">EMI Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your business financing smartly with our EMI calculator. Adjust the loan amount, 
            interest rate, and tenure to find the perfect repayment plan that suits you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Controls */}
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Loan Amount: ₹{loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹1L</span>
                <span>₹5Cr</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Interest Rate: {interestRate}% p.a.
              </label>
              <input
                type="range"
                min="15"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                EMI Tenure: {tenure} months ({Math.round(tenure/12)} years)
              </label>
              <input
                type="range"
                min="12"
                max="48"
                step="6"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 Year</span>
                <span>4 Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenModal}
                className="flex-1 bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() => {/* Navigate to credit score page */}}
                className="flex-1 border-2 border-teal-600 text-teal-600 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-colors inline-flex items-center justify-center"
              >
                Check Credit Score
              </button>
            </div>
          </div>

          {/* Amount Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Loan Breakdown
            </h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  ₹{calculateEMI().toLocaleString()}
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

// Additional Calculator Features
function AdditionalCalculators() {
  const calculators = [
    {
      icon: Calculator,
      title: "Personal Loan EMI Calculator",
      description: "Calculate EMI for personal loans with flexible tenure options",
      color: "teal"
    },
    {
      icon: TrendingUp,
      title: "Business Growth Calculator",
      description: "Plan your business expansion with growth projections",
      color: "blue"
    },
    {
      icon: Percent,
      title: "Interest Rate Calculator",
      description: "Compare interest rates across different loan products",
      color: "green"
    },
    {
      icon: CreditCard,
      title: "Credit Score Impact Calculator",
      description: "See how your credit score affects loan eligibility",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            More Financial Calculators
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of financial calculators to make informed decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calc, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group">
              <div className={`w-12 h-12 bg-${calc.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <calc.icon className={`h-6 w-6 text-${calc.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {calc.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {calc.description}
              </p>
            </div>
          ))}
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
      description: "Get precise EMI calculations with our advanced algorithms"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Real-time calculations as you adjust loan parameters"
    },
    {
      icon: Info,
      title: "Detailed Breakdown",
      description: "Comprehensive loan breakdown with all financial details"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Use Our Calculator?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our EMI calculator helps you make informed financial decisions with accurate calculations
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
              <p className="text-gray-600">
                {benefit.description}
              </p>
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
      <AdditionalCalculators />
      <CalculatorBenefits />
      
      <LoanApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
