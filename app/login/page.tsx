"use client";
import Image from "next/image";
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  Suspense,
} from "react";
import {
  OtpService,
  Token,
  UserSchama,
  VerifyOtpResponse,
} from "../services/otp.service";
import {
  BusinessPayloadString,
  BusinessService,
  personalDetailsService,
  PersonalLoanService,
} from "../services/data.service";
import {
  Briefcase,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import http from "../http.common";

interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
  phone?: string;
}

type Step = "mobile" | "otp" | "personal-details" | "loan-form";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Client-side mounting stateapplyData
  const [isClient, setIsClient] = useState(false);

  // State management
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof PersonalDetails, string>>
  >({});
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<Token | null>(null);
  const [userData, setUserData] = useState<UserSchama | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [personalDetailsSaved, setPersonalDetailsSaved] = useState(false);
  const PAN_HOLDER_TYPES = ["P", "C", "H", "F", "A", "T", "B", "L", "J", "G"];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PINCODE_REGEX = /^[1-9][0-9]{5}$/; // Indian pincode (no leading 0)
  const PAN_REGEX = /^[A-Z]{3}[PCHFABTLJG][A-Z][0-9]{4}[A-Z]$/;

  // Refs for OTP input management
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Personal details state
  const [personal, setPersonal] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    dob: "",
    panCard: "",
    pincode: "",
  });

  const validatePersonalDetails = (): boolean => {
    const errors: Partial<Record<keyof PersonalDetails, string>> = {};

    // Full Name
    if (!personal.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (personal.fullName.trim().length < 3) {
      errors.fullName = "Full name must be at least 3 characters";
    }

    // Email
    if (!personal.email.trim()) {
      errors.email = "Email address is required";
    } else if (!EMAIL_REGEX.test(personal.email)) {
      errors.email = "Enter a valid email address";
    }

    // DOB (Age ≥ 21)
    if (!personal.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const age = calculateAge(personal.dob);
      if (age < 21) {
        errors.dob = "You must be at least 21 years old";
      } else if (age > 65) {
        errors.dob = "Age must be below 65 years";
      }
    }

    // PAN
    if (!personal.panCard) {
      errors.panCard = "PAN number is required";
    } else if (!PAN_REGEX.test(personal.panCard)) {
      errors.panCard = "Enter a valid PAN (e.g. AAAPA1234A)";
    }

    // Pincode
    if (!personal.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!PINCODE_REGEX.test(personal.pincode)) {
      errors.pincode = "Enter a valid 6-digit Indian pincode";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //handle PAN Changes
  const handlePanChange = (value: string) => {
    let pan = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    let result = "";

    for (let i = 0; i < pan.length && i < 10; i++) {
      const char = pan[i];

      // 1–3 → Alphabets only
      if (i <= 2 && /[A-Z]/.test(char)) {
        result += char;
      }

      // 4th → PAN holder type
      else if (i === 3 && PAN_HOLDER_TYPES.includes(char)) {
        result += char;
      }

      // 5th → Alphabet only (surname/entity initial)
      else if (i === 4 && /[A-Z]/.test(char)) {
        result += char;
      }

      // 6–9 → Digits only
      else if (i >= 5 && i <= 8 && /[0-9]/.test(char)) {
        result += char;
      }

      // 10th → Alphabet only (check digit)
      else if (i === 9 && /[A-Z]/.test(char)) {
        result += char;
      }
    }

    updatePersonalDetail("panCard", result);
  };

  // Get query parameters
  const apply = searchParams.get("apply");
  const [selectedLoan, setSelectedLoan] = useState<
    "personal" | "business" | null
  >(null);

  // Initialize OTP refs array
  useLayoutEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  const loan = searchParams.get("loan");

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-focus first OTP input when OTP step is reached
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 50);
    }
  }, [step]);

  // Helper to ensure we only deal with 10 digit strings
  const get10DigitMobile = (num: string): string => {
    return num.replace(/\D/g, "").slice(-10);
  };

  // Set initial step based on URL parameters
  useLayoutEffect(() => {
    if (isClient) {
      const storedMobile = localStorage.getItem("mobileNumber");
      const urlParams = new URLSearchParams(window.location.search);
      const applyParam = urlParams.get("apply");

      if (applyParam === "true") {
        if (storedMobile) {
          setStep("otp");
          // Extract only the last 10 digits to be safe
          const cleanMobile = get10DigitMobile(storedMobile);
          setMobile(cleanMobile);

          // Auto-send OTP after a short delay
          setTimeout(() => {
            if (step === "otp") {
              handleAutoResendOtp();
            }
          }, 1000);
        } else {
          setStep("mobile");
        }
      } else {
        setStep("mobile");
        if (storedMobile) {
          const cleanMobile = get10DigitMobile(storedMobile);
          setMobile(cleanMobile);
        }
      }
    }
  }, [isClient, apply]);

  // Auto-resend OTP when landing on OTP page from apply flow
  const handleAutoResendOtp = async (): Promise<void> => {
    try {
      const storedMobile = localStorage.getItem("mobileNumber");
      if (storedMobile) {
        const numericMobile = get10DigitMobile(storedMobile);
        await OtpService.sendOtp(numericMobile);
        setOtpResent(true);

        // Focus the first OTP input after auto-sending OTP
        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 100);

        // Reset after 30 seconds
        setTimeout(() => setOtpResent(false), 30000);
      }
    } catch (error) {
      console.error("Auto OTP send failed:", error);
    }
  };

  // Show loading state during server-side rendering
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080E5]"></div>
      </div>
    );
  }

  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  //   const createUserApi = async (payload: any) => {
  //   const res = await fetch("/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (!res.ok) {
  //     const err = await res.json();
  //     throw new Error(err.message || "Failed to save user");
  //   }

  //   return res.json();
  // };

  const handleMobileSubmit = async (): Promise<void> => {
    setError("");

    // Validation
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const numericMobile = get10DigitMobile(mobile);
      // Store cleaned mobile number in localStorage (no +91)
      localStorage.setItem("mobileNumber", numericMobile);

      const applyData = localStorage.getItem("applyData");
      const personalDetails = localStorage.getItem("personalDetails");

      if (loan === "personal" && applyData !== null) {
        const payload = {
          ...JSON.parse(applyData),
          mobile: numericMobile,
        };
        await PersonalLoanService.createPersonalLoan(payload);
      } else if (loan === "business" && personalDetails !== null) {
        const personal = JSON.parse(personalDetails);

        // Transform keys to match backend
        const payload = {
          userName: personal.fullName,
          email: personal.email,
          dateOfBirth: personal.dob,
          panCardNumber: personal.panCard,
          businessPincode: personal.pincode,
          mobileNumber: numericMobile,
          platform: "web",
          employmentType: "self-employed",

          ...(applyData ? JSON.parse(applyData) : {}),
        };

        await BusinessService.createBusiness(payload as BusinessPayloadString);
      } else {
        await OtpService.sendOtp(numericMobile);
      }

      setStep("otp");

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = async (): Promise<void> => {
    try {
      const numericMobile = get10DigitMobile(
        localStorage.getItem("mobileNumber") || mobile
      );
      await OtpService.sendOtp(numericMobile);
      setOtp("");
      setError("");
      setOtpResent(true);

      // Focus the first OTP input after OTP is resent
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);

      // Reset OTP resent flag after 30 seconds
      setTimeout(() => setOtpResent(false), 30000);
    } catch (err: any) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (): Promise<void> => {
    setError("");

    // Validation
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setOtpLoading(true);

    try {
      const numericMobile = get10DigitMobile(
        localStorage.getItem("mobileNumber") || mobile
      );

      const res: VerifyOtpResponse = await OtpService.verifyOtp({
        phoneNumber: numericMobile,
        otp,
        origin: "web",
      });

      if (res.success) {
        setToken(res.data.token);
        localStorage.setItem("accessToken", res.data.token.accessToken);
        setUserData(res.data.user);

        setPersonal({
          fullName: res.data.user.fullName || "",
          email: res.data.user.email || "",
          dob: res.data.user.dateOfBirth
            ? res.data.user.dateOfBirth.split("T")[0]
            : "",
          panCard: res.data.user.pancardNumber || "",
          pincode: res.data.user.pinCode || "",
          phone: numericMobile,
        });

        // After OTP verification, go to personal details
        setStep("personal-details");
      } else {
        setError(res.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please check the code and try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string): void => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue && numericValue.length > 1) return;

    const newOtp = otp.split("");
    newOtp[index] = numericValue;
    setOtp(newOtp.join(""));

    // Auto-focus next input
    if (numericValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP input key events
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const isValidPanStrict = (pan: string): boolean => {
    return /^[A-Z]{3}[PCHFABTLJG][A-Z][0-9]{4}[A-Z]$/.test(pan);
  };

  // Inside handlePersonalSubmit in Login component
  const handlePersonalSubmit = async (): Promise<void> => {
    setError("");
    setFieldErrors({});

    // ❌ STOP API if validation fails
    if (!validatePersonalDetails()) {
      return;
    }

    const { fullName, email, dob, panCard, pincode } = personal;

    if (!fullName || !email || !dob || !panCard || !pincode) {
      setError("All fields are required");
      return;
    }

    if (!isValidPanStrict(personal.panCard)) {
      setError("Enter a valid PAN (Format: AAAPA1234A)");
      return;
    }

    setLoading(true);

    try {
      const phoneNumber =
        personal.phone ||
        get10DigitMobile(localStorage.getItem("mobileNumber") || "");

      // 🔹 API call inline (axios instance auto-attaches token)
      await http.post("/api/v1/users", {
        phoneNumber,
        fullName,
        email,
        dateOfBirth: dob,
        pancardNumber: panCard,
        pinCode: pincode,
        origin: "web",
        authProvider: "phone-number",
      });

      // 🔹 Persist for Apply Now flow (existing logic)
      localStorage.setItem(
        "personalDetails",
        JSON.stringify({
          fullName,
          email,
          dob,
          panCard,
          pincode,
        })
      );

      const loanParam = searchParams.get("loan");

      // 🔹 Continue flow
      if (loanParam === "personal" || loanParam === "business") {
        router.push(`/apply_now?loan=${loanParam}`);
      } else {
        setShowLoanModal(true);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to save personal details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update personal details
  const updatePersonalDetail = (
    field: keyof PersonalDetails,
    value: string
  ): void => {
    setPersonal((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Handle loan selection from modal
  const handleLoanSelection = (selectedType: "personal" | "business") => {
    localStorage.setItem("loanType", selectedType);
    setSelectedLoan(selectedType);
    setShowLoanModal(false);
    router.push(`/apply_now?loan=${selectedType}`);
  };

  // Render mobile number input step
  const renderMobileStep = (): JSX.Element => {
    const isApplyFlow = apply === "true";

    return (
      <div className="w-full max-w-sm mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          {isApplyFlow ? "Continue Your Application" : "Welcome Back"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          {isApplyFlow
            ? `Enter your mobile number to continue your ${
                loan || "loan"
              } application`
            : "Enter your 10-digit mobile number to continue"}
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="tel"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
              aria-label="Mobile number"
            />
            {mobile.length === 10 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">
                ✓
              </span>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleMobileSubmit}
            disabled={loading || mobile.length !== 10}
            className="bg-[#0080E5] hover:bg-[#0066B3] text-white w-full py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            aria-label={loading ? "Sending OTP" : "Continue"}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Sending OTP...
              </span>
            ) : (
              "Continue"
            )}
          </button>

          {isApplyFlow && (
            <button
              onClick={() => router.back()}
              className="w-full text-gray-600 hover:text-gray-800 text-sm text-center py-2"
            >
              ← Back to application
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render OTP verification step
  const renderOtpStep = (): JSX.Element => {
    const isApplyFlow = apply === "true";

    return (
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isApplyFlow ? "Verify to Continue" : "Verify OTP"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          We've sent a 6-digit OTP to{" "}
          <span className="font-semibold text-gray-700">+91 {mobile}</span>
        </p>

        <div className="space-y-6">
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 border border-gray-300 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleOtpSubmit}
            disabled={otp.length !== 6 || otpLoading}
            className="w-full py-3 rounded-xl font-semibold transition duration-200 bg-[#0080E5] hover:bg-[#0066B3] text-white disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed shadow-md"
          >
            {otpLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Verifying...
              </span>
            ) : (
              "Verify & Continue"
            )}
          </button>

          <div className="text-center space-y-2">
            <button
              onClick={handleResendOtp}
              disabled={otpResent}
              className="text-[#0080E5] hover:text-[#0066B3] text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {otpResent
                ? "OTP Resent (Wait 30s)"
                : "Didn't receive OTP? Resend"}
            </button>

            <button
              onClick={() => {
                setStep("mobile");
                setOtp("");
                setError("");
              }}
              className="block w-full text-gray-500 hover:text-gray-700 text-sm mt-2"
            >
              ← Change mobile number
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render personal details step
  const renderPersonalDetailsStep = (): JSX.Element => {
    const displayPhone = mobile;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Personal Details
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Please provide your personal details to continue.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5]"
                placeholder="Enter your full name"
                value={personal.fullName}
                onChange={(e) =>
                  updatePersonalDetail("fullName", e.target.value)
                }
              />
              {fieldErrors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5]"
                placeholder="example@email.com"
                value={personal.email}
                onChange={(e) => updatePersonalDetail("email", e.target.value)}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <div className="relative">
                <CalendarDays
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5]"
                  value={personal.dob}
                  onChange={(e) => updatePersonalDetail("dob", e.target.value)}
                />
                {fieldErrors.dob && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.dob}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Card *
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="AAAPA1234A"
                  value={personal.panCard}
                  onChange={(e) => handlePanChange(e.target.value)}
                  maxLength={10}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] uppercase"
                  autoComplete="off"
                />
                {fieldErrors.panCard && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.panCard}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5]"
                placeholder="Enter 6-digit pincode"
                value={personal.pincode}
                onChange={(e) =>
                  updatePersonalDetail(
                    "pincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                maxLength={6}
              />
              {fieldErrors.pincode && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.pincode}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                value={"+91 " + displayPhone}
                readOnly
                disabled
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handlePersonalSubmit}
            disabled={loading}
            className="w-full bg-[#0080E5] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    );
  };

  // Render loan selection modal
  const renderLoanModal = (): JSX.Element | null => {
    if (!showLoanModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Select Loan Type
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Please select the type of loan you are looking for.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleLoanSelection("personal")}
              className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#0080E5] hover:bg-blue-50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-[#0080E5]">
                  <User size={20} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 group-hover:text-[#0080E5]">
                    Personal Loan
                  </div>
                  <div className="text-xs text-gray-500">
                    For Salaried Individuals
                  </div>
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-[#0080E5]">
                {"→"}
              </span>
            </button>

            <button
              onClick={() => handleLoanSelection("business")}
              className="w-full p-4 border border-gray-200 rounded-xl hover:border-[#0080E5] hover:bg-blue-50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Briefcase size={20} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800 group-hover:text-[#0080E5]">
                    Business Loan
                  </div>
                  <div className="text-xs text-gray-500">
                    For Self Employed Individual
                  </div>
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-[#0080E5]">
                {"→"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Get current step number for progress bar
  const getStepNumber = (): number => {
    switch (step) {
      case "mobile":
        return 1;
      case "otp":
        return 2;
      case "personal-details":
        return 3;
      default:
        return 1;
    }
  };

  // Get step description
  const getStepDescription = (): string => {
    switch (step) {
      case "mobile":
        return "Enter Mobile";
      case "otp":
        return "Verify OTP";
      case "personal-details":
        return "Details";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {renderLoanModal()}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* Left side */}
          <div className="hidden md:flex bg-gradient-to-br from-[#0080E5] to-[#0066B3] text-white p-10 flex-col items-center justify-center">
            <Image
              src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
              width={280}
              height={280}
              alt="Secure Login"
              className="object-contain"
              priority
            />
            <h2 className="text-2xl font-bold mt-6 mb-2 text-center">
              {apply === "true"
                ? "Complete Your Application"
                : "Instant Loan up to ₹1Cr"}
            </h2>
            <p className="opacity-90 text-center">
              Fast approvals • Best rates
            </p>
          </div>

          {/* Right side */}
          <div className="p-8 md:p-10">
            <div className="max-w-md mx-auto">
              {step === "mobile" && renderMobileStep()}
              {step === "otp" && renderOtpStep()}
              {step === "personal-details" && renderPersonalDetailsStep()}

              {/* Progress indicator */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    Step {getStepNumber()} of 3
                  </span>
                  <span className="text-xs font-medium text-[#0080E5]">
                    {getStepDescription()}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0080E5] transition-all duration-300"
                    style={{ width: `${(getStepNumber() / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080E5]"></div>
    </div>
  );
}

// Wrap Login in Suspense to handle useSearchParams()
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <Login />
    </Suspense>
  );
}
