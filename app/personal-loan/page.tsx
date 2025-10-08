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
  User,
  CreditCard,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Home,
  Car,
  Heart
} from "lucide-react";

// Personal Loan Hero Section
function PersonalLoanHero({ onOpenModal }: { onOpenModal: () => void }) {
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
                Get instant approval on loans up to ₹50 lakhs with competitive interest rates starting from 10.49% per annum. 
                No hidden charges, flexible repayment options, and funds in your account within 24 hours.
              </p>
            </div>

            {/* CTA Section */}
            {/* <div className="space-y-6">
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
                  Apply Now1
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
                  <span>Instant Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Minimal Documentation</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Lead Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Instant Personal Loan Quote
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>Select Loan Purpose</option>
                  <option>Debt Consolidation</option>
                  <option>Home Renovation</option>
                  <option>Medical Expenses</option>
                  <option>Travel</option>
                  <option>Wedding</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>Select Income Range</option>
                  <option>₹15K - ₹30K</option>
                  <option>₹30K - ₹50K</option>
                  <option>₹50K - ₹75K</option>
                  <option>₹75K - ₹1L</option>
                  <option>Above ₹1L</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount Required</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>Select Loan Amount</option>
                  <option>₹50K - ₹1L</option>
                  <option>₹1L - ₹2L</option>
                  <option>₹2L - ₹5L</option>
                  <option>₹5L - ₹10L</option>
                  <option>₹10L - ₹20L</option>
                  <option>Above ₹20L</option>
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
                Get Instant Loan
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
            Personal Loan Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your EMI instantly and plan your finances with our smart loan calculator.
            Adjust the loan amount, interest rate, and tenure to find the perfect repayment plan.
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
                min="50000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹50K</span>
                <span>₹50L</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Interest Rate: {interestRate}% p.a.
              </label>
              <input
                type="range"
                min="10.5"
                max="18"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>10.5%</span>
                <span>18%</span>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                EMI Tenure: {tenure} months ({Math.round(tenure/12)} years)
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
                <span>1 Year</span>
                <span>7 Years</span>
              </div>
            </div>

            <button
              onClick={onOpenModal}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Apply Now
            </button>

            <button
              onClick={() => {/* Navigate to credit score page */}}
              className="w-full border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Check Credit Score
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
      description: "Get instant approval within 2 minutes with our AI-powered credit assessment system and automated decision engine."
    },
    {
      icon: FileText,
      title: "Zero Paperwork",
      description: "Complete your loan application digitally without physical documents. Upload and verify everything online in minutes."
    },
    {
      icon: Percent,
      title: "Lower Interest Rate",
      description: "Enjoy competitive interest rates starting from 10.5% per annum based on your credit profile and relationship with us."
    },
    {
      icon: Calendar,
      title: "Flexible Repayment",
      description: "Choose EMI tenure from 12 to 84 months with options for prepayment, part-payment, and EMI restructuring."
    },
    {
      icon: TrendingUp,
      title: "Quick Disbursal",
      description: "Receive funds directly in your bank account within 24 hours of final approval and documentation completion."
    },
    {
      icon: Shield,
      title: "No Collateral",
      description: "Unsecured loans with no need for guarantors, security deposits, or asset pledging. Your creditworthiness is enough."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Features & Benefits of Personal Loan from Infinz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience next-generation lending with unmatched convenience, competitive rates, 
            and customer-centric features designed for your financial needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
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
      title: "Enter employment details",
      description: "Provide your employment information and income details"
    },
    {
      number: "04",
      title: "Choose loan amount and tenure",
      description: "Select your desired loan amount and EMI repayment period"
    },
    {
      number: "05",
      title: "Confirm bank details & receive funds",
      description: "Verify bank account and receive loan amount within 3 days"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Apply for a Personal Loan Online
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple 5-step digital process to get your personal loan approved and disbursed in just 3 days.
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
              <User className="h-32 w-32 text-teal-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Digital Application Process
              </h3>
              <p className="text-gray-600">
                Complete your personal loan application entirely online with our 
                secure and user-friendly platform from anywhere, anytime.
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
    { label: "Age", value: "Minimum 21 years - 58 years" },
    { label: "Monthly Income", value: "Minimum Rs. 12000" },
    { label: "Occupation", value: "Salaried" },
    { label: "Credit Score", value: "650+" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Personal Loan Eligibility Criteria
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check if you meet our simple eligibility requirements for instant personal loan approval.
            Simple criteria designed to make funding accessible to more people.
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
            <strong>Disclaimer:</strong> Personal loan eligibility criteria may differ from bank to bank
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
    { name: "PAN Card", description: "Personal PAN card" },
    { name: "Address Proof", description: "Utility bill, rental agreement or passport" },
    { name: "Employment Proof", description: "Employee ID card or appointment letter" },
    { name: "Income Statement", description: "Last 3 months salary slips and bank statements" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Documents Required for Personal Loan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Minimal documentation with instant digital verification for hassle-free loan processing.
            Keep these documents ready for quick loan processing and faster approval.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
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

// Loan Offers Section
function LoanOffersSection() {
  const lenders = [
    { name: "HDFC Bank", rate: "10.5%", amount: "₹40L", tenure: "7 years", rating: 4.8 },
    { name: "ICICI Bank", rate: "10.8%", amount: "₹35L", tenure: "6 years", rating: 4.7 },
    { name: "Bajaj Finserv", rate: "11.2%", amount: "₹30L", tenure: "5 years", rating: 4.6 },
    { name: "Kotak Mahindra", rate: "11.5%", amount: "₹25L", tenure: "5 years", rating: 4.5 },
    { name: "Axis Bank", rate: "11.8%", amount: "₹20L", tenure: "4 years", rating: 4.4 },
    { name: "Yes Bank", rate: "12.5%", amount: "₹15L", tenure: "3 years", rating: 4.3 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Personal Loan Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare personalized loan offers from 50+ top NBFCs and banks, sorted by your preferences.
            Find the perfect match for your needs with transparent rates and terms.
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
      <Faq onOpenModal={() => setIsModalOpen(true)} />
      
      <LoanApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}