//apply_now/ApplyNowClient.tsx
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

const REGISTRATION_MAPPING: Record<string, string> = {
  "GST Number": "GST",
  "Shop and Establishment": "SHOP",
  "FSSAI": "FSSAI",
  "Trade License": "TRADE",
  "Others": "OTHERS",
};


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
    incorporationDate: today,
    businessPincode: "",
  });

  // State for Checkbox registrations
  const [registrations, setRegistrations] = useState<string[]>([]);

  const [salarySlipUploading, setSalarySlipUploading] = useState(false);
  const [salarySlipUrl, setSalarySlipUrl] = useState<string | null>(null);
  const [loanSubmitting, setLoanSubmitting] = useState(false);

  useEffect(() => {
    const savedMobile = localStorage.getItem("mobileNumber");
    const savedPersonal = localStorage.getItem("personalDetails");
    const applyData = localStorage.getItem("applyData");

    if (savedMobile) setMobile(savedMobile);
    if (savedPersonal) setPersonal(JSON.parse(savedPersonal));

    if (applyData) {
      const data = JSON.parse(applyData);
      const numericAmount = data.loanAmount?.replace(/\D/g, "") || "";
      if (loanType === "business") {
        setBusinessForm(prev => ({ ...prev, requiredLoanAmount: numericAmount }));
        // Pre-fill checkboxes if they were selected on the landing page
         if (data.registrations && data.registrations.length > 0) {
           setRegistrations(data.registrations);
        }
      } else {
        setFormData(prev => ({ ...prev, requiredLoanAmount: numericAmount }));
      }
    }
  }, [loanType]);

  const handleRegistrationChange = (value: string) => {
    setRegistrations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // const handleFormSubmit = async () => {
  //   setError("");

  //   if (!mobile || !personal) {
  //     setError("Session expired. Please restart the application.");
  //     return;
  //   }

  //   if (!personal.fullName || !personal.dob || !personal.panCard) {
  //     setError("Personal details missing. Please restart application.");
  //     setLoanSubmitting(false);
  //     return;
  //   }

  //   setLoanSubmitting(true);

  //   try {
  //     if (loanType === "business") {
  //       if (!businessForm.requiredLoanAmount || !businessForm.businessName || registrations.length === 0) {
  //         setError("Please fill all details and select at least one registration type");
  //         setLoanSubmitting(false);
  //         return;
  //       }

  //       // Map the display labels to backend keys (GST, SHOP, etc.)
  //       const mappedTypes = registrations.map(r => REGISTRATION_MAPPING[r] || "OTHERS");
        
  //       // Create the structured registration numbers object required by backend
  //       const regNumbers: Record<string, string> = {};
  //       mappedTypes.forEach(type => {
  //           regNumbers[type] = "Provided"; // Placeholder since user is only selecting
  //       });

  //       const payload = {
  //         ...businessForm,
  //         mobileNumber: mobile,
  //         userName: personal.fullName,
  //         dateOfBirth: personal.dob,    
  //         panCardNumber: personal.panCard,
  //         email: personal.email, 
  //         registrationTypes: mappedTypes,
  //         registrationNumbers: regNumbers,
  //         platform: "web"
  //       };

  //       const response = await BusinessLoanService.createBusinessLoan(payload as any);
        
  //       if (response?.success) {
  //         setStep("success");
  //         toast.success("Application submitted successfully!");
  //       } else {
  //         setError(response?.message || "Application failed");
  //       }
  //     } else {
  //       // Personal Loan Submission
  //       if (!formData.requiredLoanAmount || !formData.netMonthlyIncome) {
  //         setError("Loan amount and income are required");
  //         setLoanSubmitting(false);
  //         return;
  //       }

  //       const payload = {
  //         loanPurpose: "personal-loan",
  //         monthlyIncome: formData.netMonthlyIncome,
  //         loanAmountRequired: formData.requiredLoanAmount,
  //         emiTenure: "12",
  //         mobileNumber: mobile,
  //         salaryPaymentMode: formData.salaryPaymentMode,
  //         companyOrBusinessName: formData.companyOrBusinessName,
  //         companyPinCode: formData.companyPinCode,
  //         employmentType: formData.employmentType,
  //         salarySlipUrl: salarySlipUrl || undefined,
  //       };

  //       const response = await PersonalLoanApply.createPersonalLoan(payload as any);
  //       if (response?.success) {
  //         setStep("success");
  //       } else {
  //         setError(response?.message || "Application failed");
  //       }
  //     }
  //   } catch (err: any) {
  //     setError(err.message || "An error occurred during submission.");
  //     toast.error("An error occurred. Please try again.");
  //   } finally {
  //     setLoanSubmitting(false);
  //   }
  // };

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
      // ✅ VALIDATION
      if (!businessForm.requiredLoanAmount || !businessForm.businessName) {
        setError("Please fill all required details");
        setLoanSubmitting(false);
        return;
      }

       if (registrations.length === 0) {
      setError("Please select at least one business registration type");
      setLoanSubmitting(false);
      return;
    }
      
      // ✅ FIX: Map display labels to backend keys correctly
      const mappedTypes = registrations.map(r => REGISTRATION_MAPPING[r]).filter(Boolean);

       console.log("🔍 Selected registrations (display):", registrations);
  console.log("🔍 Mapped registrations (backend):", mappedTypes);
   
      
      // ✅ FIX: Create registration numbers object
    const regNumbers: Record<string, string> = {};
    mappedTypes.forEach(type => {
        regNumbers[type as string] = "Provided"; 
    });
      
      // ✅ FIX: Construct payload with correct field mapping
      const payload = {
        requiredLoanAmount: businessForm.requiredLoanAmount,
        businessName: businessForm.businessName,
        companyType: businessForm.companyType,
        annualTurnover: businessForm.annualTurnover,
        industryType: businessForm.industryType,
        incorporationDate: businessForm.incorporationDate,
        businessPincode: businessForm.businessPincode,
        employmentType: businessForm.employmentType,
        
        // ✅ Identity fields from personal details
        userName: personal.fullName,
        dateOfBirth: personal.dob,
        panCardNumber: personal.panCard,
        email: personal.email,
        mobileNumber: mobile,
        
        // ✅ Registration data (the fix!)
        registrationTypes: mappedTypes,  // ["GST", "SHOP", etc.]
        registrationNumbers: regNumbers, // { GST: "Provided", SHOP: "Provided" }
        
        platform: "web"
      };
      
      console.log("📤 Sending Business Loan Payload:", payload);
      console.log("🔍 Selected registrations (UI):", registrations);
console.log("🔍 Mapped registrations (Backend):", registrations.map(r => REGISTRATION_MAPPING[r]));

// In the payload before sending:
console.log("📤 Sending Payload:", {
  // ... other fields
  registrationTypes: mappedTypes,
  registrationNumbers: regNumbers,
});
      
      const response = await BusinessLoanService.createBusinessLoan(payload as any);
      
      if (response?.success) {
        setStep("success");
        toast.success("Application submitted successfully!");
      } else {
        setError(response?.message || "Application failed");
      }
      
    } else {
      // Personal Loan logic (unchanged)
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
    setError(err.message || "An error occurred during submission.");
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoanSubmitting(false);
  }
};

 useEffect(() => {
  console.log("🔍 Current registrations state:", registrations);
}, [registrations]);


  
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
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
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
                            <option value="LLP">LLP</option>
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

                    {/* // In ApplyNowContent.tsx */}
{/* Registration Checkboxes Section */}
<div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
  <p className="text-sm font-bold text-blue-800 mb-3">
    Business Registration Number <span className="text-red-500">*</span>
  </p>
  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
   {["GST Number", "Shop and Establishment", "FSSAI", "Trade License", "Others"].map((item) => (
  <label key={item} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer p-1">
    <input
      type="checkbox"
      checked={registrations.includes(item)}
      onChange={() => {
        console.log("Checkbox clicked:", item); 
        handleRegistrationChange(item);
      }}
      className="h-4 w-4 text-blue-600 rounded"
    />
    <span>{item}</span>
  </label>
))}
  </div>
  {registrations.length === 0 && (
    <p className="text-red-500 text-xs mt-2">Please select at least one registration type</p>
  )}
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
                    disabled={loanSubmitting}
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