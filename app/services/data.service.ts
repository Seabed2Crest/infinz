import http from "../http.common";
import { API_ROUTES } from "./api.routes";

export interface CreateBusinessPayload {
    businessType: string;
    turnover: string;
    loanAmount: string;
    mobileNumber: string;
}

export interface BusinessResponse {
    businessType: string;
    turnover: string;
    loanAmount: string;
    mobileNumber: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const BusinessService = {
    // Create new business application
    createBusiness: async (payload: CreateBusinessPayload): Promise<BusinessResponse> => {
        const response = await http.post(API_ROUTES.BUSINESS.CREATE, payload);
        return response.data;
    },
};

// ✅ Personal Loan Interfaces
export interface CreatePersonalLoanPayload {
    loanPurpose: string;
    monthlyIncome: string;
    loanAmountRequired: string;
    emiTenure: string;
    mobileNumber: string;
}

export interface PersonalLoanResponse {
    loanPurpose: string;
    monthlyIncome: string;
    loanAmountRequired: string;
    emiTenure: string;
    mobileNumber: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// ✅ Personal Loan Service
export const PersonalLoanService = {
    createPersonalLoan: async (payload: CreatePersonalLoanPayload): Promise<PersonalLoanResponse> => {
        const response = await http.post(API_ROUTES.PERSONAL_LOAN.CREATE, payload);
        return response.data;
    },
};

//leads form
export interface LoanFormData {
    name: string;
    city: string;
    pincode: string;
    loanType: string;
    amount: string;
    tenure: string;
    mobileNumber: string;
}

export interface LoanResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const leadFrom = {
    createLoan: async (formData: LoanFormData): Promise<LoanResponse> => {
        try {
            const res = await http.post(API_ROUTES.LEAD_FORM.CREATE, formData); // <-- FIXED

            return {
                success: true,
                message: res.data.message,
                data: res.data.data,
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.error || err.message || "Something went wrong",
            };
        }
    },
};

