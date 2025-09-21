'use client';

import { useState } from "react";
import LoanApplicationModal from "../components/LoanApplicationModal";
import Faq from "../components/Faq";
import { 
  Calculator, 
  Clock, 
  FileText, 
  Percent, 
  Calendar, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Building2,
  CreditCard,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Business Loan Hero Section
function BusinessLoanHero({ onOpenModal }: { onOpenModal: () => void }) {
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
                Get up to ₹1 crore business funding at competitive rates starting from 12% per annum. 
                Quick approval, minimal documentation, and funds in your account within 5 days.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                  maxLength={10}
                />
                <button
                  onClick={onOpenModal}
                  className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>No Hidden Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Quick Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Minimal Documentation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Lead Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Instant Business Loan Quote
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Business Type</option>
                  <option>Manufacturing</option>
                  <option>Trading</option>
                  <option>Services</option>
                  <option>Retail</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Turnover</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Turnover Range</option>
                  <option>₹2L - ₹10L</option>
                  <option>₹10L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>₹1Cr - ₹5Cr</option>
                  <option>Above ₹5Cr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount Required</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Loan Amount</option>
                  <option>₹1L - ₹5L</option>
                  <option>₹5L - ₹10L</option>
                  <option>₹10L - ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  maxLength={10}
                />
              </div>

              <button
                onClick={onOpenModal}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Get Instant Quote
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Business Loan Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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

            <button
              onClick={onOpenModal}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Apply Now
            </button>

            <button
              onClick={() => window.open('/calculator', '_self')}
              className="w-full border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
            >
              Advanced Calculator
            </button>
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

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Faster Approval",
      description: "Instant pre-approval in 10 minutes with AI-powered assessment"
    },
    {
      icon: FileText,
      title: "Zero Paperwork",
      description: "Complete digital process with minimal documentation"
    },
    {
      icon: Percent,
      title: "Lower Interest Rate",
      description: "Competitive rates from 12% p.a. based on your profile"
    },
    {
      icon: Calendar,
      title: "Flexible Repayment",
      description: "EMI tenure 12-84 months with prepayment options"
    },
    {
      icon: TrendingUp,
      title: "Quick Disbursal",
      description: "Funds in your account within 72 hours"
    },
    {
      icon: Shield,
      title: "No Collateral",
      description: "Unsecured loans up to ₹50 lakhs without a guarantor"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Benefits of Business Loan from Infinz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience hassle-free business financing designed for modern entrepreneurs. 
            Our digital-first approach ensures you get the capital you need without traditional banking complexities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
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
      number: "01",
      title: "Register with mobile number",
      description: "Start your application with a simple mobile number verification"
    },
    {
      number: "02", 
      title: "Verify personal details",
      description: "Complete your personal information and KYC verification"
    },
    {
      number: "03",
      title: "Enter business details",
      description: "Provide your business information and financial details"
    },
    {
      number: "04",
      title: "Choose loan amount and tenure",
      description: "Select your desired loan amount and EMI repayment period"
    },
    {
      number: "05",
      title: "Confirm bank details & receive funds",
      description: "Verify bank account and receive loan amount in 3 days"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Apply for a Business Loan Online
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get business funding in 5 simple steps through our digital process. 
            No branch visits, no lengthy procedures - just quick, secure, and transparent lending.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="pt-6">
              <button
                onClick={onOpenModal}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center">
              <Building2 className="h-32 w-32 text-teal-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Digital Application Process
              </h3>
              <p className="text-gray-600">
                Complete your business loan application entirely online with our 
                secure and user-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Eligibility Criteria Section
function EligibilityCriteria({ onOpenModal }: { onOpenModal: () => void }) {
  const criteria = [
    { label: "Nationality", value: "Indian" },
    { label: "Age", value: "Minimum 23 years - 60 years" },
    { label: "Business Vintage", value: "Minimum 1 yr" },
    { label: "Business", value: "Registered & Licensed" },
    { label: "Yearly Turnover", value: "Minimum Rs. 200000" },
    { label: "Credit Score", value: "700+" }
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
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
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
          <button
            onClick={onOpenModal}
            className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Check Your Eligibility
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <strong>Disclaimer:</strong> Business loan eligibility criteria may differ from bank to bank
          </p>
        </div>
      </div>
    </section>
  );
}

// Documents Required Section
function DocumentsRequired() {
  const documents = [
    { name: "KYC Documents", description: "Aadhaar card & Selfie verification" },
    { name: "PAN Card", description: "Personal & Business PAN" },
    { name: "GST Document", description: "GST Registration & Returns" },
    { name: "ITR Document", description: "Last 2 years Income Tax Returns" },
    { name: "Business Documents", description: "Company registration & licenses" },
    { name: "Address Proof", description: "Company & Personal address proof" },
    { name: "Bank Statement", description: "6 months business bank statements" }
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
            Keep these documents ready for quick loan processing and faster approval.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {doc.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {doc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lender Comparison Section
function LenderComparison() {
  const lenders = [
    { name: "HDFC Bank", rate: "12.5%", amount: "₹1Cr", tenure: "7 years", rating: 4.8 },
    { name: "ICICI Bank", rate: "13.0%", amount: "₹75L", tenure: "5 years", rating: 4.7 },
    { name: "Bajaj Finserv", rate: "12.8%", amount: "₹50L", tenure: "4 years", rating: 4.6 },
    { name: "Kotak Mahindra", rate: "13.2%", amount: "₹60L", tenure: "6 years", rating: 4.5 },
    { name: "Axis Bank", rate: "13.5%", amount: "₹80L", tenure: "5 years", rating: 4.4 },
    { name: "Yes Bank", rate: "14.0%", amount: "₹40L", tenure: "3 years", rating: 4.3 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Business Loan Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare business loan offers from 25+ top NBFCs and banks in India. 
            Find the perfect match for your business needs with transparent rates and terms.
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
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
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
                  <span className="font-semibold text-gray-900">{lender.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="font-semibold text-gray-900">{lender.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Tenure</span>
                  <span className="font-semibold text-gray-900">{lender.tenure}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Main Business Loan Page
export default function BusinessLoanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BusinessLoanHero onOpenModal={() => setIsModalOpen(true)} />
      <EMICalculator onOpenModal={() => setIsModalOpen(true)} />
      <FeaturesSection />
      <ApplicationSteps onOpenModal={() => setIsModalOpen(true)} />
      <EligibilityCriteria onOpenModal={() => setIsModalOpen(true)} />
      <DocumentsRequired />
      <LenderComparison />
      <Faq onOpenModal={() => setIsModalOpen(true)} />
      
      <LoanApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
    