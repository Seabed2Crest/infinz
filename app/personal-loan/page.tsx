"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PersonalLoanService,
  CreatePersonalLoanPayload,
} from "../services/data.service";
import LoanApplicationModal from "../components/LoanApplicationModal";
import Faq from "../components/Faq";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Percent,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";

// Personal Loan Hero Section
function PersonalLoanHero({ onOpenModal }: { onOpenModal: () => void }) {
  const router = useRouter();

  const [formData, setFormData] = useState<CreatePersonalLoanPayload>({
    loanPurpose: "",
    monthlyIncome: "",
    loanAmountRequired: "",
    emiTenure: "",
    mobileNumber: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async () => {
    // Validate form
    if (
      !formData.loanPurpose ||
      !formData.monthlyIncome ||
      !formData.loanAmountRequired ||
      !formData.emiTenure ||
      !formData.mobileNumber
    ) {
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await PersonalLoanService.createPersonalLoan(formData);

      // ✅ Check if API returned an _id to confirm success
      if (response && response._id) {
        alert("🎉 Personal loan request submitted successfully!");
        // Give a small delay so alert shows before redirect
        setTimeout(() => {
          router.push("/apply_now");
        }, 300);
      } else {
        console.error("Unexpected API response:", response);
        alert("Something went wrong while submitting your request.");
      }
    } catch (error) {
      console.error("❌ Error submitting loan:", error);
      alert("Something went wrong while submitting your loan request.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Personal Loans - From Application to Approval in{" "}
                <span className="text-teal-600">Minutes</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get instant approval on loans up to ₹50 lakhs with no hidden
                charges, flexible repayment options, and funds in your account
                within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Side - Lead Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Instant Personal Loan Quote
            </h3>

            <div className="space-y-4">
              {/* Loan Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Purpose
                </label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select Loan Purpose</option>
                  <option>Debt Consolidation</option>
                  <option>Home Renovation</option>
                  <option>Medical Expenses</option>
                  <option>Travel</option>
                  <option>Wedding</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income
                </label>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select Income Range</option>
                  <option>₹15K - ₹30K</option>
                  <option>₹30K - ₹50K</option>
                  <option>₹50K - ₹75K</option>
                  <option>₹75K - ₹1L</option>
                  <option>Above ₹1L</option>
                </select>
              </div>

              {/* Loan Amount Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount Required
                </label>
                <select
                  name="loanAmountRequired"
                  value={formData.loanAmountRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select Loan Amount</option>
                  <option>₹50K - ₹1L</option>
                  <option>₹1L - ₹2L</option>
                  <option>₹2L - ₹5L</option>
                  <option>₹5L - ₹10L</option>
                  <option>₹10L - ₹20L</option>
                  <option>Above ₹20L</option>
                </select>
              </div>

              {/* EMI Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMI Tenure
                </label>
                <select
                  name="emiTenure"
                  value={formData.emiTenure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select EMI Tenure</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>18 Months</option>
                  <option>24 Months</option>
                  <option>36 Months</option>
                  <option>48 Months</option>
                  <option>60 Months</option>
                </select>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Get Instant Loan"}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// EMI Calculator Section
function EMICalculator({ onOpenModal }: { onOpenModal: () => void }) {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const totalAmount = calculateEMI() * tenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Personal Loan Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your EMI instantly and plan your finances with our smart
            loan calculator. Adjust the loan amount, interest rate, and tenure
            to find the perfect repayment plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Controls */}
          <div className="space-y-8">
            {/* Loan Amount */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Loan Amount: ₹{loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="12000"
                max="10000000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹12K</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Interest Rate: {interestRate}% p.a.
              </label>
              <input
                type="range"
                min="9.99"
                max="28"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>9.99%</span>
                <span>28%</span>
              </div>
            </div>

            {/* EMI Tenure */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                EMI Tenure: {tenure} Months
              </label>
              <input
                type="range"
                min="12"
                max="84"
                step="6"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>12 Months</span>
                <span>84 Months</span>
              </div>
            </div>

            {/* Apply Now Button */}
            <Link
              href="/apply_now"
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
            >
              Apply Now
            </Link>
          </div>

          {/* Loan Breakdown */}
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

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Faster Approval",
      description:
        "Get instant approval within 2 minutes with our AI-powered credit assessment system and automated decision engine.",
    },
    {
      icon: FileText,
      title: "Zero Paperwork",
      description:
        "Complete your loan application digitally without physical documents. Upload and verify everything online in minutes.",
    },
    {
      icon: Percent,
      title: "Lower Interest Rate",
      description:
        "Enjoy competitive interest rates starting from 10.5% per annum based on your credit profile and relationship with us.",
    },
    {
      icon: Calendar,
      title: "Flexible Repayment",
      description:
        "Choose EMI tenure from 12 to 84 months with options for prepayment, part-payment, and EMI restructuring.",
    },
    {
      icon: TrendingUp,
      title: "Quick Disbursal",
      description:
        "Receive funds directly in your bank account within 24 hours of final approval and documentation completion.",
    },
    {
      icon: Shield,
      title: "No Collateral",
      description:
        "Unsecured loans with no need for guarantors, security deposits, or asset pledging. Your creditworthiness is enough.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Benefits of Personal Loan from Infinz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience next-generation lending with unmatched convenience,
            competitive rates, and customer-centric features designed for your
            financial needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Application Steps Section
function ApplicationSteps({ onOpenModal }: { onOpenModal: () => void }) {
  const steps = [
    {
      title: "Register Online",
      description:
        "Complete your profile with basic details and verify your mobile number",
    },
    {
      title: "Upload Documents",
      description: "Selfie, PAN Card, and Aadhaar Card",
    },
    {
      title: "Select Loan Amount",
      description: "Choose your desired loan amount and tenure",
    },
    {
      title: "Instant Approval",
      description: "Get approval within minutes based on your credit profile",
    },
    {
      title: "Quick Disbursement",
      description: "Receive funds in your bank account within 3 days",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How to Apply for a Personal Loan Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Simple 5-step digital process to get your personal loan approved and
            disbursed in just 3 days. No branch visits, no lengthy procedures.
          </p>
        </div>

        {/* Card Section */}
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl text-white"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative  translate-y-2">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl"></div>
                <img
                  src="/download.png"
                  alt="Application Process Illustration"
                  className="relative w-100 h-100 md:w-[30rem] md:h-[30rem] object-contain drop-shadow-2xl animate-float rounded-3xl"
                />
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Personal Loan
                </h3>
                <h4 className="text-3xl md:text-4xl font-bold text-accent text-orange-500">
                  Application Steps
                </h4>
              </div>

              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-1">
                        {step.title}
                      </h5>
                      <p className="text-white/80 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}

// Eligibility Criteria Section
function EligibilityCriteria({ onOpenModal }: { onOpenModal: () => void }) {
  const criteria = [
    { label: "Nationality", value: "Indian" },
    { label: "Age", value: "Minimum 21 years - 58 years" },
    { label: "Monthly Income", value: "Minimum Rs. 12000" },
    { label: "Occupation", value: "Salaried" },
    { label: "Credit Score", value: "650+" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Personal Loan Eligibility Criteria
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check if you meet our simple eligibility requirements for instant
            personal loan approval. Simple criteria designed to make funding
            accessible to more people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {criteria.map((criterion, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div className="text-sm font-medium text-gray-500 mb-2">
                {criterion.label}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {criterion.value}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/calculator">
            <button className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Check Your Eligibility
            </button>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <strong>Disclaimer:</strong> Personal loan eligibility criteria may
            differ from bank to bank
          </p>
        </div>
      </div>
    </section>
  );
}

// Documents Required Section
function DocumentsRequired() {
  const documents = [
    {
      name: "KYC Documents",
      description: "Aadhaar card & Selfie verification",
    },
    { name: "PAN Card", description: "Personal PAN card" },
    {
      name: "Address Proof",
      description: "Utility bill, rental agreement or passport",
    },
    {
      name: "Employment Proof",
      description: "Employee ID card or appointment letter",
    },
    {
      name: "Income Statement",
      description: "Last 3 months salary slips and bank statements",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Documents Required for Personal Loan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Minimal documentation with instant digital verification for
            hassle-free loan processing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {doc.name}
              </h3>
              <p className="text-gray-600 text-sm">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Loan Offers Section
function LoanOffersSection() {
  const lenders = [
    {
      name: "HDFC Bank",
      rate: "10.5%",
      amount: "₹40L",
      tenure: "7 years",
      rating: 4.8,
    },
    {
      name: "ICICI Bank",
      rate: "10.8%",
      amount: "₹35L",
      tenure: "6 years",
      rating: 4.7,
    },
    {
      name: "Bajaj Finserv",
      rate: "11.2%",
      amount: "₹30L",
      tenure: "5 years",
      rating: 4.6,
    },
    {
      name: "Kotak Mahindra",
      rate: "11.5%",
      amount: "₹25L",
      tenure: "5 years",
      rating: 4.5,
    },
    {
      name: "Axis Bank",
      rate: "11.8%",
      amount: "₹20L",
      tenure: "4 years",
      rating: 4.4,
    },
    {
      name: "Yes Bank",
      rate: "12.5%",
      amount: "₹15L",
      tenure: "3 years",
      rating: 4.3,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Personal Loan Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare personalized loan offers from 50+ top NBFCs and banks,
            sorted by your preferences.
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium">
            Lowest Interest Rate
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Max Loan Amount
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Min Loan Amount
          </button>
        </div>

        {/* Lender Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lenders.map((lender, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {lender.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-600">
                    {lender.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-gray-900">
                    {lender.rate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="font-semibold text-gray-900">
                    {lender.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Tenure</span>
                  <span className="font-semibold text-gray-900">
                    {lender.tenure}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const personalLoanFaq = [
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
      "The minimum salary requirement is ₹12,000 per month for salaried employees. However, higher salaries (₹25,000+) typically qualify for better interest rates and higher loan amounts. Self-employed individuals need a minimum annual income of ₹2 lakhs with proper ITR documentation. Your salary determines your loan eligibility, with most lenders offering 10-15 times your monthly salary as the maximum loan amount.",
  },
  {
    id: 3,
    question: "How quickly can I get a personal loan approved?",
    answer:
      "With Infinz, you can get instant approval within 5 to 8 minutes of completing your application. Our AI-powered system provides real-time decisions based on your credit profile. After approval, fund disbursal typically happens within 24 hours on business days, provided all documents are verified. The entire process from application to fund transfer usually takes 1-3 working days.",
  },
  {
    id: 4,
    question: "Can I prepay my personal loan without penalty?",
    answer:
      "Yes, most of our lending partners allow prepayment without penalty charges after completing 6-12 EMI payments. You can make partial prepayments to reduce your outstanding principal or foreclose the entire loan early. Prepayment helps save on interest costs and improves your credit score. Check your specific loan terms as some lenders may charge a minimal foreclosure fee of 2-4% of the outstanding amount.",
  },
  {
    id: 5,
    question: "What factors affect my personal loan interest rate terms?",
    answer:
      "Your interest rate depends on several factors: Credit score (higher scores get lower rates), monthly income and employment stability, existing debt obligations, loan amount and tenure, relationship with the lender, and current market conditions. Credit scores above 750 typically qualify for the best rates starting from 10.5%, while scores between 650 - 750 may get rates between 12 - 15% per annum.",
  },
  {
    id: 6,
    question: "Do I need to provide collateral or a guarantor?",
    answer:
      "No, personal loans from Infinz are completely unsecured, meaning you don't need to pledge any collateral like property, gold, or fixed deposits. Similarly, guarantors are not mandatory for most loan applications. Your loan approval is based on your creditworthiness, income stability, and repayment capacity rather than asset backing. However, for very high loan amounts (above ₹15 lakhs) or applicants with lower credit scores (below 650), some lenders might request a co-applicant or guarantor to strengthen the application and secure better terms.",
  },
  {
    id: 7,
    question: "Can I apply for a personal loan with a low credit score?",
    answer:
      "Yes, you can apply with a credit score as low as 650, though options may be limited with higher interest rates. Scores below 650 might require a co-applicant or guarantor. To improve approval chances with low scores: maintain stable employment, show regular income flow, keep existing EMIs manageable, and consider applying with a co-applicant who has a better credit profile.",
  },
  {
    id: 8,
    question: "How much personal loan amount can I get based on my salary?",
    answer:
      "Generally, you can get a personal loan of 10-15 times your monthly salary, depending on your credit profile and existing obligations. For example: ₹25,000 salary = ₹2.5-3.75 lakhs loan, ₹50,000 salary = ₹5-7.5 lakhs loan, ₹1 lakh salary = ₹10-15 lakhs loan. Your debt-to-income ratio should ideally not exceed 40-50%. Higher credit scores, stable employment, and lower existing EMIs can help you qualify for higher amounts. Use our eligibility calculator for personalized loan amount estimation.",
  },
];

// Main Personal Loan Page
export default function PersonalLoanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PersonalLoanHero onOpenModal={() => setIsModalOpen(true)} />
      <EMICalculator onOpenModal={() => setIsModalOpen(true)} />
      <FeaturesSection />
      <ApplicationSteps onOpenModal={() => setIsModalOpen(true)} />
      <EligibilityCriteria onOpenModal={() => setIsModalOpen(true)} />
      <DocumentsRequired />
      <LoanOffersSection />
      <Faq topic="personal-loan" />
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
