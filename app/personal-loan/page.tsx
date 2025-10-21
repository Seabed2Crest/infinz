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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Enhanced validation function
  const validateForm = (): string[] => {
    const errors: string[] = [];
    const newFieldErrors: Record<string, string> = {};

    // Check each field individually
    if (!formData.loanPurpose?.trim()) {
      errors.push("Loan Purpose");
      newFieldErrors.loanPurpose = "Please select a loan purpose";
    }

    if (!formData.monthlyIncome?.trim()) {
      errors.push("Monthly Income");
      newFieldErrors.monthlyIncome = "Please select your monthly income range";
    }

    if (!formData.loanAmountRequired?.trim()) {
      errors.push("Loan Amount Required");
      newFieldErrors.loanAmountRequired = "Please select loan amount";
    }

    if (!formData.emiTenure?.trim()) {
      errors.push("EMI Tenure");
      newFieldErrors.emiTenure = "Please select EMI tenure";
    }

    if (!formData.mobileNumber?.trim()) {
      errors.push("Mobile Number");
      newFieldErrors.mobileNumber = "Please enter mobile number";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      errors.push("Mobile Number (must be 10 digits)");
      newFieldErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    }

    setFieldErrors(newFieldErrors);
    return errors;
  };

  // Clear field error when user starts typing
  const clearFieldError = (fieldName: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    clearFieldError(name);

    // For mobile number, only allow numbers and limit to 10 digits
    if (name === "mobileNumber") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Enhanced handle submit with better API response handling
  const handleSubmit = async () => {
    console.log("Form Data before validation:", formData);

    // Validate form
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      console.error("Validation failed for fields:", validationErrors);
      alert(
        `⚠️ Please fill in all fields correctly:\n• ${validationErrors.join(
          "\n• "
        )}`
      );
      return;
    }

    console.log("Form validation passed, submitting...");
    setLoading(true);

    try {
      console.log("Calling PersonalLoanService.createPersonalLoan...");
      const response = await PersonalLoanService.createPersonalLoan(formData);
      console.log("Full API Response:", response);
      console.log("Response type:", typeof response);
      console.log("Response keys:", response ? Object.keys(response) : "null");

      // ✅ Enhanced success check - handle different response structures
      // Use type assertion to handle unknown response structure
      const responseData = response as any;

      const isSuccess =
        responseData &&
        (responseData._id || // MongoDB style
          responseData.id || // Alternative ID field
          responseData.success === true || // Success flag
          responseData.status === "success" || // Status field
          responseData.data?.id || // Nested data
          responseData.message?.includes("success")); // Success message

      if (isSuccess) {
        console.log("✅ Loan submission successful");
        // alert("🎉 Personal loan request submitted successfully!");

        // Reset form
        setFormData({
          loanPurpose: "",
          monthlyIncome: "",
          loanAmountRequired: "",
          emiTenure: "",
          mobileNumber: "",
        });
        setFieldErrors({});

        // Give a small delay so alert shows before redirect
        setTimeout(() => {
          router.push("/apply_now");
        }, 300);
      } else {
        console.warn("⚠️ Unexpected API response structure:", response);

        // Check if it's an empty response
        if (response && Object.keys(response).length === 0) {
          console.error("❌ API returned empty object - possible server issue");
          alert(
            "We're experiencing technical issues. Please try again in a few moments."
          );
        } else {
          // Check for error messages in response with type assertion
          const errorData = response as any;
          const errorMessage =
            errorData?.message || errorData?.error || "Please try again.";
          alert(`Submission issue: ${errorMessage}`);
        }
      }
    } catch (error: any) {
      console.error("❌ Error submitting loan:", error);

      // More specific error handling
      if (error.response) {
        // Server responded with error status
        console.error("Server error response:", error.response);
        alert(
          `Server error: ${error.response.status} - ${
            error.response.data?.message || "Please try again."
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert(
          "No response from server. Please check your connection and try again."
        );
      } else {
        // Other errors
        alert(
          "Something went wrong while submitting your loan request. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Test function to debug API - now with better error handling
  const testAPICall = async () => {
    const testData = {
      loanPurpose: "Home Renovation",
      monthlyIncome: "₹50K - ₹75K",
      loanAmountRequired: "₹2L - ₹5L",
      emiTenure: "36 Months",
      mobileNumber: "9876543210",
    };

    console.log("🧪 Testing API with:", testData);
    try {
      const response = await PersonalLoanService.createPersonalLoan(testData);
      // Use type assertion for debugging
      const responseData = response as any;

      // Analyze response structure
      console.log("🔍 Response analysis:");
      console.log(" - Type:", typeof response);
      console.log(" - Is object:", typeof response === "object");
      console.log(
        " - Keys:",
        response ? Object.keys(response) : "null/undefined"
      );
      console.log(" - Has _id:", responseData?._id);
      console.log(" - Has id:", responseData?.id);
      console.log(" - Has success:", responseData?.success);
      console.log(" - Has status:", responseData?.status);
      console.log(" - Has message:", responseData?.message);

      return response;
    } catch (error) {
      console.error("❌ Test API Error:", error);
      throw error;
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
                <span className="text-blue-600">Minutes</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get instant approval on loans up to ₹50 lakhs with no hidden
                charges, flexible repayment options, and funds in your account
                within 24 hours.
              </p>
            </div>

            {/* Debug buttons - remove in production */}
            {/* <div className="flex gap-2">
              <button
                onClick={testAPICall}
                className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
              >
                Test API
              </button>
              <button
                onClick={() => console.log("Current formData:", formData)}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Log Form Data
              </button>
            </div> */}
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
                  Loan Purpose *
                </label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.loanPurpose
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Loan Purpose</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Home Renovation">Home Renovation</option>
                  <option value="Medical Expenses">Medical Expenses</option>
                  <option value="Travel">Travel</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                {fieldErrors.loanPurpose && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.loanPurpose}
                  </p>
                )}
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income *
                </label>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.monthlyIncome
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Income Range</option>
                  <option value="₹15K - ₹30K">₹15K - ₹30K</option>
                  <option value="₹30K - ₹50K">₹30K - ₹50K</option>
                  <option value="₹50K - ₹75K">₹50K - ₹75K</option>
                  <option value="₹75K - ₹1L">₹75K - ₹1L</option>
                  <option value="Above ₹1L">Above ₹1L</option>
                </select>
                {fieldErrors.monthlyIncome && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.monthlyIncome}
                  </p>
                )}
              </div>

              {/* Loan Amount Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount Required *
                </label>
                <select
                  name="loanAmountRequired"
                  value={formData.loanAmountRequired}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.loanAmountRequired
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Loan Amount</option>
                  <option value="₹50K - ₹1L">₹50K - ₹1L</option>
                  <option value="₹1L - ₹2L">₹1L - ₹2L</option>
                  <option value="₹2L - ₹5L">₹2L - ₹5L</option>
                  <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                  <option value="₹10L - ₹20L">₹10L - ₹20L</option>
                  <option value="Above ₹20L">Above ₹20L</option>
                </select>
                {fieldErrors.loanAmountRequired && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.loanAmountRequired}
                  </p>
                )}
              </div>

              {/* EMI Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMI Tenure *
                </label>
                <select
                  name="emiTenure"
                  value={formData.emiTenure}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.emiTenure ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select EMI Tenure</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                  <option value="18 Months">18 Months</option>
                  <option value="24 Months">24 Months</option>
                  <option value="36 Months">36 Months</option>
                  <option value="48 Months">48 Months</option>
                  <option value="60 Months">60 Months</option>
                </select>
                {fieldErrors.emiTenure && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.emiTenure}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    fieldErrors.mobileNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {fieldErrors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${
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
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                min={12000}
                max={10000000}
                step={1000}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-40 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={12000}
                max={10000000}
                step={1000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹12K</span>
                <span>₹1 Cr</span>
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
                min={9.99}
                max={28}
                step={0.1}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-28 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={9.99}
                max={28}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>9.99%</span>
                <span>28%</span>
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
                max={84}
                step={1}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg text-gray-900 font-semibold mb-3"
              />
              <input
                type="range"
                min={12}
                max={84}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>12 Months</span>
                <span>84 Months</span>
              </div>
            </div>

            {/* Apply Now Button */}
            <Link
              href="/apply_now"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
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
                <div className="text-4xl font-bold text-blue-600 mb-2">
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
                <feature.icon className="h-8 w-8 text-blue-600" />
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
      title: "Register with Mobile Number",
      description:
        "Enter and verify your mobile number to sign up for the loan process",
    },
    {
      title: "Verify Personal Details",
      description:
        "Submit your basic information like name, date of birth, and PAN card",
    },
    {
      title: "Enter Employment Details",
      description:
        "Provide your income details so we can assess your loan eligibility",
    },
    {
      title: "Choose Loan Amount & Tenure",
      description:
        "Select how much you want to borrow and set your repayment period",
    },
    {
      title: "Confirm Bank Details & Receive Loan",
      description:
        "Add your bank account and get the approved loan credited in 3 days",
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
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
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

          {/* Centered CTA Button */}
          <div className="text-center mt-12">
            <Link
              href="/apply_now"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
            >
              Check Eligibility Now
            </Link>
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
                <FileText className="h-6 w-6 text-blue-600" />
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

function LoanOffersSection() {
  const initialLenders = [
    { name: "HDFC Bank", rate: 10.5, amount: 4000000, tenure: 7, rating: 4.8 },
    { name: "ICICI Bank", rate: 10.8, amount: 3500000, tenure: 6, rating: 4.7 },
    {
      name: "Bajaj Finserv",
      rate: 11.2,
      amount: 3000000,
      tenure: 5,
      rating: 4.6,
    },
    {
      name: "Kotak Mahindra",
      rate: 11.5,
      amount: 2500000,
      tenure: 5,
      rating: 4.5,
    },
    { name: "Axis Bank", rate: 11.8, amount: 2000000, tenure: 4, rating: 4.4 },
    { name: "Yes Bank", rate: 12.5, amount: 1500000, tenure: 3, rating: 4.3 },
  ];

  const [lenders, setLenders] = useState(initialLenders);
  const [activeFilter, setActiveFilter] = useState("maxAmount"); // default active changed to maxAmount

  const sortByMaxAmount = () => {
    setActiveFilter("maxAmount");
    setLenders([...lenders].sort((a, b) => b.amount - a.amount));
  };

  const sortByMinAmount = () => {
    setActiveFilter("minAmount");
    setLenders([...lenders].sort((a, b) => a.amount - b.amount));
  };

  const sortByLowestRate = () => {
    setActiveFilter("rate");
    setLenders([...lenders].sort((a, b) => a.rate - b.rate));
  };

  const formatAmount = (amt: number) => `₹${(amt / 100000).toFixed(0)}L`;

  const getButtonClasses = (filterName: string) =>
    filterName === activeFilter
      ? "px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
      : "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50";

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

        {/* Sort Options - Lowest Interest Rate moved to last */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={sortByMaxAmount}
            className={getButtonClasses("maxAmount")}
          >
            Max Loan Amount
          </button>
          <button
            onClick={sortByMinAmount}
            className={getButtonClasses("minAmount")}
          >
            Min Loan Amount
          </button>
          <button
            onClick={sortByLowestRate}
            className={getButtonClasses("rate")}
          >
            Lowest Interest Rate
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
                    {lender.rate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Amount</span>
                  <span className="font-semibold text-gray-900">
                    {formatAmount(lender.amount)}
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

export const personalLoanFaq = [
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
