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

export default function ApplyNowPage() {
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
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    pincode: "",
    loanType: "",
    amount: "",
    tenure: "",
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
    const payload: LoanFormData = { ...formData, mobileNumber: mobile };

    try {
      const response: LoanResponse = await leadForm.createLoan(payload);
      if (response.success) {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 flex items-center justify-center px-4 py-12">
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

              <label className="block text-sm mb-2">Mobile Number</label>
              <input
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Enter mobile number"
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                onClick={handleMobileSubmit}
                disabled={mobile.length !== 10 || loading}
                className="mt-5 w-full bg-teal-600 text-white py-3 rounded-xl"
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

              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    data-otp="true"
                    maxLength={1}
                    className="w-10 h-12 text-center border rounded-lg text-lg"
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                  />
                ))}
              </div>

              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6 || otpLoading}
                className="w-full bg-teal-600 text-white py-3 rounded-xl"
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* FORM STEP */}
          {step === "form" && (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Complete Your Loan Application</h2>

              <div className="space-y-4">
                {["name", "city", "pincode", "amount", "tenure"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 capitalize">{field}</label>
                    <input
                      value={(formData as any)[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1">Loan Type</label>
                  <select
                    value={formData.loanType}
                    onChange={(e) =>
                      setFormData({ ...formData, loanType: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
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
                className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl"
              >
                Submit Application
              </button>
            </>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold mb-3">Application Submitted!</h2>

              <p className="text-gray-600 mb-4">
                Thank you! Our team will contact you shortly.
              </p>

              <p className="text-sm text-gray-500">
                Reference: <strong>{mobile}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
