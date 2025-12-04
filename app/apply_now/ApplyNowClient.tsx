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
  User,
  Mail,
  CalendarDays,
  MapPin,
  Phone,
} from "lucide-react";

import {
  OtpService,
  Token,
  UserSchama,
  VerifyOtpResponse,
} from "../services/otp.service";

import {
  PersonalLoanService,
  BusinessLoanService,
  PresignUrl,
  personalDetailsService,
  PersonalLoanApply,
} from "../services/data.service";
import UtmLinksSection from "../components/UtmLinksSection";



// --- Types ---
interface RecommendedBank {
  bankName: string;
  utmLink: string;
  priority: number;
  loanAmountRange?: { min: string; max: string };
  salaryRequired?: string;
  ageRange?: { min: string; max: string };
}

export default function ApplyNowClient() {

  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const loanType = searchParams.get("loan") || "personal";

  const [step, setStep] = useState<
    "mobile" | "otp" | "personal-details" | "form" | "success"
  >("mobile");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [loanOffer, setLoanOffer] = useState<any>(null);

  const [userData, setUserData] = useState<UserSchama | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [recommendedBank, setRecommendedBank] =
    useState<RecommendedBank | null>(null);

  // --- PERSONAL DETAILS ---
  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    dob: "",
    panCard: "",
    pincode: "",
  });

  // --- LOAN DETAILS (Personal Loan Application) ---
  const [formData, setFormData] = useState({
    requiredLoanAmount: "",
    employmentType: "",
    netMonthlyIncome: "",
    salaryPaymentMode: "",
    companyOrBusinessName: "",
    companyPinCode: "",
  });

  // --- SALARY SLIP UPLOAD ---
  const [salarySlipUploading, setSalarySlipUploading] = useState(false);
  const [salarySlipUrl, setSalarySlipUrl] = useState<string | null>(null);
  const [loanSubmitting, setLoanSubmitting] = useState(false);

  // --- BUSINESS LOAN DETAILS ---
  const [businessForm, setBusinessForm] = useState({
    requiredLoanAmount: "",
    employmentType: "",
    businessName: "",
    companyType: "",
    annualTurnover: "",
    industryType: "",
    registrationType: "",
    registrationNumber: "",
    incorporationDate: "",
    businessPincode: "",
  });

  // --- INIT ---
  useEffect(() => {
    if (apply === "true") setStep("otp");
    else setStep("mobile");
  }, [apply]);

  useEffect(() => {
    const saved = localStorage.getItem("mobileNumber");
    if (saved) {
      setMobile(saved);
      setPersonal((p) => ({ ...p, phone: saved }));
    }
  }, []);

  // --- HELPERS ---
  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) age--;
    return age;
  };

  // ================================
  // ✅ SEND OTP
  // ================================
  const handleMobileSubmit = async () => {
    setError("");
    if (mobile.length !== 10) return;

    setLoading(true);
    try {
      const res = await OtpService.sendOtp(mobile);

      if (res.success) {
        localStorage.setItem("mobileNumber", mobile);
        setPersonal((p) => ({ ...p, phone: mobile }));
        setStep("otp");
      } else {
        setError(res.message || "OTP failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP Error");
    }
    setLoading(false);
  };

  // ================================
  // ✅ VERIFY OTP
  // ================================
  const handleOtpSubmit = async () => {
    setError("");
    if (otp.length !== 6) return;

    setOtpLoading(true);
    try {
      const res: VerifyOtpResponse = await OtpService.verifyOtp({
        phoneNumber: mobile,
        otp,
        origin: "web",
      });

      if (res.success) {
        setToken(res.data.token);
        localStorage.setItem("accessToken", res.data.token.accessToken);
        setUserData(res.data.user);

        setPersonal((p) => ({
          ...p,
          fullName: res.data.user.fullName || "",
          dob: res.data.user.dateOfBirth || "",
          pincode: res.data.user.pinCode || "",
        }));

        setStep("personal-details");
      } else {
        setError(res.message || "Wrong OTP");
      }
    } catch {
      setError("OTP verification failed");
    }
    setOtpLoading(false);
  };

  const handleOtpChange = (i: number, v: string) => {
    const only = v.replace(/\D/g, "");
    const arr = otp.split("");
    arr[i] = only;
    setOtp(arr.join(""));

    if (only && i < 5) {
      document
        .querySelectorAll<HTMLInputElement>('[data-otp="true"]')
      [i + 1]?.focus();
    }
  };

  // ================================
  // ✅ PERSONAL DETAILS API
  // ================================
  const handlePersonalSubmit = async () => {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!personal.fullName || !personal.email || !personal.dob || !personal.panCard || !personal.pincode) {
      setError("All fields required");
      return;
    }

    if (!emailRegex.test(personal.email)) {
      setError("Invalid Email");
      return;
    }

    if (!panRegex.test(personal.panCard.toUpperCase())) {
      setError("Invalid PAN Card");
      return;
    }

    if (!/^[0-9]{6}$/.test(personal.pincode)) {
      setError("Pincode must be 6 digits");
      return;
    }

    if (calculateAge(personal.dob) < 18) {
      setError("Age must be 18+");
      return;
    }

    try {
      const res = await personalDetailsService.save({
        ...personal,

      });

      if (!res.success) {
        setError(res.message || "Save failed");
        return;
      }

      setStep("form");
    } catch (err: any) {
      setError(err.response?.data?.message || "Personal save error");
    }
  };

  // ================================
  // ✅ LOAN API
  // ================================
  const handleFormSubmit = async () => {
    setError("");

    // Personal loan flow
    if (loanType !== "business") {
      if (
        !formData.requiredLoanAmount ||
        !formData.employmentType ||
        !formData.netMonthlyIncome ||
        !formData.salaryPaymentMode ||
        !formData.companyOrBusinessName ||
        !formData.companyPinCode
      ) {
        setError("Please fill all required loan details");
        return;
      }

      if (!salarySlipUrl) {
        setError("Please upload your salary slip before submitting.");
        return;
      }

      try {
        setLoanSubmitting(true);
        const payload = {
          loanPurpose: "personal-loan",
          monthlyIncome: formData.netMonthlyIncome,
          loanAmountRequired: formData.requiredLoanAmount,
          // Backend requires emiTenure; using a sensible default
          emiTenure: "12",
          mobileNumber: mobile,
          salarySlipUrl,
          employmentType: formData.employmentType as
            | "salaried"
            | "self-employed",
          salaryPaymentMode: formData.salaryPaymentMode as
            | "cash"
            | "inhand"
            | "bank",
          companyOrBusinessName: formData.companyOrBusinessName,
          companyPinCode: formData.companyPinCode,
        };

        const response = await PersonalLoanApply.createPersonalLoan(payload);
        if (response?.success) {
          setLoanOffer(response.data.loanOffers);   // ✅ save the offer
          setStep("success");
        } else {
          setError(response?.message || "Failed to submit loan application");
        }
      } catch (err: any) {
        setError(err.message || "Loan failed");
      } finally {
        setLoanSubmitting(false);
      }
      return;
    }

    // Business loan flow
    if (
      !businessForm.requiredLoanAmount ||
      !businessForm.employmentType ||
      !businessForm.businessName ||
      !businessForm.companyType ||
      !businessForm.annualTurnover ||
      !businessForm.industryType ||
      !businessForm.registrationType ||
      !businessForm.registrationNumber ||
      !businessForm.incorporationDate ||
      !businessForm.businessPincode
    ) {
      setError("Please fill all required business loan details");
      return;
    }

    try {
      setLoanSubmitting(true);

      const payload = {
        requiredLoanAmount: businessForm.requiredLoanAmount,
        employmentType: businessForm.employmentType as
          | "salaried"
          | "self-employed",
        businessName: businessForm.businessName,
        companyType: businessForm.companyType as
          | "Proprietorship"
          | "Partnership"
          | "Pvt Ltd"
          | "LLP"
          | "Others",
        annualTurnover: businessForm.annualTurnover,
        industryType: businessForm.industryType,
        registrationType: businessForm.registrationType as
          | "GST"
          | "SHOP"
          | "FSSAI"
          | "TRADE"
          | "OTHERS",
        registrationNumber: businessForm.registrationNumber,
        incorporationDate: businessForm.incorporationDate,
        businessPincode: businessForm.businessPincode,
        mobileNumber: mobile,
      };

      const response = await BusinessLoanService.createBusinessLoan(payload);

      if (response?.success) {
        setLoanOffer(response?.data?.loanOffers);   // ✅ save the offer
        setStep("success");
      } else {
        setError(response?.message || "Failed to submit loan application");
      }
    } catch (err: any) {
      setError(err.message || "Business loan failed");
    } finally {
      setLoanSubmitting(false);
    }
  };

  // ================================
  // ✅ SALARY SLIP UPLOAD (PRESIGNED URL)
  // ================================
  const handleSalarySlipChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSalarySlipUploading(true);

    try {
      const presignRes = await PresignUrl.UploadFile({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        uploadType: "employee-salary-slip",
      });

      if (!presignRes.success || !presignRes.data?.[0]?.url) {
        setError(presignRes.message || "Failed to get upload URL");
        setSalarySlipUploading(false);
        return;
      }

      const { url, key } = presignRes.data[0];

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });

      // Hard-coded bucket name used for the URL saved in DB
      const BUCKET_NAME = "infinz"; // TODO: replace with real bucket
      const publicUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
      setSalarySlipUrl(publicUrl);
    } catch (uploadErr: any) {
      console.error("Salary slip upload failed:", uploadErr);
      setError("Salary slip upload failed. Please try again.");
    } finally {
      setSalarySlipUploading(false);
    }
  };

  // ================================
  // ✅ UI
  // ================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100">
      <div className="container mx-auto px-4 py-12">

        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">

          {/* LEFT */}
          <div className="hidden md:flex bg-teal-600 text-white p-10 flex-col items-center justify-center">
            <Image src="/3d-hand-hold-smartphone-with-authentication-form.jpg" width={260} height={260} alt="" />
            <h2 className="text-2xl font-bold mt-4">Instant Loan upto ₹1Cr</h2>
            <p className="opacity-90">Fast approvals, no paperwork</p>
          </div>

          {/* RIGHT */}
          <div className="p-8">

            {/* MOBILE */}
            {step === "mobile" && (
              <div className="w-full max-w-sm mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-5 text-center">
                  Enter Mobile Number
                </h2>

                <div className="space-y-4">
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    className="
          w-full px-4 py-3 rounded-xl bg-gray-800 text-white 
          placeholder-gray-400 border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-orange-500
        "
                  />

                  <button
                    onClick={handleMobileSubmit}
                    disabled={loading || mobile.length !== 10}
                    className="
          w-full py-3 rounded-xl text-center font-semibold
          bg-orange-600 hover:bg-orange-700 
          disabled:bg-gray-700 disabled:cursor-not-allowed
          text-white transition-all duration-200
        "
                  >
                    {loading ? "Sending OTP..." : "Continue"}
                  </button>
                </div>
              </div>
            )}


            {/* OTP */}
            {step === "otp" && (
              <>
                <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
                <p className="text-sm text-gray-500 mb-4">
                  We&apos;ve sent a 6‑digit OTP to <span className="font-semibold">{mobile}</span>.
                  Enter it below to continue.
                </p>
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      maxLength={1}
                      data-otp="true"
                      value={otp[i] || ""}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-10 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  ))}
                </div>
                <button
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6 || otpLoading}
                  className={`w-full py-3 rounded-xl font-semibold transition ${otp.length !== 6 || otpLoading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                    }`}
                >
                  {otpLoading ? "Verifying OTP..." : "Verify & Continue"}
                </button>
              </>
            )}

            {/* PERSONAL DETAILS */}
            {step === "personal-details" && (
              <>
                <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Make sure your details match your PAN card records.
                </p>

                <div className="space-y-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Enter your full name"
                        value={personal.fullName}
                        onChange={(e) =>
                          setPersonal({ ...personal, fullName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="example@email.com"
                        value={personal.email}
                        onChange={(e) =>
                          setPersonal({ ...personal, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <CalendarDays
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        value={personal.dob}
                        onChange={(e) =>
                          setPersonal({ ...personal, dob: e.target.value })
                        }
                      />
                    </div>
                    {personal.dob && (
                      <p className="text-xs text-gray-500 mt-1">
                        Age: {calculateAge(personal.dob)} years
                      </p>
                    )}
                  </div>

                  {/* PAN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Card
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        className="w-full pl-10 py-3 uppercase border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="ABCDE1234F"
                        value={personal.panCard}
                        onChange={(e) =>
                          setPersonal({
                            ...personal,
                            panCard: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        maxLength={6}
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Enter pincode"
                        value={personal.pincode}
                        onChange={(e) =>
                          setPersonal({
                            ...personal,
                            pincode: e.target.value.replace(/\D/g, ""),
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Phone */}

                  <button
                    onClick={handlePersonalSubmit}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition"
                  >
                    Save & Continue
                  </button>
                </div>
              </>
            )}



            {/* LOAN - PERSONAL */}
            {step === "form" && loanType !== "business" && (
              <>
                <h2 className="text-2xl font-bold mb-2">Loan Details</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Personal loan application – share your income and employment
                  details so we can process your request.
                </p>

                <div className="space-y-4">
                  {/* Required Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="e.g. 200000"
                      value={formData.requiredLoanAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requiredLoanAmount: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                      value={formData.employmentType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employmentType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select employment type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-employed</option>
                    </select>
                  </div>

                  {/* Net Monthly Income */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Net Monthly Income
                    </label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                      value={formData.netMonthlyIncome}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          netMonthlyIncome: e.target.value,
                        })
                      }
                    >
                      <option value="">Select income range</option>
                      <option value="15k-30k">₹15,000 – ₹30,000</option>
                      <option value="30k-50k">₹30,000 – ₹50,000</option>
                      <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                      <option value="above-1l">Above ₹1,00,000</option>
                    </select>
                  </div>

                  {/* Salary Payment Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Payment Mode
                    </label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      value={formData.salaryPaymentMode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salaryPaymentMode: e.target.value,
                        })
                      }
                    >
                      <option value="">Select payment mode</option>
                      <option value="cash">Cash</option>
                      <option value="inhand">In-hand</option>
                      <option value="bank">Bank account</option>
                    </select>
                  </div>

                  {/* Company / Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company / Business Name
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter company or business name"
                      value={formData.companyOrBusinessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyOrBusinessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Company Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Pincode
                    </label>
                    <input
                      maxLength={6}
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter company pincode"
                      value={formData.companyPinCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyPinCode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>

                  {/* Salary Slip Upload */}
                  <div className="mt-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Salary Slip <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleSalarySlipChange}
                      className="w-full text-sm"
                    />
                    {salarySlipUploading && (
                      <p className="text-xs text-gray-500">Uploading...</p>
                    )}
                    {salarySlipUrl && !salarySlipUploading && (
                      <p className="text-xs text-green-600">
                        Salary slip uploaded successfully.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleFormSubmit}
                    disabled={
                      !salarySlipUrl || salarySlipUploading || loanSubmitting
                    }
                    className={`w-full mt-4 font-semibold py-3 rounded-xl transition ${!salarySlipUrl || salarySlipUploading || loanSubmitting
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                      }`}
                  >
                    {loanSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </>
            )}

            {/* LOAN - BUSINESS */}
            {step === "form" && loanType === "business" && (
              <>
                <h2 className="text-2xl font-bold mb-2">Business Loan Details</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Share your business details so we can process your business loan
                  request.
                </p>

                <div className="space-y-4">
                  {/* Required Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="e.g. 500000"
                      value={businessForm.requiredLoanAmount}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          requiredLoanAmount: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                      value={businessForm.employmentType}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          employmentType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select employment type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-employed</option>
                    </select>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter business name"
                      value={businessForm.businessName}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          businessName: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Company Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Type
                    </label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                      value={businessForm.companyType}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          companyType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select company type</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Pvt Ltd">Pvt Ltd</option>
                      <option value="LLP">LLP</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Annual Turnover */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Turnover
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="e.g. 2000000"
                      value={businessForm.annualTurnover}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          annualTurnover: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Industry / Nature of Business */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry / Nature of Business
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="e.g. Retail, Manufacturing"
                      value={businessForm.industryType}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          industryType: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Business Registration Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Registration Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="w-1/3 py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                        value={businessForm.registrationType}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            registrationType: e.target.value,
                          })
                        }
                      >
                        <option value="">Type</option>
                        <option value="GST">GST Number</option>
                        <option value="SHOP">Shop and Establishment</option>
                        <option value="FSSAI">FSSAI</option>
                        <option value="TRADE">Trade License</option>
                        <option value="OTHERS">Others</option>
                      </select>
                      <input
                        className="flex-1 py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Enter registration number"
                        value={businessForm.registrationNumber}
                        onChange={(e) =>
                          setBusinessForm({
                            ...businessForm,
                            registrationNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Date of Incorporation / Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Incorporation / Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      value={businessForm.incorporationDate}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          incorporationDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Business Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Pincode
                    </label>
                    <input
                      maxLength={6}
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter business pincode"
                      value={businessForm.businessPincode}
                      onChange={(e) =>
                        setBusinessForm({
                          ...businessForm,
                          businessPincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>

                  <button
                    onClick={handleFormSubmit}
                    disabled={loanSubmitting}
                    className={`w-full mt-4 font-semibold py-3 rounded-xl transition ${loanSubmitting
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                      }`}
                  >
                    {loanSubmitting ? "Submitting..." : "Submit Business Loan"}
                  </button>
                </div>
              </>
            )}

            {/* SUCCESS */}
            {step === "success" && loanOffer && (
              <div className="space-y-6">

                {/* HEADER */}
                <div className="text-center">
                  <CheckCircle size={60} className="text-green-600 mx-auto" />
                  <h2 className="text-2xl font-semibold mt-3 text-gray-900">
                    Loan Offer Available
                  </h2>
                  <p className="text-gray-600">
                    You are eligible for this loan offer:
                  </p>
                </div>

                {/* OFFER CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">

                  {/* Bank Logo + Name */}
                  <div className="flex items-center gap-4">
                    <img
                      src={loanOffer.bankLogo}
                      alt={loanOffer.bankName}
                      className="w-14 h-14 rounded-xl object-contain bg-gray-100 p-2"
                    />
                    <h3 className="text-xl font-bold text-gray-900">
                      {loanOffer.bankName}
                    </h3>
                  </div>

                  {/* APPLY BUTTON */}
                  <a
                    href={loanOffer.utmLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
          mt-6 block w-full text-center 
        bg-teal-600 hover:bg-teal-700 text-white
          text-white font-semibold py-3 
          rounded-xl transition-all duration-200
        "
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            )}



            {error && <p className="text-red-500 mt-3">{error}</p>}

          </div>
        </div>
      </div>
    </div>
  );
}
