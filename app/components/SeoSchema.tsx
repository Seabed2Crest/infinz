import Script from "next/script";

export default function SeoSchema() {
  return (
    <>
      {/* ✅ Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Infinz",
            url: "https://www.1infinz.com/",
            logo: "https://www.1infinz.com/logo_colour.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91 6366158631",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: "en",
            },
            sameAs: [
              "https://www.facebook.com/1infinz/",
              "https://www.instagram.com/1infinz/",
              "https://www.youtube.com/@1infinz",
              "https://www.linkedin.com/company/100493010/",
            ],
          }),
        }}
      />

      {/* ✅ Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Infinz",
            url: "https://www.1infinz.com/",
          }),
        }}
      />

      {/* ✅ FULL FAQ Schema (All 8 Questions) */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an instant loan, and how does it work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Instant loan designed to help you with immediate expenses, and provides quick access to funds through an online application process. It works by using AI-powered algorithms to assess your creditworthiness within minutes based on your profile, credit score, and banking data. Once approved, funds are disbursed directly to your bank account, typically within 24 hours.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer services in my city?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Infinz is currently offering its personal loan services all over India, and business loan services only in Bengaluru and around locations within 150 KM.",
                },
              },
              {
                "@type": "Question",
                name: "What is my loan eligibility/how much can I borrow?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your loan eligibility depends on factors like your monthly income, credit score, employment history, and existing obligations. Generally, you can borrow 10-15 times your monthly salary, with loan amounts ranging from ₹10,000 to ₹1 crore. Use our eligibility calculator on the website for an instant assessment of your borrowing capacity.",
                },
              },
              {
                "@type": "Question",
                name: "What all documents are required to apply for a loan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Basic documents include: PAN Card, Aadhaar Card, salary slips (last 3 months), bank statements (last 3-6 months), employment letter or offer letter, and recent passport-size photographs. Additional documents may be requested based on your employment type and loan amount.",
                },
              },
              {
                "@type": "Question",
                name: "How can I repay the loan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer multiple repayment options: Auto-debit from your bank account (recommended), online payment through net banking, UPI payments, and NEFT/RTGS transfers.",
                },
              },
              {
                "@type": "Question",
                name: "How will I know if I am approved? When will I receive my funds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You'll receive instant approval notification via SMS and email within a few minutes of application completion. Once all documentation is verified, funds are typically disbursed within 24 hours on business days. You'll get real-time updates throughout the process via SMS and email.",
                },
              },
              {
                "@type": "Question",
                name: "What if I am unable to pay the loan at the agreed time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Contact our customer support team immediately if you anticipate payment difficulties. We offer flexible solutions like EMI restructuring, payment holidays, or tenure extension based on your situation. Early communication helps avoid late payment charges and protects your credit score.",
                },
              },
              {
                "@type": "Question",
                name: "Once the existing loan is paid, when can I apply for a new loan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can apply for a new loan immediately after full repayment of your existing loan. Timely repayment makes you eligible for higher loan amounts and better interest rates on future loans. Repeat customers often get instant pre-approved offers.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}