"use client";
import { useState } from "react";
import { BusinessService } from "../services/data.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BusinessLoanHero() {
  const [businessType, setBusinessType] = useState("");
  const [turnover, setTurnover] = useState(""); // Keep as string for UI
  const [loanAmount, setLoanAmount] = useState(""); // Keep as string for UI
  const [mobileNumber, setMobileNumber] = useState("");
  const [emiTenure, setEmiTenure] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    // Validation
    if (
      !businessType ||
      !turnover ||
      !loanAmount ||
      !mobileNumber ||
      !emiTenure
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      // Convert turnover & loanAmount to numbers before sending
      const payload = {
        businessType,
        turnover: Number(turnover),
        loanAmount: Number(loanAmount),
        mobileNumber,
        emiTenure,
      };

      console.log("Submitting payload:", payload);

      const response = await BusinessService.createBusiness(payload);

      console.log("API Response:", response);
      toast.success("Business application submitted successfully!");
      router.push("/apply_now");
    } catch (error: any) {
      console.error("Error submitting business loan:", error);

      if (error.response?.data?.details) {
        error.response.data.details.forEach((detail: any) =>
          toast.error(detail.message)
        );
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to submit application");
      }
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fuel Your Business Growth with{" "}
              <span className="text-blue-600">Instant Business Loans</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get up to ₹1 crore business funding at competitive rates starting
              from 12% p.a. Quick approval, minimal documentation, funds in 5
              days.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Instant Loan
            </h3>

            <div className="space-y-4">
              {/* Business Type */}
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

              {/* Turnover */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Turnover
                </label>
                <select
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Turnover</option>
                  <option value="200000">₹2L - ₹10L</option>
                  <option value="1000000">₹10L - ₹50L</option>
                  <option value="5000000">₹50L - ₹1Cr</option>
                  <option value="10000000">₹1Cr - ₹5Cr</option>
                  <option value="50000000">Above ₹5Cr</option>
                </select>
              </div>

              {/* Loan Amount */}
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
                  <option value="100000">₹1L - ₹5L</option>
                  <option value="500000">₹5L - ₹10L</option>
                  <option value="1000000">₹10L - ₹25L</option>
                  <option value="2500000">₹25L - ₹50L</option>
                  <option value="5000000">₹50L - ₹1Cr</option>
                </select>
              </div>

              {/* EMI Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMI Tenure
                </label>
                <select
                  value={emiTenure}
                  onChange={(e) => setEmiTenure(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Tenure</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                  <option value="24 Months">24 Months</option>
                  <option value="36 Months">36 Months</option>
                  <option value="48 Months">48 Months</option>
                  <option value="60 Months">60 Months</option>
                </select>
              </div>

              {/* Mobile Number */}
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
                    if (/^\d*$/.test(value)) setMobileNumber(value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
