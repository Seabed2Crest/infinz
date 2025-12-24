//
import http, { BASE_URL } from "../http.common";
import { API_ROUTES } from "./api.routes";

// ------------------- BUSINESS LOAN -------------------

// API request payload
export interface CreateBusinessPayload {
  requiredLoanAmount: string;
  employmentType: "salaried" | "self-employed" | "business-owner";
  businessName: string;
  companyType?: "Proprietorship" | "Partnership" | "Pvt Ltd" | "LLP" | "Others";
  annualTurnover?: string;
  industryType?: string;
  registrationTypes?: string[];
  registrationNumbers: {
    GST?: string;
    SHOP?: string;
    FSSAI?: string;
    TRADE?: string;
    OTHERS?: string;
  };
  incorporationDate?: string;
  businessPincode?: string;
  mobileNumber?: string;
}

export interface BusinessPayloadString {
  businessType: string;
  turnover: string;
  loanAmount: string;
  mobileNumber: string;
  emiTenure: string;
}


export interface BusinessResponse {
  _id: string;
  businessType: string;
  turnover: string;
  loanAmount: string;
  mobileNumber: string;
  emiTenure: string;
}

// Business Service
export const BusinessService = {
  createBusiness: async (payload: BusinessPayloadString): Promise<BusinessResponse> => {
    try {
      const response = await http.post(API_ROUTES.BUSINESS_LEADS.CREATE, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error("Lead creation failed");
    }
  },
};


// ------------------- PERSONAL LOAN -------------------



export interface CreatePersonalLoanPayload {
  loanPurpose: string;
  monthlyIncome: string;
  loanAmountRequired: string;
  emiTenure: string;
  mobileNumber: string;
  salarySlipUrl?: string;
  employmentType?: string;
  salaryPaymentMode?: string;
  companyOrBusinessName?: string;
  companyPinCode?: string;
}



// API response type
export interface PersonalLoanResponse {
  success: boolean;
  message: string;
  data:any
}

// Personal Loan Service
export const PersonalLoanService = {
  createPersonalLoan: async (
    payload: CreatePersonalLoanPayload
  ): Promise<PersonalLoanResponse> => {
    try {
      const response = await http.post(
        API_ROUTES.PERSONAL_LOAN_LEAD.CREATE,
        payload
      );
      return response.data as PersonalLoanResponse;
    } catch (error: any) {
      console.error(
        "❌ Error in PersonalLoanService.createPersonalLoan:",
        error
      );
      throw (
        error.response?.data ||
        new Error("Failed to create personal loan application")
      );
    }
  },
};

export const PersonalLoanApply = {
  createPersonalLoan: async (payload: CreatePersonalLoanPayload) => {
    try {
      const actualPayload = {
        employmentType: payload.employmentType,
        netMonthlyIncome: payload.monthlyIncome,
        paymentMode: payload.salaryPaymentMode,
        companyOrBusinessName: payload.companyOrBusinessName,
        companyPinCode: payload.companyPinCode,
        salarySlipDocument: payload.salarySlipUrl,
        desiredAmount: payload.loanAmountRequired,
        platform: "web",
        mobileNumber: payload.mobileNumber
      };
      const response = await http.post(API_ROUTES.PERSONAL_LOAN.CREATE, actualPayload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error("Personal loan failed");
    }
  },
};
export interface LoanFormData {
  name: string;
  city: string;
  pincode: string;
  loanType: string;
  amount: string;
  tenure: string;
  mobileNumber: string;
}
interface RecommendedBank {
  bankName: string;
  utmLink: string;
  priority: number;
  loanAmountRange?: {  // ✅ Made optional
    min: string;
    max: string;
  };
  salaryRequired?: string;  // ✅ Made optional
  ageRange?: {  // ✅ Made optional
    min: string;
    max: string;
  };
}

export interface LoanResponse {
  success: boolean;
  message: string;
  data: any;
  recommendedBank?: RecommendedBank;
}


// Lead Form Service
export const leadForm = {
  createLoan: async (formData: LoanFormData): Promise<LoanResponse> => {
    try {
      const res = await http.post(API_ROUTES.LEAD_FORM.CREATE, formData);

      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
        recommendedBank: res.data.recommendedBank,
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.response?.data?.error || err.message || "Something went wrong",
        data: null,
        recommendedBank: undefined,
      };
    }
  },
};



export const blogApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/api/v1/blogs`);
    return res.json();
  },

  getBySlug: async (slug: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/blogs/${slug}`);
    return res.json();
  },
};

// ------------------- NEWS & PRESS RELEASES -------------------

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  type: "news" | "press-release";
  summary: string;
  content: string;
  imageUrl: string;
  imageKey?: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export const newsApi = {
  getAll: async (type?: "news" | "press-release") => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    const query = params.toString();
    const res = await fetch(
      `${BASE_URL}/api/v1/news${query ? `?${query}` : ""}`
    );
    return res.json();
  },
  getById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/news/${id}`);
    return res.json();
  },
};




// ------------------- PERSONAL DETAILS -------------------

export interface CreatePersonalDetailsPayload {
  fullName: string;
  email: string;
  dob: string;
  panCard: string;
  pincode: string;
}

export interface PersonalDetailsResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    fullName: string;
    email: string;
    dob: string;
    panCard: string;
    pincode: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const personalDetailsService = {
  save: async (
    payload: CreatePersonalDetailsPayload
  ): Promise<PersonalDetailsResponse> => {
    try {

      const actualPayload = {
        fullName: payload.fullName,

        email: payload.email,

        pancardNumber: payload.panCard,

        pinCode: payload.pincode,
        dateOfBirth: payload.dob,
      }
      const res = await http.put(API_ROUTES.PERSONAL_DETAILS.UPDATE, actualPayload);

      return {
        success: true,
        message: res.data.message || "Saved successfully",
        data: res.data.data,
      };

    } catch (error: any) {
      console.error("❌ Error in personalDetailsService.save:", error);

      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.message ||
          "Failed to save personal details",
        data: null as any,
      };
    }
  },
};


// ------------------- BUSINESS LOAN (DETAILED) -------------------


export interface CreateBusinessLoanPayload {
  requiredLoanAmount: string;
  businessName: string;
  companyType: "Proprietorship" | "Partnership" | "Pvt Ltd" | "LLP" | "Others";
  annualTurnover: string;
  industryType: string;
   registrationTypes?: string[];
  registrationNumbers: {
    GST?: string;
    SHOP?: string;
    FSSAI?: string;
    TRADE?: string;
    OTHERS?: string;
  };
  incorporationDate: string;
  businessPincode: string;
  mobileNumber: string;
  // IDENTITY FIELDS REQUIRED BY BACKEND
  userName: string;
  dateOfBirth: string;
  panCardNumber: string;
  email: string;
  employmentType?: string;
}

export interface BusinessLoanResponse {
  success: boolean;
  message: string;
  data:any
}

// export const BusinessLoanService = {
//   createBusinessLoan: async (
//     payload: CreateBusinessLoanPayload
//   ): Promise<BusinessLoanResponse> => {
//     try {

//       const apiPayload = {
//         requiredLoanAmount: payload.requiredLoanAmount,
       
//         businessName: payload.businessName,
//         companyType: payload.companyType,
//         annualTurnover: payload.annualTurnover,
//         industryType: payload.industryType,
//         registrationTypes: [payload.registrationType],
//         registrationNumbers: {
//           [payload.registrationType]: payload.registrationNumber,
//         },
//         incorporationDate: payload.incorporationDate,
//         businessPincode: payload.businessPincode,
//         mobileNumber: payload.mobileNumber,
//       };

//       const res = await http.post(
//         API_ROUTES.BUSINESS.CREATE,
//         apiPayload
//       );

//       return {
//         success: true,
//         message: res.data.message,
//         data: res.data.data,
//       };

//     } catch (error: any) {
//       console.error("❌ Error in BusinessLoanService.createBusinessLoan:", error);

//       return {
//         success: false,
//         message:
//           error.response?.data?.error ||
//           error.message ||
//           "Failed to submit business loan",
//         data: null as any,
//       };
//     }
//   },
// };

export const BusinessLoanService = {
  createBusinessLoan: async (payload: CreateBusinessLoanPayload) => {
    try {
      const apiPayload = {
        requiredLoanAmount: payload.requiredLoanAmount,
        businessName: payload.businessName,
        companyType: payload.companyType,
        annualTurnover: payload.annualTurnover,
        industryType: payload.industryType,
        registrationTypes: payload.registrationTypes,
       registrationNumbers: payload.registrationNumbers,
        incorporationDate: payload.incorporationDate,
        businessPincode: payload.businessPincode,
        mobileNumber: payload.mobileNumber,
        // BACKEND MAPPING
        userName: payload.userName,
        dateOfBirth: payload.dateOfBirth,
        panCardNumber: payload.panCardNumber,
         email: payload.email, 
        employmentType: payload.employmentType || "business-owner",
        platform: "web"
      };
      const res = await http.post(API_ROUTES.BUSINESS.CREATE, apiPayload);
      return res.data;
    } catch (error: any) {
      throw error.response?.data || new Error("Business loan failed");
    }
  },
};


interface PresignUrlType {
  fileName: string;
  fileType: string;
  uploadType: string;
}

// export const PresignUrl = {
//   UploadFile: async (payload: PresignUrlType) => {
//     try {
//       const apiPayload = {
//         files: [
//           {
//             fileName: payload.fileName,
//             fileType: payload.fileType,
//           },
//         ],
//         uploadType: payload.uploadType,
//       };

//       const res = await http.post(API_ROUTES.PRESIGN_URL, apiPayload);

//       return {
//         success: true,
//         message: res.data.message,
//         data: res.data.data,
//       };
//     } catch (error: any) {
//       console.error("❌ Error in PresignUrl.UploadFile:", error);

//       return {
//         success: false,
//         message:
//           error.response?.data?.error ||
//           error.message ||
//           "Failed to upload file",
//         data: null as any,
//       };
//     }
//   },
// };

export const PresignUrl = {
  UploadFile: async (payload: { fileName: string; fileType: string; uploadType: string }) => {
    try {
      const apiPayload = {
        files: [{ fileName: payload.fileName, fileType: payload.fileType }],
        uploadType: payload.uploadType,
      };
      const res = await http.post(API_ROUTES.PRESIGN_URL, apiPayload);
      return { success: true, data: res.data.data };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },
};

