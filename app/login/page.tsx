"use client";

import Image from "next/image";
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Briefcase,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import {
  OtpService,
  Token,
  UserSchama,
  VerifyOtpResponse,
} from "../services/otp.service";
import {
  BusinessPayloadString,
  BusinessService,
  PersonalLoanService,
} from "../services/data.service";

/* ----------------------------- TYPES ----------------------------- */

interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
  phone?: string;
}

type Step = "mobile" | "otp" | "personal-details";

/* ---------------------------- COMPONENT ---------------------------- */

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [personal, setPersonal] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    dob: "",
    panCard: "",
    pincode: "",
  });

  const apply = searchParams.get("apply");
  const loan = searchParams.get("loan");

  /* ----------------------------- EFFECTS ----------------------------- */

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  /* ----------------------------- HELPERS ----------------------------- */

  const get10DigitMobile = (num: string) =>
    num.replace(/\D/g, "").slice(-10);

  /* ----------------------------- MOBILE ----------------------------- */

  const handleMobileSubmit = async () => {
    setError("");
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      const numericMobile = get10DigitMobile(mobile);
      localStorage.setItem("mobileNumber", numericMobile);
      await OtpService.sendOtp(numericMobile);
      setStep("otp");

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------- OTP ------------------------------- */

  const handleOtpSubmit = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    try {
      setOtpLoading(true);
      const mobileNumber = localStorage.getItem("mobileNumber")!;
      const res: VerifyOtpResponse = await OtpService.verifyOtp({
        phoneNumber: mobileNumber,
        otp,
        origin: "web",
      });

      if (!res.success) {
        setError(res.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("accessToken", res.data.token.accessToken);

      setPersonal({
        fullName: res.data.user.fullName || "",
        email: res.data.user.email || "",
        dob: res.data.user.dateOfBirth
          ? res.data.user.dateOfBirth.split("T")[0]
          : "",
        panCard: res.data.user.pancardNumber || "",
        pincode: res.data.user.pinCode || "",
        phone: mobileNumber,
      });

      setStep("personal-details");
    } catch {
      setError("OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  /* -------------------------- PERSONAL DETAILS -------------------------- */

  const handlePersonalSubmit = () => {
    const { fullName, email, dob, panCard, pincode } = personal;

    if (!fullName || !email || !dob || !panCard || !pincode) {
      setError("All fields are required");
      return;
    }

    localStorage.setItem("personalDetails", JSON.stringify(personal));

    if (loan === "personal" || loan === "business") {
      router.push(`/apply_now?loan=${loan}`);
    } else {
      setShowLoanModal(true);
    }
  };

  if (!isClient) return null;

  /* ------------------------------- UI ------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {showLoanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Select Loan Type</h3>

            <button
              onClick={() => router.push("/apply_now?loan=personal")}
              className="w-full p-4 border rounded-lg mb-3"
            >
              Personal Loan
            </button>

            <button
              onClick={() => router.push("/apply_now?loan=business")}
              className="w-full p-4 border rounded-lg"
            >
              Business Loan
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* LEFT */}
          <div className="hidden md:flex bg-[#0080E5] text-white p-10 flex-col items-center justify-center">
            <Image
              src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
              width={280}
              height={280}
              alt="Secure Login"
            />
            <h2 className="text-xl font-bold mt-4">
              {apply === "true" ? "Complete Application" : "Instant Loan"}
            </h2>
          </div>

          {/* RIGHT */}
          <div className="p-8">
            {step === "mobile" && (
              <>
                <input
                  type="tel"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="w-full border p-3 rounded mb-4"
                  placeholder="Enter mobile number"
                />

                <button
                  onClick={handleMobileSubmit}
                  disabled={loading}
                  className="w-full bg-[#0080E5] text-white p-3 rounded"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      maxLength={1}
                      inputMode="numeric"
                      className="w-12 h-14 border text-center text-xl"
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (!val) return;
                        const arr = otp.split("");
                        arr[i] = val;
                        setOtp(arr.join(""));
                        otpRefs.current[i + 1]?.focus();
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={otpLoading}
                  className="w-full bg-[#0080E5] text-white p-3 rounded"
                >
                  {otpLoading ? "Verifying..." : "Verify & Continue"}
                </button>
              </>
            )}

            {step === "personal-details" && (
              <>
                <input
                  className="w-full border p-3 rounded mb-2"
                  placeholder="Full Name"
                  value={personal.fullName}
                  onChange={(e) =>
                    setPersonal({ ...personal, fullName: e.target.value })
                  }
                />
                <input
                  className="w-full border p-3 rounded mb-2"
                  placeholder="Email"
                  value={personal.email}
                  onChange={(e) =>
                    setPersonal({ ...personal, email: e.target.value })
                  }
                />
                <button
                  onClick={handlePersonalSubmit}
                  className="w-full bg-[#0080E5] text-white p-3 rounded"
                >
                  Save & Continue
                </button>
              </>
            )}

            {error && (
              <div className="text-red-500 text-sm mt-4">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- SUSPENSE WRAPPER ------------------------- */

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
