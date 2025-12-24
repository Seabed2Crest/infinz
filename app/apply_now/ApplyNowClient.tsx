"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Clock, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";

import {
  BusinessLoanService,
  PresignUrl,
  PersonalLoanApply,
} from "../services/data.service";

interface PersonalDetails {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
}

function ApplyNowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loanType = searchParams.get("loan") || "personal";

  const [step, setStep] = useState<"form" | "success">("form");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [personal, setPersonal] = useState<PersonalDetails | null>(null);

  const [formData, setFormData] = useState({
    requiredLoanAmount: "",
    employmentType: "salaried",
    netMonthlyIncome: "",
    salaryPaymentMode: "bank",
    companyOrBusinessName: "",
    companyPinCode: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const [businessForm, setBusinessForm] = useState({
    requiredLoanAmount: "",
    employmentType: "business-owner",
    businessName: "",
    companyType: "Proprietorship",
    annualTurnover: "",
    industryType: "Others",
    registrationType: "GST",
    registrationNumber: "",
    incorporationDate: today,
    businessPincode: "",
  });

  const [salarySlipUploading, setSalarySlipUploading] = useState(false);
  const [salarySlipUrl, setSalarySlipUrl] = useState<string | null>(null);
  const [loanSubmitting, setLoanSubmitting] = useState(false);

  useEffect(() => {
    const savedMobile = localStorage.getItem("mobileNumber");
    const savedPersonal = localStorage.getItem("personalDetails");
    const applyData = localStorage.getItem("applyData");

    if (savedMobile) setMobile(savedMobile);
    if (savedPersonal) setPersonal(JSON.parse(savedPersonal));

    // Pre-fill loan amount if user came from Landing Page
    if (applyData) {
      const data = JSON.parse(applyData);
      const numericAmount = data.loanAmount?.replace(/\D/g, "") || "";
      if (loanType === "business") {
        setBusinessForm(prev => ({ ...prev, requiredLoanAmount: numericAmount }));
      } else {
        setFormData(prev => ({ ...prev, requiredLoanAmount: numericAmount }));
      }
    }
  }, [loanType]);

const handleFormSubmit = async () => {
  setError("");


  if (!mobile || !personal) {
    setError("Session expired. Please restart the application.");
    return;
  }

  if (!personal.fullName || !personal.dob || !personal.panCard) {
    setError("Personal details missing. Please restart application.");
    setLoanSubmitting(false);
    return;
  }


  setLoanSubmitting(true);

  try {
    if (loanType === "business") {
      // 1. Basic UI Validation
      if (!businessForm.requiredLoanAmount || !businessForm.businessName || !businessForm.registrationNumber) {
        setError("Please fill all required business details");
        setLoanSubmitting(false);
        return;
      }

      // 2. Prepare the payload exactly as the Backend Controller expects it
      const payload = {
        ...businessForm,
        mobileNumber: mobile,
        // Identity fields pulled from the 'personal' state
        userName: personal.fullName,
        dateOfBirth: personal.dob,    
        panCardNumber: personal.panCard,
        email: personal.email, 

        // Structured registration details for the backend
        registrationTypes: [businessForm.registrationType],
        registrationNumbers: {
          [businessForm.registrationType]: businessForm.registrationNumber,
        },
        platform: "web"
      };

      console.log("Submitting Business Loan Payload:", payload);

      const response = await BusinessLoanService.createBusinessLoan(payload as any);
      
      if (response?.success) {
        setStep("success");
        toast.success("Application submitted successfully!");
      } else {
        setError(response?.message || "Application failed");
      }
    } else {
      // Personal Loan Submission Logic
      if (!formData.requiredLoanAmount || !formData.netMonthlyIncome) {
        setError("Loan amount and income are required");
        setLoanSubmitting(false);
        return;
      }

      const payload = {
        loanPurpose: "personal-loan",
        monthlyIncome: formData.netMonthlyIncome,
        loanAmountRequired: formData.requiredLoanAmount,
        emiTenure: "12",
        mobileNumber: mobile,
        salaryPaymentMode: formData.salaryPaymentMode,
        companyOrBusinessName: formData.companyOrBusinessName,
        companyPinCode: formData.companyPinCode,
        employmentType: formData.employmentType,
        salarySlipUrl: salarySlipUrl || undefined,
      };

      const response = await PersonalLoanApply.createPersonalLoan(payload as any);
      if (response?.success) {
        setStep("success");
      } else {
        setError(response?.message || "Application failed");
      }
    }
  } catch (err: any) {
    console.error("Submission Error:", err);
    setError(err.message || "An error occurred during submission.");
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoanSubmitting(false);
  }
};

  const handleSalarySlipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSalarySlipUploading(true);
    try {
      const presignRes = await PresignUrl.UploadFile({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        uploadType: "employee-salary-slip",
      });
      if (presignRes.success && presignRes.data?.[0]?.url) {
        const { url, key } = presignRes.data[0];
        await fetch(url, { method: "PUT", body: file });
        setSalarySlipUrl(`https://infinz.s3.amazonaws.com/${key}`);
        toast.success("Document uploaded");
      }
    } catch (err) { toast.error("Upload failed"); }
    finally { setSalarySlipUploading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* LEFT PANEL */}
          <div className="hidden md:flex bg-gradient-to-br from-[#0080E5] to-[#0066B3] text-white p-10 flex-col items-center justify-center">
            <Image src="/3d-hand-hold-smartphone-with-authentication-form.jpg" width={260} height={260} alt="Loan" priority />
            <h2 className="text-2xl font-bold mt-4 text-center">Instant Loan up to ₹1Cr</h2>
            <p className="opacity-90 text-center mt-2">Fast approvals • Digital process</p>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8">
            {step === "form" && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {loanType === "business" ? "Business Loan Details" : "Personal Loan Details"}
                </h2>

                <div className="space-y-4">
                  {/* AMOUNT */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Loan Amount (₹)</label>
                    <input
                      type="text"
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5]"
                      placeholder="e.g. 500000"
                      value={loanType === "business" ? businessForm.requiredLoanAmount : formData.requiredLoanAmount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (loanType === "business") setBusinessForm({ ...businessForm, requiredLoanAmount: val });
                        else setFormData({ ...formData, requiredLoanAmount: val });
                      }}
                    />
                  </div>

                  {/* EMPLOYMENT */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080E5] bg-white"
                      value={loanType === "business" ? businessForm.employmentType : formData.employmentType}
                      onChange={(e) => {
                        if (loanType === "business") setBusinessForm({ ...businessForm, employmentType: e.target.value });
                        else setFormData({ ...formData, employmentType: e.target.value });
                      }}
                    >
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="business-owner">Business Owner</option>
                    </select>
                  </div>

                  {loanType === "business" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                        <input
                          className="w-full py-3 px-3 border border-gray-300 rounded-lg"
                          value={businessForm.businessName}
                          onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Business</label>
                        <select
                          className="w-full py-3 px-3 border border-gray-300 rounded-lg bg-white"
                          value={businessForm.industryType}
                          onChange={(e) => setBusinessForm({ ...businessForm, industryType: e.target.value })}
                        >
                          <option value="Retail">Retail</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Services">Services</option>
                          <option value="Trading">Trading</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                          <select
                            className="w-full py-3 px-3 border border-gray-300 rounded-lg bg-white"
                            value={businessForm.companyType}
                            onChange={(e) => setBusinessForm({ ...businessForm, companyType: e.target.value })}
                          >
                            <option value="Proprietorship">Proprietorship</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Pvt Ltd">Pvt Ltd</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover</label>
                          <input
                            className="w-full py-3 px-3 border border-gray-300 rounded-lg"
                            value={businessForm.annualTurnover}
                            onChange={(e) => setBusinessForm({ ...businessForm, annualTurnover: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Details</label>
                        <div className="flex gap-2">
                          <select
                            className="w-1/3 py-3 px-3 border border-gray-300 rounded-lg bg-white"
                            value={businessForm.registrationType}
                            onChange={(e) => setBusinessForm({ ...businessForm, registrationType: e.target.value })}
                          >
                            <option value="GST">GST</option>
                            <option value="SHOP">Shop Est.</option>
                            <option value="FSSAI">FSSAI</option>
                            <option value="CIN">CIN</option>
                            <option value="OTHERS">Others</option>
                          </select>
                          <input
                            className="flex-1 py-3 px-3 border border-gray-300 rounded-lg"
                            placeholder="Reg No."
                            value={businessForm.registrationNumber}
                            onChange={(e) => setBusinessForm({ ...businessForm, registrationNumber: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Incorporation Date</label>
                          <input type="date" max={today} className="w-full py-3 px-3 border border-gray-300 rounded-lg" value={businessForm.incorporationDate} onChange={(e) => setBusinessForm({ ...businessForm, incorporationDate: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Pincode</label>
                          <input maxLength={6} className="w-full py-3 px-3 border border-gray-300 rounded-lg" value={businessForm.businessPincode} onChange={(e) => setBusinessForm({ ...businessForm, businessPincode: e.target.value.replace(/\D/g, "") })} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Income</label>
                        <input className="w-full py-3 px-3 border border-gray-300 rounded-lg" value={formData.netMonthlyIncome} onChange={(e) => setFormData({ ...formData, netMonthlyIncome: e.target.value.replace(/\D/g, "") })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                        <select className="w-full py-3 px-3 border border-gray-300 rounded-lg bg-white" value={formData.salaryPaymentMode} onChange={(e) => setFormData({ ...formData, salaryPaymentMode: e.target.value })}>
                          <option value="bank">Bank</option>
                          <option value="cash">Cash</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company/Shop Name</label>
                        <input className="w-full py-3 px-3 border border-gray-300 rounded-lg" value={formData.companyOrBusinessName} onChange={(e) => setFormData({ ...formData, companyOrBusinessName: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Pincode</label>
                        <input maxLength={6} className="w-full py-3 px-3 border border-gray-300 rounded-lg" value={formData.companyPinCode} onChange={(e) => setFormData({ ...formData, companyPinCode: e.target.value.replace(/\D/g, "") })} />
                      </div>
                    </>
                  )}

                  {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}

                  <button
                    onClick={handleFormSubmit}
                    disabled={loanSubmitting || salarySlipUploading}
                    className="w-full mt-6 bg-[#0080E5] hover:bg-[#0066B3] text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg disabled:opacity-50"
                  >
                    {loanSubmitting ? "Submitting..." : "Check Loan Eligibility"}
                  </button>
                </div>
              </>
            )}

            {step === "success" && (
              <div className="text-center py-10 space-y-6">
                 <div className="flex justify-center"><CheckCircle size={60} className="text-green-500" /></div>
                 <h2 className="text-2xl font-bold">Application Submitted!</h2>
                 <p className="text-gray-600">Our representative will call you within 24 hours.</p>
                 <button onClick={() => router.push("/")} className="text-[#0080E5] font-semibold">Return to Home</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplyNowClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#0080E5]" /></div>}>
      <ApplyNowContent />
    </Suspense>
  );
}