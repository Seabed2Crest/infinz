"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Smartphone,
  CreditCard,
  FileText,
  ExternalLink,
  Building2,
  IndianRupee,
  Calendar,
} from "lucide-react";

import {
  OtpService,
  Token,
  User,
  VerifyOtpResponse,
} from "../services/otp.service";
import {
  leadForm,
  LoanFormData,
  LoanResponse,
} from "../services/data.service";

// Type for recommended bank from backend - with optional fields
interface RecommendedBank {
  bankName: string;
  utmLink: string;
  priority: number;
  loanAmountRange?: {
    min: string;
    max: string;
  };
  salaryRequired?: string;
  ageRange?: {
    min: string;
    max: string;
  };
}

export default function ApplyNowClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");

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
  const [recommendedBank, setRecommendedBank] = useState<RecommendedBank | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    loanType: "",
    amount: "",
    tenure: "",
    dob: "",
  });

  // Set initial step based on query
  useEffect(() => {
    if (apply === "true") {
      setStep("otp");
    } else {
      setStep("mobile");
    }
  }, [apply]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMobile = localStorage.getItem("mobileNumber");
      if (storedMobile) setMobile(storedMobile);
    }
  }, []);

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // --- MOBILE NUMBER STEP ---
  const handleMobileSubmit = async () => {
    if (mobile.length === 10) {
      setLoading(true);
      setError("");

      try {
        const response = await OtpService.sendOtp(mobile);

        if (response.success) {
          localStorage.setItem("mobileNumber", mobile);
          setStep("otp");
        } else {
          setError(response.message || "Failed to send OTP");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Error sending OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  // --- OTP SUBMIT ---
  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      setOtpLoading(true);
      setError("");

      try {
        const response: VerifyOtpResponse = await OtpService.verifyOtp({
          phoneNumber: mobile,
          otp,
          origin: "web",
        });

        if (response.success) {
          setUserData(response.data.user);
          setToken(response.data.token);

          setFormData((prev) => ({
            ...prev,
            name: response.data.user.fullName || "",
            pincode: response.data.user.pinCode || "",
            dob: response.data.user.dateOfBirth || "",
          }));

          setStep("form");
        } else {
          setError(response.message || "Invalid OTP");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Error verifying OTP");
      } finally {
        setOtpLoading(false);
      }
    }
  };

  // --- FINAL FORM SUBMISSION ---
  const handleFormSubmit = async () => {
    // Validate all fields
    if (!formData.name || !formData.city || !formData.pincode ||
      !formData.loanType || !formData.amount || !formData.tenure || !formData.dob) {
      setError("Please fill in all fields");
      return;
    }

    // Validate age (must be 18+)
    const age = calculateAge(formData.dob);
    if (age < 18) {
      setError("You must be at least 18 years old to apply for a loan");
      return;
    }

    // Validate pincode (6 digits)
    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    const payload: LoanFormData = { ...formData, mobileNumber: mobile };

    try {
      setError("");
      const response: LoanResponse = await leadForm.createLoan(payload);

      if (response.success) {
        console.log("Recommended Bank:", response.recommendedBank);

        if (response.recommendedBank) {
          setRecommendedBank(response.recommendedBank as RecommendedBank);
        }

        setStep("success");
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit loan application");
    }
  };

  // --- OTP UI HANDLERS ---
  const handleOtpChange = (index: number, value: string) => {
    const onlyNum = value.replace(/\D/g, "");

    if (onlyNum || value === "") {
      const newOtp = otp.split("");
      newOtp[index] = onlyNum;
      setOtp(newOtp.join(""));

      if (onlyNum && index < 5) {
        document
          .querySelectorAll<HTMLInputElement>('input[data-otp="true"]')
        [index + 1]?.focus();
      }

      if (newOtp.join("").length === 6) handleOtpSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl overflow-hidden grid md:grid-cols-2">

            {/* LEFT SECTION */}
            <div className="hidden md:flex bg-gradient-to-br from-teal-500 to-teal-700 text-white flex-col justify-center items-center p-10">
              <Image
                src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
                alt="Instant Loan"
                width={300}
                height={300}
                className="rounded-xl mb-6"
              />

              <h2 className="text-3xl font-bold mb-2">Get an instant loan up to ₹1Cr</h2>
              <p className="text-lg opacity-90 mb-6">Flexible EMIs, Instant Approvals</p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {[
                  { icon: Clock, label: "Faster Approval" },
                  { icon: CreditCard, label: "Flexible EMI" },
                  { icon: Smartphone, label: "Quick Disbursal" },
                  { icon: FileText, label: "Paperless" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                    <f.icon className="w-5 h-5" />
                    <span className="text-sm">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="p-8 md:p-10">

              {/* MOBILE STEP */}
              {step === "mobile" && (
                <>
                  <h2 className="text-2xl font-bold text-center mb-4">Enter Your Mobile Number</h2>

                  <label className="block text-sm mb-2 font-medium text-gray-700">Mobile Number</label>
                  <input
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="Enter 10-digit mobile number"
                  />

                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                  <button
                    onClick={handleMobileSubmit}
                    disabled={mobile.length !== 10 || loading}
                    className="mt-5 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    {loading ? "Sending OTP..." : "Continue"}
                  </button>
                </>
              )}

              {/* OTP STEP */}
              {step === "otp" && (
                <>
                  <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>

                  <p className="text-center text-gray-600 mb-4">Sent to +91 {mobile}</p>

                  {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

                  <div className="flex justify-center gap-2 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        data-otp="true"
                        maxLength={1}
                        className="w-10 h-12 text-center border rounded-lg text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        value={otp[i] || ""}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleOtpSubmit}
                    disabled={otp.length !== 6 || otpLoading}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    {otpLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}

              {/* FORM STEP */}
              {step === "form" && (
                <>
                  <h2 className="text-2xl font-bold text-center mb-6">Complete Your Loan Application</h2>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {/* Name Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                          max={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                      {formData.dob && (
                        <p className="text-sm text-gray-600 mt-1">
                          Age: {calculateAge(formData.dob)} years
                        </p>
                      )}
                    </div>

                    {/* City Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="Enter your city"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Pincode Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Pincode</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
                        }
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Loan Type Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Loan Type</label>
                      <select
                        value={formData.loanType}
                        onChange={(e) =>
                          setFormData({ ...formData, loanType: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Select Loan Type</option>
                        <option value="personal">Personal Loan</option>
                        <option value="business">Business Loan</option>
                        <option value="education">Education Loan</option>
                        <option value="home">Home Loan</option>
                      </select>
                    </div>

                    {/* Amount Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Loan Amount</label>
                      <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        placeholder="e.g., 5L, 10L, 1Cr"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Tenure Field */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Tenure (months)</label>
                      <input
                        type="number"
                        value={formData.tenure}
                        onChange={(e) =>
                          setFormData({ ...formData, tenure: e.target.value })
                        }
                        placeholder="Enter tenure in months"
                        min="1"
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                  <button
                    onClick={handleFormSubmit}
                    className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    Submit Application
                  </button>
                </>
              )}

              {/* SUCCESS STEP */}
              {step === "success" && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>

                  <h2 className="text-3xl font-bold mb-3">Application Submitted!</h2>

                  <p className="text-gray-600 mb-4">
                    Thank you! Our team will contact you shortly.
                  </p>

                  <p className="text-sm text-gray-500 mb-6">
                    Reference: <strong>{mobile}</strong>
                  </p>

                  {/* Show Recommended Bank if available */}
                  {recommendedBank && (
                    <div className="mt-8 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border-2 border-teal-200">
                      <div className="flex items-center justify-center mb-4">
                        <Building2 className="w-8 h-8 text-teal-600 mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">
                          Recommended Bank Offer
                        </h3>
                      </div>

                      <div className="bg-white rounded-xl p-5 shadow-md mb-4">
                        <p className="text-2xl font-bold text-teal-700 mb-3">
                          {recommendedBank.bankName}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                          {/* Only show if loanAmountRange exists */}
                          {recommendedBank.loanAmountRange && (
                            <div className="flex items-center">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              <span>Loan: {recommendedBank.loanAmountRange.min} - {recommendedBank.loanAmountRange.max}</span>
                            </div>
                          )}

                          {/* Only show if ageRange exists */}
                          {recommendedBank.ageRange && (
                            <div>
                              <span>Age: {recommendedBank.ageRange.min} - {recommendedBank.ageRange.max} yrs</span>
                            </div>
                          )}

                          {/* Only show if salaryRequired exists */}
                          {recommendedBank.salaryRequired && (
                            <div className="col-span-2">
                              <span>Min. Salary: {recommendedBank.salaryRequired}</span>
                            </div>
                          )}
                        </div>


                        <a
                          href={recommendedBank.utmLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Apply Now
                          <ExternalLink className="w-5 h-5 ml-2" />
                        </a>

                      </div>

                      <p className="text-xs text-gray-500">
                        This offer is specially matched based on your profile
                      </p>
                    </div>
                  )}

                  {!recommendedBank && (
                    <p className="text-sm text-gray-500 mt-6">
                      We're processing your application and will send you the best offers soon.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}