import type { Metadata } from "next";
import FinancialDictionaryPage from "../components/FinancialDictionary";

export const metadata: Metadata = {
  title: "Financial Dictionary – Terms & Meanings | Infinz",
  description:
    "Explore our financial dictionary to find definitions and meanings of key financial terms. Understand important loan concepts with simple explanations at Infinz.",
  alternates: {
    canonical: "https://www.1infinz.com/financial-dictionary",
  },
};

export default function Page() {
  return <FinancialDictionaryPage />;
}