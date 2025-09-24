'use client';

import { useState } from "react";
import Hero from "./components/Hero";
import LoanTypes from "./components/LoanTypes";
import Products from "./components/Products";
import WhyChoose from "./components/WhyChoose";
import CreditScore from "./components/CreditScore";
import LoanSteps from "./components/LoanSteps";
import OurLenders from "./components/OurLenders";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import Steps from "./components/Steps";
import Security from "./components/Security";
import Faq from "./components/Faq";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Cta from "./components/Cta";
import LoanApplicationModal from "./components/LoanApplicationModal";
import LeadFormModal from "./components/LeadFormModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  return (
    <>
      <Hero 
        onOpenModal={() => setIsModalOpen(true)} 
        onOpenLeadForm={() => setIsLeadFormOpen(true)} 
      />
      <LoanTypes onOpenModal={() => setIsModalOpen(true)} />
      <Products />
      <WhyChoose onOpenModal={() => setIsModalOpen(true)} />
      <CreditScore onOpenModal={() => setIsModalOpen(true)} />
      <LoanSteps onOpenModal={() => setIsModalOpen(true)} />
      <OurLenders onOpenModal={() => setIsModalOpen(true)} />
      <Testimonials onOpenModal={() => setIsModalOpen(true)} />
      <Faq onOpenModal={() => setIsModalOpen(true)} />
      {/* <Blogs /> */}
      {/* <Cta /> */}
      
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <LeadFormModal
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
      />
    </>
  );
}
