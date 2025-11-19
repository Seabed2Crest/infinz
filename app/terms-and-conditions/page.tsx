import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-4 border-indigo-600">
          {/* <div className="text-indigo-600 text-3xl font-bold mb-3">
            Rakshitha Finserve Pvt. Ltd.
          </div> */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          {/* <p className="text-gray-500 text-sm italic">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p> */}
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Introduction and Acceptance
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Use form a binding contract between you (hereafter{" "}
            <strong>"User"</strong>, <strong>"you"</strong> or{" "}
            <strong>"your"</strong>) and Rakshitha Finserve Pvt. Ltd. (hereafter{" "}
            <strong>"Infinz"</strong>) governing your access and use of the
            Infinz platform, mobile applications, website, and related services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may change these terms and conditions at any time. By
            registering, accessing, or using the Service, you confirm that you
            have read, understood, and agreed to be bound by these Terms and all
            applicable laws and regulations. If you do not agree to any part of
            these Terms, you must immediately cease use of the Service.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-lg my-6">
            <p className="text-gray-800 font-medium">
              Please revisit the 'Terms & Conditions' page on our site from time
              to time to stay abreast of any changes that we may introduce.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These Terms & Conditions/ Terms of Use apply to any kind of loan,
            including but not limited to the following loans:
          </p>
          <ul className="list-decimal list-inside space-y-2 text-gray-700 ml-4 mt-3">
            <li>Personal Loan</li>
            <li>Business Loan</li>
          </ul>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Eligibility and Conditions Precedent
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz may grant or continue to grant the loan to the borrower if
            the following conditions are fulfilled. You affirm that you are an
            Indian resident, at least eighteen (18) years of age, and legally
            competent to enter into a contract under Indian law. If you are
            representing an entity, you confirm that you are duly authorised to
            bind that entity.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Users must not be legal minors or entities lacking capacity. Anyone
            using automated tools (e.g. bots, scrapers) to access or interact
            with the platform is prohibited.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All applications and documentation you submit must be complete,
            accurate, and truthful to the extent required by Infinz and its
            partner financial institutions. Infinz reserves the right to verify
            documents and information and may reject or suspend applications at
            its sole discretion.
          </p>
        </section>

        {/* Platform Description */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Platform Description & Role
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz is a digital loan aggregator and registered Digital Service
            Associate (DSA). We facilitate access to personal loans offered by
            RBI‑registered NBFCs and banks. Infinz does not issue loans,
            determine interest rates, or influence the lender's decision. All
            lending decisions, repayment schedules, and loan amounts are made
            solely by the respective financial institutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using the Service, you agree that submitting a loan request
            through Infinz does not constitute direct submission of a loan
            application to any lender, nor does it guarantee approval. Loan
            offers are made by lenders independently and contain lender‑specific
            terms, which you must review carefully.
          </p>
        </section>

        {/* User Obligations */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            User Obligations and Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree to provide truthful and complete information when using
            the Service. You must not submit fraudulent, inaccurate, erroneous,
            or misleading data. Should any information change, you are
            responsible for updating it promptly. Misuse of the Service, such as
            unauthorized access, tampering with features, or misuse through
            automated methods, may result in refusal or suspension of access.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your use of the Service is strictly limited to personal,
            non‑commercial purposes. Any resale, redistribution, or commercial
            exploitation is prohibited. You further agree not to transmit or
            upload harmful, defamatory, obscene, or infringing content.
          </p>
        </section>

        {/* Data Usage */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Data Usage and Consent
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By registering or using Infinz, you grant your informed and explicit
            consent for your personal, financial, and credit‑related information
            to be collected, processed, shared, stored, and used by Infinz and
            its partners in accordance with the Privacy Policy. This includes
            sharing data with credit bureaus, NBFCs, technology vendors, and
            regulatory authorities where necessary.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Consent may be collected via OTP authentication, e‑signature, or
            recorded confirmation. You may withdraw consent at any time by
            contacting us, recognizing that withdrawal may affect your ability
            to use certain features of the Service.
          </p>
        </section>

        {/* Fees */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Fees, Referral Compensation & Transparency
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz's Service is provided free of charge to Users; we connect you
            to third-party lenders who may pay us referral or matching fees for
            successful conversions. These fees do not affect your interest rates
            or loan charges directly. You are not obligated to accept any offer,
            and Infinz does not guarantee the lowest rates.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Offers may come from lenders offering the highest referral fee.
            Infinz has no control over the specific terms, fees, or repayment
            charges imposed by any lender.
          </p>
        </section>

        {/* Credit Checks */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Credit Checks and Credit Bureaus
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you consent, Infinz or partner lenders may obtain credit
            reports from credit information companies such as CIBIL, Experian,
            Equifax, or CRIF under the relevant legal framework (e.g. under the
            Credit Information Companies (Regulation) Act, 2005). Such credit
            information is accessed strictly for assessing creditworthiness and
            facilitating loan matching, and will be handled in accordance with
            the CICRA and guidelines issued by credit bureaus.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Infinz acts as your authorised representative for retrieving such
            credit information and undertakes not to misuse, reproduce, share,
            or retain this information beyond the permitted purpose and
            retention timeframe, typically one working day or a maximum of six
            months as per bureau norms.
          </p>
        </section>

        {/* Availability */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Availability and Limitations of the Service
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Infinz strives to offer uninterrupted access to the Service, but
            does not guarantee continuous availability. We may suspend or
            discontinue any feature or the entire platform at any time, with or
            without notice, particularly if we suspect misuse or breach of these
            Terms. We also reserve the right to block access from regions,
            devices, or users not permitted under applicable laws.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, including software, design, trademarks, logos, text,
            graphics, and images on the Infinz platform, belongs to Rakshitha
            Finserve Pvt. Ltd. or its licensors. You may not duplicate, use,
            display, or create derivative works without prior written
            permission. Your use of the platform does not grant you any property
            rights in such intellectual property.
          </p>
        </section>

        {/* Communication */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Communication and Marketing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By using Infinz, you agree to receive communications through SMS,
            email, WhatsApp, push notifications, and phone calls for both
            transactional and promotional purposes. You may opt out of
            promotional messages anytime via the unsubscribe option or by
            contacting us.
          </p>
        </section>

        {/* Grievance Redressal */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Grievance Redressal Mechanism
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In compliance with the Indian IT Act and RBI Guidelines, Infinz has
            appointed a dedicated Grievance Officer to handle complaints and
            disputes related to the Service:
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Grievance Officer Contact Details:
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> [Name]
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:XXXX@Infinz.in"
                  className="text-indigo-600 hover:underline"
                >
                  XXXX@Infinz.in
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-indigo-600 hover:underline"
                >
                  +91‑XXXXXXXXXX
                </a>
              </p>
              <p>
                <strong>Address:</strong> [Registered Office Address]
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">
            We endeavour to acknowledge complaints within 48 hours and resolve
            them within thirty (30) calendar days.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Disclaimers and Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Infinz Service is provided "as is" and "as available." We
            expressly disclaim all warranties, whether express or implied,
            including merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
            <p className="text-gray-900 font-semibold mb-3">
              Infinz DOES NOT GUARANTEE APPROVAL, INTEREST RATES, SPEED OF
              DISBURSEMENT, OR ANY BENEFIT FROM LENDER OFFERS.
            </p>
            <p className="text-gray-800">
              TO THE FULLEST EXTENT PERMITTED BY LAW, Infinz IS NOT LIABLE FOR
              ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR SPECIAL
              DAMAGES ARISING FROM YOUR USE OF THE SERVICE, RELIANCE ON LOAN
              OFFERS, OR DECISIONS MADE BY THIRD-PARTY LENDERS. Infinz ALSO
              DISCLAIMS RESPONSIBILITY FOR ANY ERRORS, INTERRUPTIONS, DELAYS, OR
              LOSS OF DATA.
            </p>
          </div>
        </section>

        {/* Indemnification */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold Infinz and its affiliates
            harmless from any claims, damages, losses, liabilities, expenses, or
            demands (including legal fees) arising from your use of the Service,
            violation of these Terms, inaccuracy of information you provide, or
            infringement of any third-party rights.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Termination and Suspension
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Infinz may suspend or terminate your access to the Service without
            notice if you breach these Terms or engage in fraudulent activity.
            Upon termination, your rights to use the Service cease immediately,
            but accrued rights, obligations, disclaimers, and limitations
            continue to apply.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Modifications to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may revise these Terms from time to time to reflect legal,
            regulatory, or operational changes. Updated Terms will be posted on
            our platform, and continued use of Infinz after any update indicates
            your acceptance of the revised version.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Governing Law and Jurisdiction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of India. Any dispute or claim
            arising from or relating to these Terms or the Service will be
            subject to the exclusive jurisdiction of the courts in Bengaluru,
            Karnataka.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-3 border-b-2 border-gray-200">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about these Terms, please reach out to us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <p className="text-gray-900 font-semibold text-lg">
              Rakshitha Finserve Pvt. Ltd.
            </p>
            <p className="text-gray-700">
              <a
                href="mailto:connect@Infinzonline.com"
                className="text-indigo-600 hover:underline font-medium"
              >
                connect@Infinzonline.com
              </a>
            </p>
            <p className="text-gray-700">
              <a
                href="tel:+916366158631"
                className="text-indigo-600 hover:underline font-medium"
              >
                +91‑63661 58631
              </a>
            </p>
            <p className="text-gray-700">
              No S.1869, 1st H Main Rd, D Block, 2nd Stage, Rajajinagar,
              Bengaluru, Karnataka 560010
            </p>
          </div>
        </section>

        {/* Footer */}
        {/* <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rakshitha Finserve Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            By using our services, you acknowledge that you have read and understood these Terms & Conditions.
          </p>
        </div> */}
      </div>
    </div>
  );
}
