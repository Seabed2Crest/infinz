import type { Metadata } from "next";
import AboutPage from "../components/About";

export const metadata: Metadata = {
  title: "About Infinz | Your Trusted Loan Partner",
  description:
    "Learn about Infinz, India’s trusted loan partner. Discover our mission, values, digital lending expertise, and how we help borrowers compare and choose smarter loan offers.",
  alternates: {
    canonical: "https://www.1infinz.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}