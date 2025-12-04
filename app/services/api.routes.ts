export const API_ROUTES = {
    AUTH: {
        SEND_OTP: "/api/v1/auth/send-otp",
        VERIFY_OTP: "/api/v1/auth/verify-otp",
    },

    BUSINESS: {
        CREATE: "/api/v1/business/create",
    },
    BUSINESS_LEADS: {
        CREATE: "/api/v1/business/leads",
    },
    // ✅ Add Personal Loan routes here
    PERSONAL_LOAN: {
        CREATE: "/api/v1/loan/request",
    },
    PERSONAL_LOAN_LEAD: {
        CREATE: "/api/v1/personal-loan/create",
    },

    //LEAD FORM ROUTE
    LEAD_FORM: {
        CREATE: "/api/v1/leads/create"
    },

    //UTM LINKS ROUTE
    UTM_LINKS: {
        FILTER: "/api/v1/utm-links/filter"
    },

    PERSONAL_DETAILS: {
        UPDATE: "api/v1/users/me"
    },

    PRESIGN_URL:"/api/v1/presigned-url"
   
};