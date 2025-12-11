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

// --- Types ---
interface RecommendedBank {
  bankName: string;
  utmLink: string;
  priority: number;
  loanAmountRange?: { min: string; max: string };
  salaryRequired?: string;
  ageRange?: { min: string; max: string };
}

// Personal details type
interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
  phone?: string;
}

export default function ApplyNowClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const loanType = searchParams.get("loan") || "personal";

  const [step, setStep] = useState<"form" | "success">("form");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [loanOffer, setLoanOffer] = useState<any>(null);

  const [userData, setUserData] = useState<UserSchama | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [recommendedBank, setRecommendedBank] = useState<RecommendedBank | null>(null);

  // --- PERSONAL DETAILS ---
  const [personal, setPersonal] = useState<PersonalDetails>({
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
    const saved = localStorage.getItem("mobileNumber");
    if (saved) {
      setMobile(saved);
    }
  }, []);

  // --- HELPERS ---
  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    )
      age--;
    return age;
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split("T")[0];
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

      try {
        setLoanSubmitting(true);
        const payload: any = {
          loanPurpose: "personal-loan",
          monthlyIncome: formData.netMonthlyIncome,
          loanAmountRequired: formData.requiredLoanAmount,
          emiTenure: "12",
          mobileNumber: mobile,
          employmentType: formData.employmentType as "salaried" | "self-employed",
          salaryPaymentMode: formData.salaryPaymentMode as "cash" | "inhand" | "bank",
          companyOrBusinessName: formData.companyOrBusinessName,
          companyPinCode: formData.companyPinCode,
        };

        // attach salarySlipUrl only if user uploaded one (optional)
        if (salarySlipUrl) {
          payload.salarySlipUrl = salarySlipUrl;
        }

        const response = await PersonalLoanApply.createPersonalLoan(payload);
        if (response?.success) {
          setLoanOffer(response.data.loanOffers || null);
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
        employmentType: businessForm.employmentType as "salaried" | "self-employed",
        businessName: businessForm.businessName,
        companyType: businessForm.companyType as
          | "Proprietorship"
          | "Partnership"
          | "Pvt Ltd"
          | "LLP"
          | "Others",
        annualTurnover: businessForm.annualTurnover,
        industryType: businessForm.industryType,
        registrationType: businessForm.registrationType as "GST" | "SHOP" | "FSSAI" | "TRADE" | "OTHERS",
        registrationNumber: businessForm.registrationNumber,
        incorporationDate: businessForm.incorporationDate,
        businessPincode: businessForm.businessPincode,
        mobileNumber: mobile,
      };

      const response = await BusinessLoanService.createBusinessLoan(payload);

      if (response?.success) {
        setLoanOffer(response?.data?.loanOffers || null);
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
  const handleSalarySlipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const BUCKET_NAME = "infinz";
      const publicUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
      setSalarySlipUrl(publicUrl);
    } catch (uploadErr: any) {
      console.error("Salary slip upload failed:", uploadErr);
      setError("Salary slip upload failed. Please try again.");
    } finally {
      setSalarySlipUploading(false);
    }
  };

  const loan = searchParams.get("loan");
  useEffect(() => {
    // Set flag when user visits the apply page
    sessionStorage.setItem("fromApplyPage", "true");
    console.log("ApplyNow page: Set fromApplyPage flag");

    // Optional: Store loan type for reference
    if (loan) {
      localStorage.setItem("lastLoanType", loan);
    }

    return () => {
      // Clear the flag only if navigating away via internal link (not back button)
      // We can't reliably detect back button here, so we'll clear it on Login page
    };
  }, [loan]);

  // ================================
  // ✅ UI
  // ================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* LEFT */}
          <div className="hidden md:flex bg-gradient-to-br from-[#0080E5] to-[#0066B3] text-white p-10 flex-col items-center justify-center">
            <Image
              src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
              width={260}
              height={260}
              alt="Loan Application"
            />
            <h2 className="text-2xl font-bold mt-4">Instant Loan upto ₹1Cr</h2>
            <p className="opacity-90">Fast approvals, no paperwork</p>
          </div>

          {/* RIGHT */}
          <div className="p-8">
            {/* LOAN - PERSONAL */}
            {step === "form" && loanType !== "business" && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Loan Details</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Personal loan application – share your income and employment details so we can process your request.
                </p>

                <div className="space-y-4">
                  {/* Required Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Income</label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Payment Mode</label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / Business Name</label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Pincode</label>
                    <input
                      maxLength={6}
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleSalarySlipChange} className="w-full text-sm" />
                    {salarySlipUploading && <p className="text-xs text-gray-500">Uploading...</p>}
                    {salarySlipUrl && !salarySlipUploading && <p className="text-xs text-green-600">Salary slip uploaded successfully.</p>}
                  </div>

                  <button
                    onClick={handleFormSubmit}
                    disabled={salarySlipUploading || loanSubmitting}
                    className={`w-full mt-4 font-semibold py-3 rounded-xl transition duration-200 ${
                      salarySlipUploading || loanSubmitting
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-[#0080E5] hover:bg-[#0066B3] text-white shadow-md"
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
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Business Loan Details</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Share your business details so we can process your business loan request.
                </p>

                <div className="space-y-4">
                  {/* Required Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Loan Amount (₹)</label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover</label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry / Nature of Business</label>
                    <input
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Registration Number</label>
                    <div className="flex gap-2">
                      <select
                        className="w-1/3 py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent bg-white"
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
                        className="flex-1 py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Incorporation / Start Date</label>
                    <input
                      type="date"
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Pincode</label>
                    <input
                      maxLength={6}
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] focus:border-transparent"
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
                    className={`w-full mt-4 font-semibold py-3 rounded-xl transition duration-200 ${
                      loanSubmitting
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-[#0080E5] hover:bg-[#0066B3] text-white shadow-md"
                    }`}
                  >
                    {loanSubmitting ? "Submitting..." : "Submit Business Loan"}
                  </button>
                </div>
              </>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <div className="space-y-6">
                {/* HEADER */}
                {loanOffer === null && (
                  <div className="text-center">
                    <CheckCircle size={60} className="text-green-600 mx-auto" />
                    <h2 className="text-2xl font-semibold mt-3 text-gray-900">Application submitted successfully</h2>
                    <p className="text-gray-600">We have received your application and will reach you shortly.</p>
                  </div>
                )}

                {/* If we have a bank offer, show it below the generic success message */}
                {loanOffer && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    {/* Bank Logo + Name */}
                    <p>
                      Congratulations! Your loan details match perfectly with {loanOffer.bankName}. To provide the best offers tailored to you. Tap the button below to securely continue your application.
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={loanOffer.bankLogo} alt={loanOffer.bankName} className="w-14 h-14 rounded-xl object-contain bg-gray-100 p-2" />
                      <h3 className="text-xl font-bold text-gray-900">{loanOffer.bankName}</h3>
                    </div>

                    {/* APPLY BUTTON */}
                    <a
                      href={loanOffer.utmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block w-full text-center bg-[#0080E5] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md"
                    >
                      View Bank Offer
                    </a>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
