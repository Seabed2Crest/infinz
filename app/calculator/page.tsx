import type { Metadata } from "next";
import CalculatorPage from "../components/Calculator";

export const metadata: Metadata = {
  title: " Smart Loan EMI Calculator | Instant Calculation | Infinz",
  description:
    "Use our EMI calculator to estimate monthly installments and total repayment instantly. Plan your loan smartly with accurate and real-time results.",
  alternates: {
    canonical: "https://www.1infinz.com/calculator",
  },
  other: {
    "facebook-domain-verification": "gtbpf36jgkptgouwyuc0b0m13hfxjo",
  },
};

export default function Page() {
  return <CalculatorPage />;
}