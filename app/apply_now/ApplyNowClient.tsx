//apply_now/ApplyNowClient.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
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
  FSSAI: "FSSAI",
  "Trade License": "TRADE",
  Others: "OTHERS",
};

function ApplyNowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loanType = searchParams.get("loan") || "personal";

  const [step, setStep] = useState<"form" | "success">("form");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [personal, setPersonal] = useState<PersonalDetails | null>(null);
  const [loanOffer, setLoanOffer] = useState<any>(null);

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

  const [registrations, setRegistrations] = useState<string[]>([]);
  const [salarySlipUploading, setSalarySlipUploading] = useState(false);
  const [salarySlipUrl, setSalarySlipUrl] = useState<string | null>(null);
  const [loanSubmitting, setLoanSubmitting] = useState(false);

  // ---------------------------------------
  // Load personal data from previous steps
  // ---------------------------------------
  useEffect(() => {
    const savedMobile = localStorage.getItem("mobileNumber");
    const savedPersonal = localStorage.getItem("personalDetails");
    const applyData = localStorage.getItem("applyData");

    if (savedMobile) setMobile(savedMobile);
    if (savedPersonal) setPersonal(JSON.parse(savedPersonal));

    if (applyData) {
      const data = JSON.parse(applyData);
      let numericAmount = data.loanAmount?.replace(/[^\d]/g, "") || "";

      // If the cleaned value is less than 4 digits (like 510), treat it as invalid and clear it
      if (numericAmount.length < 4) {
        numericAmount = ""; // prevents showing 510
      }

      if (loanType === "business") {
        setBusinessForm((prev) => ({
          ...prev,
          requiredLoanAmount: numericAmount,
        }));
        if (data.registrations) setRegistrations(data.registrations);
      } else {
        setFormData((prev) => ({ ...prev, requiredLoanAmount: numericAmount }));
      }
    }
  }, [loanType]);

  // -----------------------------------------------------
  // Salary Slip Upload Function (Presigned URL)
  // -----------------------------------------------------
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
        setError("Failed to get upload URL");
        setSalarySlipUploading(false);
        return;
      }

      const { url, key } = presignRes.data[0];

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const BUCKET = "infinz";
      const publicUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;
      setSalarySlipUrl(publicUrl);
    } catch (err) {
      setError("Salary slip upload failed. Please try again.");
    } finally {
      setSalarySlipUploading(false);
    }
  };

  // -----------------------------------------------------
  // Submit Form (Personal & Business Loan)
  // -----------------------------------------------------
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
      // ---------------- Business Loan ----------------
      if (loanType === "business") {
        if (!businessForm.requiredLoanAmount || !businessForm.businessName) {
          setError("Please fill all required details");
          setLoanSubmitting(false);
          return;
        }

        const mappedTypes = registrations.map(
          (r) => REGISTRATION_MAPPING[r] || "OTHERS"
        );
        const regNumbers: Record<string, string> = {};
        mappedTypes.forEach((type) => {
          regNumbers[type] = "Provided";
        });

        const payload = {
          ...businessForm,
          mobileNumber: mobile,
          userName: personal.fullName,
          dateOfBirth: personal.dob,
          panCardNumber: personal.panCard,
          email: personal.email,
          registrationTypes: mappedTypes,
          registrationNumbers: regNumbers,
          platform: "web",
        };

        const response = await BusinessLoanService.createBusinessLoan(
          payload as any
        );

        if (response?.success) {
          if (response?.data?.loanOffers)
            setLoanOffer(response.data.loanOffers);
          setStep("success");
          toast.success("Application submitted successfully!");
        } else {
          setError(response?.message || "Application failed");
        }
      }

      // ---------------- Personal Loan ----------------
      else {
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

        const response = await PersonalLoanApply.createPersonalLoan(
          payload as any
        );

        if (response?.success) {
          if (response?.data?.loanOffers)
            setLoanOffer(response.data.loanOffers);
          setStep("success");
        } else setError(response?.message || "Application failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during submission.");
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoanSubmitting(false);
    }
  };

  // ---------------------------------------
  // UI Rendering
  // ---------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-xl rounded-3xl max-w-4xl mx-auto grid md:grid-cols-2 overflow-hidden">
          {/* LEFT PANEL */}
          <div className="hidden md:flex bg-gradient-to-br from-[#0080E5] to-[#0066B3] text-white p-10 flex-col items-center justify-center">
            <Image
              src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
              width={260}
              height={260}
              alt="Loan"
              priority
            />
            <h2 className="text-2xl font-bold mt-4 text-center">
              Instant Loan up to ₹1Cr
            </h2>
            <p className="opacity-90 text-center mt-2">
              Fast approvals • Digital process
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8">
            {/* FORM SCREEN */}
            {step === "form" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                  {loanType === "business"
                    ? "Business Loan Details"
                    : "Personal Loan Details"}
                </h2>

                <div className="space-y-4">
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      type="text"
                      className="w-full py-3 px-3 border rounded-lg"
                      placeholder="e.g. 500000"
                      value={
                        loanType === "business"
                          ? businessForm.requiredLoanAmount
                          : formData.requiredLoanAmount
                      }
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        loanType === "business"
                          ? setBusinessForm({
                              ...businessForm,
                              requiredLoanAmount: val,
                            })
                          : setFormData({
                              ...formData,
                              requiredLoanAmount: val,
                            });
                      }}
                    />
                  </div>

                  {/* -------------- BUSINESS FORM -------------- */}
                  {loanType === "business" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Business Name
                        </label>
                        <input
                          className="w-full py-3 px-3 border rounded-lg"
                          value={businessForm.businessName}
                          onChange={(e) =>
                            setBusinessForm({
                              ...businessForm,
                              businessName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Annual Turnover
                        </label>
                        <input
                          className="w-full py-3 px-3 border border-gray-300 rounded-lg"
                          placeholder="e.g. 2000000"
                          value={businessForm.annualTurnover}
                          onChange={(e) =>
                            setBusinessForm({
                              ...businessForm,
                              annualTurnover: e.target.value.replace(/\D/g, ""), // numeric only
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Nature of Business
                        </label>
                        <select
                          className="w-full py-3 px-3 border rounded-lg bg-white"
                          value={businessForm.industryType}
                          onChange={(e) =>
                            setBusinessForm({
                              ...businessForm,
                              industryType: e.target.value,
                            })
                          }
                        >
                          <option value="Retail">Retail</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Services">Services</option>
                          <option value="Trading">Trading</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      {/* Business Registration (Checkboxes) */}
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm font-bold text-blue-800 mb-3">
                          Business Registration Number
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {[
                            "GST Number",
                            "Shop and Establishment",
                            "FSSAI",
                            "Trade License",
                            "Others",
                          ].map((item) => (
                            <label
                              key={item}
                              className="flex items-center space-x-2 text-sm cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={registrations.includes(item)}
                                onChange={() =>
                                  setRegistrations((prev) =>
                                    prev.includes(item)
                                      ? prev.filter((i) => i !== item)
                                      : [...prev, item]
                                  )
                                }
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm mb-1">
                            Incorporation Date
                          </label>
                          <input
                            type="date"
                            max={today}
                            className="w-full py-3 px-3 border rounded-lg"
                            value={businessForm.incorporationDate}
                            onChange={(e) =>
                              setBusinessForm({
                                ...businessForm,
                                incorporationDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">
                            Business Pincode
                          </label>
                          <input
                            maxLength={6}
                            className="w-full py-3 px-3 border rounded-lg"
                            value={businessForm.businessPincode}
                            onChange={(e) =>
                              setBusinessForm({
                                ...businessForm,
                                businessPincode: e.target.value.replace(
                                  /\D/g,
                                  ""
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* -------------- PERSONAL LOAN FORM -------------- */
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Net Monthly Income
                        </label>
                        <input
                          className="w-full py-3 px-3 border rounded-lg"
                          value={formData.netMonthlyIncome}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              netMonthlyIncome: e.target.value.replace(
                                /\D/g,
                                ""
                              ),
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Payment Mode
                        </label>
                        <select
                          className="w-full py-3 px-3 border rounded-lg bg-white"
                          value={formData.salaryPaymentMode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              salaryPaymentMode: e.target.value,
                            })
                          }
                        >
                          <option value="bank">Bank</option>
                          <option value="cash">Cash</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Company Name
                        </label>
                        <input
                          className="w-full py-3 px-3 border rounded-lg"
                          value={formData.companyOrBusinessName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyOrBusinessName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Office Pincode
                        </label>
                        <input
                          maxLength={6}
                          className="w-full py-3 px-3 border rounded-lg"
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
                        <label className="block text-sm font-medium">
                          Upload Salary Slip (optional)
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleSalarySlipChange}
                          className="w-full text-sm"
                        />
                        {salarySlipUploading && (
                          <p className="text-xs text-gray-600">Uploading...</p>
                        )}
                        {salarySlipUrl && !salarySlipUploading && (
                          <p className="text-xs text-green-600">
                            Uploaded successfully ✔
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleFormSubmit}
                    disabled={loanSubmitting}
                    className="w-full mt-6 bg-[#0080E5] hover:bg-[#0066B3] text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {loanSubmitting
                      ? "Submitting..."
                      : "Check Loan Eligibility"}
                  </button>
                </div>
              </>
            )}

            {/* SUCCESS SCREEN WITH BANK OFFER */}
            {step === "success" && (
              <div className="space-y-6 text-center py-10">
                {/* if NO loan match */}
                {!loanOffer && (
                  <>
                    <CheckCircle size={60} className="text-green-600 mx-auto" />
                    <h2 className="text-2xl font-bold">
                      Thank you for visiting Infinz
                    </h2>
                    <p className="text-gray-600">
                      We couldn’t match eligibility at this moment.
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className="text-[#0080E5] font-semibold mt-4"
                    >
                      Return to Home
                    </button>
                  </>
                )}

                {/* if MATCH FOUND */}
                {loanOffer && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-green-600 mb-2">
                      🎉 Congratulations!
                    </h2>
                    <p className="text-gray-700 mb-4">
                      We found a match with <b>{loanOffer.bankName}</b>.
                      Continue to view your best offer.
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-6">
                      <img
                        src={`https://infinz.s3.amazonaws.com/${loanOffer.logoImage}`}
                        alt={loanOffer.bankName}
                        className="w-14 h-14 rounded-xl bg-gray-100 p-2"
                      />
                      <h3 className="text-xl font-bold">
                        {loanOffer.bankName}
                      </h3>
                    </div>

                    <a
                      href={loanOffer.utmLink}
                      target="_blank"
                      className="block w-full bg-[#0080E5] hover:bg-[#0066B3] text-white font-semibold py-3 rounded-xl shadow-md"
                    >
                      View Bank Offer
                    </a>
                  </div>
                )}
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-[#0080E5]" />
        </div>
      }
    >
      <ApplyNowContent />
    </Suspense>
  );
}
