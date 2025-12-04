// otpservice.ts
import http from "../http.common";
import { API_ROUTES } from "./api.routes";

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
  origin?: string;
}


export interface UserSchama {
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    pancardNumber: string;
    pinCode: string;
    maritalStatus: string | null;
}

export interface Token {
    accessToken: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        user: UserSchama;
        token: Token;
    };
}

export const OtpService = {
    // Send OTP
    sendOtp: async (phoneNumber: string): Promise<{ success: boolean; status: number; message: string; data: any }> => {
        const response = await http.post(API_ROUTES.AUTH.SEND_OTP, { phoneNumber });
        return response.data;
    },

    // Verify OTP
    verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
        const response = await http.post(API_ROUTES.AUTH.VERIFY_OTP, payload);
        return response.data;
    },
};