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

