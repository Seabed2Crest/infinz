"use client";
import { useState } from "react";
import { BusinessService } from "../services/data.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import Faq from "../components/Faq";
import toast from "react-hot-toast";

function BusinessLoanHero() {
  const [businessType, setBusinessType] = useState("");
  const [turnover, setTurnover] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!businessType || !turnover || !loanAmount || !mobileNumber) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const payload = { businessType, turnover, loanAmount, mobileNumber };
      console.log("Payload:", payload);
      const response = await BusinessService.createBusiness(payload);
      console.log("Response:", response);

      toast.success("Business application submitted successfully!");

      // Redirect to apply_now page after successful API call
      router.push("/apply_now");
    } catch (error) {
      console.error("Error creating business:", error);
      toast.error("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fuel Your Business Growth with{" "}
                <span className="text-teal-600">Instant Business Loans</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get up to ₹1 crore business funding at competitive rates
                starting from 12% per annum. Quick approval, minimal
                documentation, and funds in your account within 5 days.
              </p>
            </div>
          </div>

          {/* Right Side - Lead Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Instant Loan
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Business Type</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Trading">Trading</option>
                  <option value="Services">Services</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Turnover
                </label>
                <select
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Turnover Range</option>
                  <option value="₹2L - ₹10L">₹2L - ₹10L</option>
                  <option value="₹10L - ₹50L">₹10L - ₹50L</option>
                  <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                  <option value="₹1Cr - ₹5Cr">₹1Cr - ₹5Cr</option>
                  <option value="Above ₹5Cr">Above ₹5Cr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount Required
                </label>
                <select
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Loan Amount</option>
                  <option value="₹1L - ₹5L">₹1L - ₹5L</option>
                  <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                  <option value="₹10L - ₹25L">₹10L - ₹25L</option>
                  <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                  <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numeric characters
                    if (/^\d*$/.test(value)) {
                      setMobileNumber(value);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Get Instant Quote"}
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
function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(15);
  const [tenure, setTenure] = useState(24);

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
            Business Loan Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your business financing smartly with our EMI calculator.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Controls */}
          <div className="space-y-8">
            {/* Loan Amount */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                min={50000}
                max={5000000}
                step={10000}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-40 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={50000}
                max={5000000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹50K</span>
                <span>₹50L</span>
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
                min={13}
                max={33}
                step={0.1}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-28 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={13}
                max={33}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>13%</span>
                <span>33%</span>
              </div>
            </div>

            {/* EMI Tenure */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                EMI Tenure (Months)
              </label>
              <input
                type="number"
                value={tenure}
                min={12}
                max={60}
                step={1}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={12}
                max={60}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>12 Months</span>
                <span>60 Months</span>
              </div>
            </div>

            {/* Apply Now Button - Centered in the middle column */}
            <div className="flex justify-center items-center">
              <Link
                href="/apply_now"
                className="bg-teal-600 text-white py-4 px-12 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Apply Now
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
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
        "Instant pre-approval in 10 minutes with AI-powered assessment",
    },
    {
      icon: FileText,
      title: "Zero Paperwork",
      description: "Complete digital process with minimal documentation",
    },
    {
      icon: Percent,
      title: "Lower Interest Rate",
      description: "Competitive rates from 12% p.a. based on your profile",
    },
    {
      icon: Calendar,
      title: "Flexible Repayment",
      description: "EMI tenure 12-84 months with prepayment options",
    },
    {
      icon: TrendingUp,
      title: "Quick Disbursal",
      description: "Funds in your account within 72 hours",
    },
    {
      icon: Shield,
      title: "No Collateral",
      description: "Unsecured loans up to ₹50 lakhs without a guarantor",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Benefits of Business Loan from Infinz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience hassle-free business financing designed for modern
            entrepreneurs. Our digital-first approach ensures you get the
            capital you need without traditional banking complexities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
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
      title: "Registered with Mobile Number",
      description: "Enter and verify your mobile number to sign up.",
    },
    {
      title: "Verify Personal Details",
      description:
        "Submit your basic information, such as name, date of birth, and PAN card.",
    },
    {
      title: "Enter Business Details",
      description:
        "Provide your yearly turnover and ITR details to assess your loan eligibility.",
    },
    {
      title: "Choose Desired Loan Amount & EMI Tenure",
      description:
        "Select how much you want to borrow and set a repayment period.",
    },
    {
      title: "Confirm Bank Details & Receive Loan Amount in 3 Days",
      description: "Add your bank account and get the approved loan credited.",
    },
  ];


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How to Apply for a Business Loan Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get business funding in 5 simple steps through our digital process.
            No branch visits, no lengthy procedures – just quick, secure, and
            transparent lending.
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
              <div className="relative translate-y-2">
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
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
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

                <div className="mt-5 text-center">
                  <Link
                    href="/apply_now"
                    className="inline-block bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Apply Now
                  </Link>
                </div>
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
function EligibilityCriteria() {
  const criteria = [
    { label: "Nationality", value: "Indian" },
    { label: "Age", value: "Minimum 23 years - 60 years" },
    { label: "Business Vintage", value: "Minimum 1 yr" },
    { label: "Business", value: "Registered & Licensed" },
    { label: "Yearly Turnover", value: "Minimum Rs. 200000" },
    { label: "Credit Score", value: "700+" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Business Loan Eligibility Criteria
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple eligibility requirements for instant business loan approval.
            Check if you qualify for instant pre-approval.
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

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <strong>Disclaimer:</strong> Business loan eligibility criteria may
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
    { name: "PAN Card", description: "Personal & Business PAN" },
    { name: "GST Document", description: "GST Registration & Returns" },
    { name: "ITR Document", description: "Last 2 years Income Tax Returns" },
    {
      name: "Business Documents",
      description: "Company registration & licenses",
    },
    { name: "Address Proof", description: "Company & Personal address proof" },
    {
      name: "Bank Statement",
      description: "6 months business bank statements",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Documents Required for Business Loan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple documentation process with digital upload facility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
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

// Lender Comparison Section
function LenderComparison() {
  const lendersData = [
    { name: "HDFC Bank", rate: 12.5, amount: 10000000, tenure: 7, rating: 4.8 },
    { name: "ICICI Bank", rate: 13.0, amount: 7500000, tenure: 5, rating: 4.7 },
    {
      name: "Bajaj Finserv",
      rate: 12.8,
      amount: 5000000,
      tenure: 4,
      rating: 4.6,
    },
    {
      name: "Kotak Mahindra",
      rate: 13.2,
      amount: 6000000,
      tenure: 6,
      rating: 4.5,
    },
    { name: "Axis Bank", rate: 13.5, amount: 8000000, tenure: 5, rating: 4.4 },
    { name: "Yes Bank", rate: 14.0, amount: 4000000, tenure: 3, rating: 4.3 },
  ];

  const [activeFilter, setActiveFilter] = useState("Lowest Interest Rate");
  const [lenders, setLenders] = useState(lendersData);

  const filters = [
    "Lowest Interest Rate",
    "Max Loan Amount",
    "Min Loan Amount",
  ];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    let sorted: typeof lendersData = [];

    if (filter === "Lowest Interest Rate") {
      sorted = [...lendersData].sort((a, b) => a.rate - b.rate);
    } else if (filter === "Max Loan Amount") {
      sorted = [...lendersData].sort((a, b) => b.amount - a.amount);
    } else if (filter === "Min Loan Amount") {
      sorted = [...lendersData].sort((a, b) => a.amount - b.amount);
    }

    setLenders(sorted);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Business Loan Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare business loan offers from 25+ top NBFCs and banks in India.
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? "bg-teal-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
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
                    {lender.rate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="font-semibold text-gray-900">
                    ₹{(lender.amount / 100000).toLocaleString()}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Tenure</span>
                  <span className="font-semibold text-gray-900">
                    {lender.tenure} years
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

// Main Business Loan Page
export default function BusinessLoanPage() {
  return (
    <>
      <BusinessLoanHero />
      <BusinessLoanCalculator />
      <FeaturesSection />
      <ApplicationSteps onOpenModal={() => {}} />
      <EligibilityCriteria />
      <DocumentsRequired />
      <LenderComparison />
      <Faq topic="business-loan" />
    </>
  );
}
