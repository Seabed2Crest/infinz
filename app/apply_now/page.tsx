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
import {
  OtpService,
  Token,
  User,
  VerifyOtpResponse,
} from "../services/otp.service";

export default function ApplyNowPage() {
  const [step, setStep] = useState<"mobile" | "otp" | "form" | "success">(
    "mobile"
  );
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    loanType: "",
    amount: "",
    tenure: "",
  });

  const handleMobileSubmit = async () => {
    if (mobile.length === 10) {
      setLoading(true);
      setError("");
      try {
        const response = await OtpService.sendOtp(mobile);
        if (response.success) {
          setStep("otp");
        } else {
          setError(response.message || "Failed to send OTP");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An error occurred while sending OTP"
        );
        console.error("OTP sending error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      setOtpLoading(true);
      setError("");
      try {
        const payload = {
          phoneNumber: mobile,
          otp: otp,
        };

        const response: VerifyOtpResponse = await OtpService.verifyOtp(payload);

        if (response.success) {
          // Save user data and token
          setUserData(response.data.user);
          setToken(response.data.token);

          // Pre-fill form with user data if available
          setFormData((prev) => ({
            ...prev,
            name: response.data.user.fullName || "",
            pincode: response.data.user.pinCode || "",
          }));

          setStep("form");
        } else {
          setError(response.message || "Invalid OTP");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An error occurred while verifying OTP"
        );
        console.error("OTP verification error:", err);
      } finally {
        setOtpLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    // Here you can use the token for authenticated loan application
    console.log("User Data:", userData);
    console.log("Token:", token);
    console.log("Form Data:", formData);

    setStep("success");
  };

  // Handle Enter key press for mobile submission
  const handleMobileKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && mobile.length === 10) {
      handleMobileSubmit();
    }
  };

  // Handle Enter key press for OTP submission
  const handleOtpKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && otp.length === 6) {
      handleOtpSubmit();
    }
  };

  // Handle OTP input change with proper backspace support
  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue || value === "") {
      const newOtp = otp.split("");

      // If backspace (empty value) and we're not on the first input
      if (value === "" && index > 0) {
        newOtp[index] = "";
        const updatedOtp = newOtp.join("");
        setOtp(updatedOtp);

        // Focus previous input on backspace
        const prevInput =
          document.querySelectorAll<HTMLInputElement>('input[type="text"]')[
            index - 1
          ];
        prevInput?.focus();
      }
      // If entering a digit
      else if (numericValue) {
        newOtp[index] = numericValue;
        const updatedOtp = newOtp.join("");
        setOtp(updatedOtp);

        // Auto-focus next input if available
        if (index < 5 && numericValue) {
          const nextInput =
            document.querySelectorAll<HTMLInputElement>('input[type="text"]')[
              index + 1
            ];
          nextInput?.focus();
        }

        // Auto-submit when all 6 digits are entered
        if (updatedOtp.length === 6) {
          handleOtpSubmit();
        }
      }
    }
  };

  // Handle backspace key specifically
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      // If current input is empty and not first input, focus previous
      if (!otp[index] && index > 0) {
        const prevInput =
          document.querySelectorAll<HTMLInputElement>('input[type="text"]')[
            index - 1
          ];
        prevInput?.focus();
        // Also clear the previous input
        const newOtp = otp.split("");
        newOtp[index - 1] = "";
        setOtp(newOtp.join(""));
      }
      // If current input has value, clear it
      else if (otp[index]) {
        const newOtp = otp.split("");
        newOtp[index] = "";
        setOtp(newOtp.join(""));
      }
    }
  };

  // Handle paste event for OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData);
      // Auto-submit after paste
      setTimeout(() => handleOtpSubmit(), 100);
    }
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
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, "")); // Only allow numbers
                      setError(""); // Clear error when user types
                    }}
                    onKeyPress={handleMobileKeyPress}
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleMobileSubmit}
                  disabled={mobile.length !== 10 || loading}
                  className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    "Apply Loan"
                  )}
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
              <p className="text-gray-600 text-center mb-6">
                Sent to +91 {mobile}
                <button
                  onClick={() => {
                    setStep("mobile");
                    setOtp("");
                    setError("");
                  }}
                  className="ml-2 text-teal-600 hover:text-teal-700 text-sm"
                >
                  Change
                </button>
              </p>

              {error && (
                <p className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onKeyPress={handleOtpKeyPress}
                    onPaste={handleOtpPaste}
                    className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-lg font-semibold transition-colors"
                    disabled={otpLoading}
                    autoFocus={i === 0 && otp.length === 0}
                  />
                ))}
              </div>

              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6 || otpLoading}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {otpLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Confirm OTP"
                )}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Didn't receive OTP?{" "}
                <button
                  onClick={handleMobileSubmit}
                  disabled={loading}
                  className="text-teal-600 hover:text-teal-700 font-medium disabled:text-gray-400"
                >
                  Resend OTP
                </button>
              </p>
            </>
          )}

          {step === "form" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Complete Your Loan Application
              </h2>

              {userData && (
                <div className="mb-6 p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-700 text-sm">
                    Welcome back, <strong>{userData.fullName}</strong>! Your
                    details have been pre-filled.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {["name", "city", "pincode", "amount", "tenure"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field === "amount"
                          ? "Loan Amount (₹)"
                          : field === "tenure"
                          ? "EMI Tenure (months)"
                          : field}
                      </label>
                      <input
                        type={
                          field === "pincode" ||
                          field === "amount" ||
                          field === "tenure"
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
              {userData && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    Application reference: <strong>{mobile}</strong>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
