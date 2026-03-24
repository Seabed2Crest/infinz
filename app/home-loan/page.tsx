import type { Metadata } from "next";
import HomeLoan from "../components/HomeLoan";

export const metadata: Metadata = {
  title: "Trusted Business Loan Solutions in India | Infinz",
  description:
    "Find reliable business loan options online with Infinz. Compare lender offers, get fast approval, flexible tenures, and quick funds for your enterprise growth.",
  alternates: {
    canonical: "https://www.1infinz.com/business-loan",
  },
  other: {
    "facebook-domain-verification": "gtbpf36jgkptgouwyuc0b0m13hfxjo",
  },
};

export default function Page() {
  return <HomeLoan/>;
}