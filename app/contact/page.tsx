import type { Metadata } from "next";
import ContactPage from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Loan Assistance & Support | Infinz",
  description:
    "Contact Infinz for support, loan assistance, or business inquiries. Our team is here to help you compare offers, check eligibility, and answer your loan questions.",
  alternates: {
    canonical: "https://www.1infinz.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}