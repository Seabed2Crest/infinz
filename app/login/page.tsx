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

  // Client-side mounting state
  const [isClient, setIsClient] = useState(false);

  // State management
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<Token | null>(null);
  const [userData, setUserData] = useState<UserSchama | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResent, setOtpResent] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [personalDetailsSaved, setPersonalDetailsSaved] = useState(false);

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

  // Set initial step based on URL parameters
  useLayoutEffect(() => {
    if (isClient) {
      const storedMobile = localStorage.getItem("mobileNumber");

      console.log("Initialization debug:");
      console.log("- apply param:", apply);
      console.log("- loan param:", loan);
      console.log("- stored mobile:", storedMobile);
      console.log("- full URL:", window.location.href);

      // Check if apply=true is in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const applyParam = urlParams.get("apply");

      if (applyParam === "true") {
        // Case 1: apply=true AND we have a stored mobile number
        if (storedMobile) {
          console.log(
            "Case 1: apply=true with stored mobile - showing OTP step"
          );
          setStep("otp");

          // Clean and set the mobile number (remove +91 if present)
          const cleanMobile = storedMobile.replace("+91", "").trim();
          setMobile(cleanMobile);

          // Auto-send OTP after a short delay
          setTimeout(() => {
            if (step === "otp") {
              handleAutoResendOtp();
            }
          }, 1000);
        }
        // Case 2: apply=true but NO stored mobile number
        else {
          console.log(
            "Case 2: apply=true without stored mobile - showing mobile input"
          );
          setStep("mobile");

          // Check if there's a loan parameter to show context
          if (loan) {
            console.log("Loan type specified:", loan);
          }
        }
      }
      // Case 3: Normal flow (no apply parameter or apply is not "true")
      else {
        console.log("Case 3: Normal login flow - showing mobile input");
        setStep("mobile");

        // Pre-fill with stored mobile if available
        if (storedMobile) {
          const cleanMobile = storedMobile.replace("+91", "").trim();
          setMobile(cleanMobile);
        }
      }
    }
  }, [isClient, apply]);

  // Auto-resend OTP when landing on OTP page from apply flow
  const handleAutoResendOtp = async (): Promise<void> => {
    try {
      console.log("Auto-sending OTP for apply flow...");
      const storedMobile = localStorage.getItem("mobileNumber");
      if (storedMobile) {
        await OtpService.sendOtp(storedMobile);
        setOtpResent(true);
        console.log("Auto OTP sent successfully");

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

  // Format date for input field
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split("T")[0];
  };

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

  // Helper function to format mobile number with +91
  const formatMobileNumber = (mobileNumber: string): string => {
    // Remove any non-digit characters
    const cleanNumber = mobileNumber.replace(/\D/g, "");
    // Ensure it's exactly 10 digits
    if (cleanNumber.length === 10) {
      return `+91${cleanNumber}`;
    }
    return mobileNumber;
  };

  // Handle mobile number submission
  const handleMobileSubmit = async (): Promise<void> => {
    setError("");

    // Validation
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const applyData = localStorage.getItem("applyData");
      const mobileNumber = mobile;

      // Store mobile number in localStorage with +91 prefix
      localStorage.setItem("mobileNumber", mobileNumber);

      if (loan === "personal" && applyData !== null) {
        const payload = {
          ...JSON.parse(applyData),
          mobile: mobileNumber,
        };
        await PersonalLoanService.createPersonalLoan(payload);
      } else if (loan === "business" && applyData !== null) {
        const payload = {
          ...JSON.parse(applyData),
          mobile: mobileNumber,
        };
        await BusinessService.createBusiness(
          payload as unknown as BusinessPayloadString
        );
      } else {
        await OtpService.sendOtp(mobileNumber);
      }

      setStep("otp");
      // Focus first OTP input after transition
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
      // Get mobile number from localStorage or use current state
      const storedMobile =
        localStorage.getItem("mobileNumber") || formatMobileNumber(mobile);
      await OtpService.sendOtp(storedMobile);
      setOtp("");
      setError("");
      setOtpResent(true);

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
      // Get mobile number from localStorage or format current mobile
      const storedMobile =
        localStorage.getItem("mobileNumber") || formatMobileNumber(mobile);

      const res: VerifyOtpResponse = await OtpService.verifyOtp({
        phoneNumber: storedMobile,
        otp,
        origin: "web",
      });

      if (res.success) {
        setToken(res.data.token);
        localStorage.setItem("accessToken", res.data.token.accessToken);
        setUserData(res.data.user);

        // Format and set user data from API response
        const dobFormatted = formatDateForInput(
          res.data.user.dateOfBirth || ""
        );

        setPersonal({
          fullName: res.data.user.fullName || "",
          email: res.data.user.email || "",
          dob: dobFormatted,
          panCard: res.data.user.pancardNumber || "",
          pincode: res.data.user.pinCode || "",
          phone: storedMobile,
        });

        // NEW FLOW: After OTP verification, always go to personal details first
        setStep("personal-details");
      } else {
        setError(res.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError("OTP verification failed. Please check the code and try again.");
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

  // Format date for API (YYYY-MM-DD format)
  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle personal details submission - UPDATED
  const handlePersonalSubmit = async (): Promise<void> => {
    setError("");

    // Validation
    const { fullName, email, dob, panCard, pincode } = personal;

    if (!fullName || !email || !dob || !panCard || !pincode) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(panCard.toUpperCase())) {
      setError("Invalid PAN card format. Format: ABCDE1234F");
      return;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      setError("Pincode must be exactly 6 digits");
      return;
    }

    const age = calculateAge(dob);
    if (age < 18) {
      setError("You must be at least 18 years old to apply");
      return;
    }

    try {
      setLoading(true);

      // Get mobile number from localStorage
      const storedMobile =
        localStorage.getItem("mobileNumber") || formatMobileNumber(mobile);
      const token = localStorage.getItem("accessToken");

      console.log("📤 Submitting personal details with:", {
        fullName: fullName.trim(),
        email: email.trim(),
        dob,
        panCard: panCard.toUpperCase(),
        pincode,
        formattedDob: formatDateForAPI(dob),
        hasToken: !!token,
        mobile: storedMobile,
      });

      // Check if there's a specific loan type already selected (from URL)
      const urlParams = new URLSearchParams(window.location.search);
      const loanParam = urlParams.get("loan");

      if (loanParam === "personal" || loanParam === "business") {
        // If loan type is already specified in URL, skip modal and go to loan form
        localStorage.setItem("loanType", loanParam);
        setSelectedLoan(loanParam);
        setPersonalDetailsSaved(true);

        // Redirect to appropriate loan form
        router.push(`/apply_now?loan=${loanParam}`);
      } else {
        // Show loan selection modal if no specific loan type is selected
        setPersonalDetailsSaved(true);
        setShowLoanModal(true);
      }
    } catch (err: any) {
      console.error("❌ Error in handlePersonalSubmit:", err);

      // Show detailed error message
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An error occurred. Please try again.";

      // Check for validation errors
      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const errorList = Object.values(validationErrors).join(", ");
        setError(`Validation errors: ${errorList}`);
      } else {
        setError(errorMessage);
      }
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
  };

  // Handle loan selection from modal
  const handleLoanSelection = (selectedType: "personal" | "business") => {
    localStorage.setItem("loanType", selectedType);
    setSelectedLoan(selectedType);

    // Update URL using Next.js router
    const params = new URLSearchParams(window.location.search);
    params.set("loan", selectedType);
    router.replace(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });

    setShowLoanModal(false);

    // Navigate to the appropriate loan form
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
            : "Enter your mobile number to continue"}
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

          <p className="text-xs text-gray-400 text-center mt-4">
            By continuing, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    );
  };

  // Render OTP verification step
  const renderOtpStep = (): JSX.Element => {
    const isApplyFlow = apply === "true";
    // Get formatted mobile number for display
    const storedMobile = localStorage.getItem("mobileNumber");
    const displayMobile = storedMobile
      ? storedMobile.replace("+91", "")
      : mobile;

    return (
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isApplyFlow ? "Verify to Continue Application" : "Verify OTP"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {isApplyFlow ? (
            <>
              Verify your mobile number to continue your {loan || "loan"}{" "}
              application
            </>
          ) : (
            <>
              We've sent a 6-digit OTP to{" "}
              <span className="font-semibold text-gray-700">
                +91 {displayMobile}
              </span>
            </>
          )}
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
            aria-label={otpLoading ? "Verifying OTP" : "Verify OTP"}
          >
            {otpLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Verifying...
              </span>
            ) : isApplyFlow ? (
              "Verify & Continue Application"
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

                // Only clear stored mobile if not in apply flow
                if (!isApplyFlow) {
                  localStorage.removeItem("mobileNumber");
                }
              }}
              className="block w-full text-gray-500 hover:text-gray-700 text-sm mt-2"
            >
              ← Change mobile number
            </button>

            {isApplyFlow && (
              <button
                onClick={() => router.back()}
                className="block w-full text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to application form
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  // Render personal details step
  const renderPersonalDetailsStep = (): JSX.Element => {
    const isApplyFlow = apply === "true";
    // Get formatted mobile number for display
    const storedMobile = localStorage.getItem("mobileNumber");
    const displayPhone = storedMobile || formatMobileNumber(mobile);

    return (
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isApplyFlow ? "Complete Your Application" : "Personal Details"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {isApplyFlow
            ? "Final step! Verify your details to complete your application."
            : "Please provide your personal details to continue."}
        </p>

        <div className="space-y-4">
          {/* Full Name */}
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
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
                placeholder="Enter your full name"
                value={personal.fullName}
                onChange={(e) =>
                  updatePersonalDetail("fullName", e.target.value)
                }
                aria-label="Full name"
              />
            </div>
          </div>

          {/* Email */}
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
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
                placeholder="example@email.com"
                value={personal.email}
                onChange={(e) => updatePersonalDetail("email", e.target.value)}
                aria-label="Email address"
              />
            </div>
          </div>

          {/* DOB with Age Display */}
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
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
                value={personal.dob}
                onChange={(e) => updatePersonalDetail("dob", e.target.value)}
                aria-label="Date of birth"
              />
            </div>
            {personal.dob && (
              <p className="text-xs text-gray-500 mt-1">
                Age:{" "}
                <span className="font-medium">
                  {calculateAge(personal.dob)} years
                </span>
              </p>
            )}
          </div>

          {/* PAN Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PAN Card Number *
            </label>
            <div className="relative">
              <CreditCard
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent uppercase"
                placeholder="ABCDE1234F"
                value={personal.panCard}
                onChange={(e) =>
                  updatePersonalDetail("panCard", e.target.value.toUpperCase())
                }
                maxLength={10}
                aria-label="PAN card number"
              />
            </div>
          </div>

          {/* Pincode */}
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
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
                placeholder="Enter 6-digit pincode"
                value={personal.pincode}
                onChange={(e) =>
                  updatePersonalDetail(
                    "pincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                maxLength={6}
                aria-label="Pincode"
              />
            </div>
          </div>

          {/* Phone (Read-only) */}
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
                value={displayPhone}
                readOnly
                disabled
                aria-label="Phone number"
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
            className="w-full mt-4 bg-[#0080E5] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Save and continue"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Saving...
              </span>
            ) : (
              "Save & Continue"
            )}
          </button>

          <button
            onClick={() => setStep("otp")}
            className="block w-full text-gray-500 hover:text-gray-700 text-sm text-center mt-2"
          >
            ← Back to OTP verification
          </button>
        </div>
      </>
    );
  };

  // Render loan selection modal
  const renderLoanModal = (): JSX.Element | null => {
    if (!showLoanModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Select Loan Type
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Please select the type of loan you are looking for to continue.
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
                      For individual needs
                    </div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#0080E5]">
                  →
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
                      For business expansion
                    </div>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-[#0080E5]">
                  →
                </span>
              </button>
            </div>
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
      case "loan-form":
        return 4;
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
      case "loan-form":
        return "Loan Form";
      default:
        return "";
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100"
      suppressHydrationWarning
    >
      {renderLoanModal()}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* Left side - Hero/Info */}
          <div className="hidden md:flex bg-gradient-to-br from-[#0080E5] to-[#0066B3] text-white p-10 flex-col items-center justify-center">
            <Image
              src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
              width={280}
              height={280}
              alt="Secure Login Illustration"
              className="object-contain"
              priority
            />
            <h2 className="text-2xl font-bold mt-6 mb-2 text-center">
              {apply === "true"
                ? "Complete Your Application"
                : "Instant Loan up to ₹1Cr"}
            </h2>
            <p className="opacity-90 text-center">
              {apply === "true"
                ? "Final step to get your loan approved"
                : "Fast approvals • No paperwork • Best rates"}
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span>100% Digital Process</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span>Secure & Encrypted</span>
              </div>
              {apply === "true" && loan && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>
                    {loan.charAt(0).toUpperCase() + loan.slice(1)} Loan
                    Application
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-6 md:p-10">
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
                    className={`h-full bg-[#0080E5] transition-all duration-300 ${
                      step === "mobile"
                        ? "w-1/3"
                        : step === "otp"
                        ? "w-2/3"
                        : step === "personal-details"
                        ? "w-full"
                        : "w-full"
                    }`}
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
