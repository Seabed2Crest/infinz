"use client";

import Image from "next/image";
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

/* ---------------------------------- TYPES --------------------------------- */

interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
  phone?: string;
}

type Step = "mobile" | "otp" | "personal-details";

/* -------------------------------- COMPONENT -------------------------------- */

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

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [personal, setPersonal] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    dob: "",
    panCard: "",
    pincode: "",
  });

  const apply = searchParams.get("apply");
  const loan = searchParams.get("loan");

  /* ------------------------------- UTILITIES ------------------------------- */

  const get10DigitMobile = (num: string) =>
    num.replace(/\D/g, "").slice(-10);

  /* ------------------------------ LIFECYCLE ------------------------------ */

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  /* ---------------------------- MOBILE SUBMIT ----------------------------- */

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
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------- OTP FLOW ------------------------------- */

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setError("Enter 6 digit OTP");
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

      if (!res.success) throw new Error();

      setPersonal({
        fullName: res.data.user.fullName || "",
        email: res.data.user.email || "",
        dob: res.data.user.dateOfBirth?.split("T")[0] || "",
        panCard: res.data.user.pancardNumber || "",
        pincode: res.data.user.pinCode || "",
        phone: mobileNumber,
      });

      localStorage.setItem("accessToken", res.data.token.accessToken);
      setStep("personal-details");
    } catch {
      setError("Invalid OTP");
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

  /* ------------------------------ RENDER UI ------------------------------ */

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {showLoanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="font-bold mb-4">Select Loan Type</h3>

            <button
              onClick={() => router.push("/apply_now?loan=personal")}
              className="w-full p-4 border rounded-lg mb-2"
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
              width={260}
              height={260}
              alt="Login"
            />
            <h2 className="text-xl font-bold mt-4">Instant Loan</h2>
          </div>

          {/* RIGHT */}
          <div className="p-8">
            {step === "mobile" && (
              <>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.slice(0, 10))}
                  placeholder="Mobile number"
                  className="w-full border p-3 rounded"
                />
                <button
                  onClick={handleMobileSubmit}
                  className="mt-4 w-full bg-[#0080E5] text-white p-3 rounded"
                >
                  Continue
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      maxLength={1}
                      className="w-10 h-12 text-center border"
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const arr = otp.split("");
                        arr[i] = val;
                        setOtp(arr.join(""));
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleOtpSubmit}
                  className="mt-4 w-full bg-[#0080E5] text-white p-3 rounded"
                >
                  Verify
                </button>
              </>
            )}

            {step === "personal-details" && (
              <>
                <input
                  placeholder="Full Name"
                  value={personal.fullName}
                  onChange={(e) =>
                    setPersonal({ ...personal, fullName: e.target.value })
                  }
                  className="w-full border p-3 rounded mb-2"
                />
                <input
                  placeholder="Email"
                  value={personal.email}
                  onChange={(e) =>
                    setPersonal({ ...personal, email: e.target.value })
                  }
                  className="w-full border p-3 rounded mb-2"
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
              <div className="text-red-500 text-sm mt-3">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SUSPENSE WRAP ----------------------------- */

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
