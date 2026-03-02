import type { Metadata } from "next";
import PersonalLoanPage from "../components/PersonalLoan";

export const metadata: Metadata = {
  title: "Instant Personal Loan Offers in India | Infinz",
  description:
    "Compare and apply for personal loans from top lenders with Infinz. Get instant approvals, great rates, and fast transfer of funds with a simple online process.",
  alternates: {
    canonical: "https://www.1infinz.com/personal-loan",
  },
  other: {
    "facebook-domain-verification": "gtbpf36jgkptgouwyuc0b0m13hfxjo",
  },
};

export default function Page() {
  return <PersonalLoanPage />;
}