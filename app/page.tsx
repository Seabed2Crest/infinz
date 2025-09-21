import Hero from "./components/Hero";
import LoanTypes from "./components/LoanTypes";
import Stories from "./components/Stories";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import Steps from "./components/Steps";
import Security from "./components/Security";
import Faq from "./components/Faq";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Cta from "./components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LoanTypes />
      <Stories />
      <Features />
      <Comparison />
      <Steps />
      <Security />
      <Faq />
      <Testimonials />
      <Blogs />
      <Cta />
    </>
  );
}
