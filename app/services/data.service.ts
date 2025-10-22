import http from "../http.common";
import { API_ROUTES } from "./api.routes";

// ------------------- BUSINESS LOAN -------------------

// API request payload
export interface CreateBusinessPayload {
    businessType: string;
    turnover: number; // numeric as per backend
    loanAmount: number; // numeric as per backend
    mobileNumber: string;
    emiTenure: string;
}

// API response type
export interface BusinessResponse {
    businessType: string;
    turnover: number;
    loanAmount: number;
    mobileNumber: string;
    emiTenure: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Business Service
export const BusinessService = {
    createBusiness: async (
        payload: CreateBusinessPayload
    ): Promise<BusinessResponse> => {
        try {
            const response = await http.post(API_ROUTES.BUSINESS.CREATE, payload);
            return response.data;
        } catch (error: any) {
            console.error("❌ Error in BusinessService.createBusiness:", error);
            throw (
                error.response?.data ||
                new Error("Failed to create business loan application")
            );
        }
    },
};

// ------------------- PERSONAL LOAN -------------------

// API request payload
export interface CreatePersonalLoanPayload {
    loanPurpose: string;
    monthlyIncome: string;
    loanAmountRequired: string;
    emiTenure: string;
    mobileNumber: string;
}

// API response type
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

// Personal Loan Service
export const PersonalLoanService = {
    createPersonalLoan: async (
        payload: CreatePersonalLoanPayload
    ): Promise<PersonalLoanResponse> => {
        try {
            const response = await http.post(API_ROUTES.PERSONAL_LOAN.CREATE, payload);
            return response.data;
        } catch (error: any) {
            console.error("❌ Error in PersonalLoanService.createPersonalLoan:", error);
            throw (
                error.response?.data ||
                new Error("Failed to create personal loan application")
            );
        }
    },
};

// ------------------- LEAD FORM -------------------

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

// Lead Form Service
export const leadForm = {
    createLoan: async (formData: LoanFormData): Promise<LoanResponse> => {
        try {
            const res = await http.post(API_ROUTES.LEAD_FORM.CREATE, formData);
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
