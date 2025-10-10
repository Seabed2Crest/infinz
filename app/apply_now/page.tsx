"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle,
  Clock,
  Smartphone,
  CreditCard,
  FileText,
} from "lucide-react";

export default function ApplyNowPage() {
  const [step, setStep] = useState<"mobile" | "otp" | "form" | "success">(
    "mobile"
  );
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    loanType: "",
    amount: "",
    tenure: "",
  });

  const handleMobileSubmit = () => {
    if (mobile.length === 10) setStep("otp");
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) setStep("form");
  };

  const handleFormSubmit = () => {
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden md:flex bg-gradient-to-br from-teal-500 to-teal-700 text-white flex-col justify-center items-center p-10 relative">
          <Image
            src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
            alt="Instant Loan Illustration"
            width={300}
            height={300}
            className="rounded-xl mb-6"
          />
          <h2 className="text-3xl font-bold mb-2 text-center">
            Get an instant loan up to ₹1Cr
          </h2>
          <p className="text-lg mb-8 text-center opacity-90">
            Flexible EMIs, Instant Approvals
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {[
              { icon: Clock, label: "Faster Approval" },
              { icon: CreditCard, label: "Flexible EMI Options" },
              { icon: Smartphone, label: "Quick Disbursal" },
              { icon: FileText, label: "100% Paperless" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2"
              >
                <feature.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {step === "mobile" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Get an instant loan up to ₹1Cr with flexible EMI
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  onClick={handleMobileSubmit}
                  disabled={mobile.length !== 10}
                  className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
                >
                  Apply Loan
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 mb-2">Download Our App</p>
                  <div className="flex gap-3 justify-center">
                    <a href="https://apps.apple.com" target="_blank">
                      <Image
                        src="/apple.png"
                        alt="App Store"
                        width={120}
                        height={40}
                      />
                    </a>
                    <a href="https://play.google.com" target="_blank">
                      <Image
                        src="/playstore.png"
                        alt="Play Store"
                        width={120}
                        height={40}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Enter OTP
              </h2>
              <p className="text-gray-600 text-center mb-6">Sent to {mobile}</p>
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                    className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                ))}
              </div>
              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
              >
                Confirm OTP
              </button>
            </>
          )}

          {step === "form" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Complete Your Loan Application
              </h2>
              <div className="space-y-4">
                {["name", "city", "pincode", "amount", "tenure"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field === "amount"
                          ? "Loan Amount"
                          : field === "tenure"
                          ? "EMI Tenure"
                          : field}
                      </label>
                      <input
                        type={
                          field === "pincode" || field === "amount"
                            ? "number"
                            : "text"
                        }
                        value={(formData as any)[field]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                        placeholder={`Enter ${field}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  )
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Type
                  </label>
                  <select
                    value={formData.loanType}
                    onChange={(e) =>
                      setFormData({ ...formData, loanType: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Loan Type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="education">Education Loan</option>
                    <option value="home">Home Loan</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleFormSubmit}
                className="mt-6 w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
              >
                Submit Application
              </button>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you for applying. Our team will get in touch with you
                shortly to process your loan request.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
