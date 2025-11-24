import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-4 border-blue-600">
          {/* <div className="text-blue-600 text-3xl font-bold mb-3">
            Rakshitha Finserve Pvt. Ltd.
          </div> */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
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
          <p className="text-gray-700 leading-relaxed mb-4">
            Rakshitha Finserve Pvt. Ltd. (<strong>"Infinz"</strong>,{" "}
            <strong>"we"</strong>, <strong>"us"</strong> or{" "}
            <strong>"our"</strong>) respects your privacy and is committed to
            protecting the privacy and security of your personal data. This
            Privacy Policy (<strong>"Policy"</strong>) applies to all products
            and/or services offered by us to all individuals (
            <strong>"you"</strong>, <strong>"your"</strong>,{" "}
            <strong>"user"</strong>).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This Privacy Policy is compliant with Indian laws, including the
            Information Technology (Reasonable Security Practices and Procedures
            and Sensitive Personal Data or Information) Rules, 2011 under the IT
            Act 2000, RBI Master Directions on Digital Lending Guidelines, 2025,
            Data Protection Bill, 2023, and other relevant regulations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how we collect, receive, store,
            disclose, share, and use your personal data for the purpose of your
            participation and consumption of our products and/or services
            offered by us through our website{" "}
            <a
              href="https://www.1infinz.com"
              className="text-blue-600 hover:underline font-medium"
            >
              'www.1infinz.com'
            </a>{" "}
            and our mobile application (collectively,{" "}
            <strong>"Platform"</strong>) or during any interaction with us, and
            how you can exercise your privacy rights.
          </p>
        </section>

        {/* Nature of Business */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Nature of Business
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz functions as a digital loan aggregator and registered Digital
            Service Associate (DSA). It facilitates connections between loan
            seekers and various RBI-registered Non-Banking Financial Companies
            (NBFCs) or banks. Infinz does not itself provide loans or make
            lending decisions but acts as an intermediary to streamline and
            simplify the customer's access to credit products from verified
            financial institutions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The policy constitutes a legal agreement between you, as the User of
            the platform, and Rakshitha Finserve Pvt. Ltd., as the owner of the
            platform. For clarity, <strong>'User'</strong> shall mean any person
            who visits, uses, and/or transacts through the platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You are permitted to use the services available on the platform only
            if you are a natural person, a citizen of India, and at least
            eighteen (18) years of age. By using Infinz's platform and providing
            your data, you consent to the collection and use of information as
            described in this policy.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Disclaimer
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to modify this policy at any time and update
              this policy from time to time. So, please review this policy
              frequently to understand the latest policy adopted by us. Changes
              and modifications to this policy will take effect immediately upon
              posting on the platform. Any continued use of the services shall
              signify your acceptance of such updated policy.
            </p>
            <p className="text-gray-900 font-semibold uppercase">
              IF YOU DO NOT AGREE WITH THE TERMS & CONDITIONS OF THE POLICY,
              PLEASE DO NOT USE OR ACCESS OUR SERVICES.
            </p>
          </div>
        </section>

        {/* Scope & Applicability */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Scope & Applicability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This Policy applies to all usage of Infinz services via mobile app,
            website, SMS, calls, or offline channels.
          </p>
        </section>

        {/* Collection & Storage */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Collection & Storage of Personal Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz collects personal information directly from users through
            forms, applications, and documents submitted via the app or website.
            This may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Full name, contact details, address, date of birth, gender</li>
            <li>Income details and employment data</li>
            <li>Bank account numbers and IFSC codes</li>
            <li>
              Aadhaar numbers (masked or tokenized in compliance with UIDAI
              norms)
            </li>
            <li>PAN numbers and other KYC documentation</li>
            <li>Credit reports from credit bureaus (with explicit consent)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            In addition to this, the platform gathers behavioral and technical
            data, such as device identifiers, IP addresses, browser type,
            location (if permitted), and app usage patterns.
          </p>
        </section>

        {/* Purpose and Use */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Purpose and Use of Data
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The data collected is used strictly for lawful purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Identity verification and KYC processing</li>
            <li>Determining creditworthiness and fetching credit scores</li>
            <li>Matching users with appropriate loan products</li>
            <li>Fulfilling the digital lending journey</li>
            <li>User communication and customer support services</li>
            <li>Risk assessments and backend audits</li>
            <li>Regulatory compliance and fraud detection</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Infinz may further use anonymized data for internal analytics and
            product improvements, provided no personal identity is compromised.
          </p>
        </section>

        {/* Consent */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Consent and Legal Basis
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz ensures that all data processing is carried out with the
            explicit and informed consent of the user. Users grant permission
            either through digital affirmation, OTP-based authentication, or
            e-signature mechanisms. Consent is also secured before sharing data
            with any third-party lending institutions or credit bureaus.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Users reserve the right to withdraw consent at any time by
            contacting us, though withdrawal may affect the availability or
            continuity of our services.
          </p>
        </section>

        {/* Sharing and Disclosure */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Sharing and Disclosure of Data
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz shares users' personal information only with lending partners
            and trusted third-party entities for legitimate purposes. These
            include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>NBFCs and banks for processing loan applications</li>
            <li>Credit bureaus for retrieving credit scores</li>
            <li>
              Technology partners offering cloud storage, KYC, fraud checks, or
              other operational support
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Any such disclosures are executed under legally binding data
            processing agreements and confidentiality clauses. Infinz may also
            share data with regulatory or law enforcement bodies when required
            by law, or in cases involving legal claims or fraud investigations.
          </p>
        </section>

        {/* Third-Party Tools */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Third-Party Tools and SDKs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The application may include third-party software development kits
            (SDKs), APIs, or plugins that assist with user verification,
            document scanning, analytics, notifications, or payment processing.
            These third parties operate under strict compliance requirements and
            do not access user data beyond what is necessary for their specific
            functions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All SDKs used are reviewed for adherence to RBI and privacy
            standards, especially regarding consent-based access to sensitive
            permissions like camera, storage, or location.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Data Retention Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Infinz retains user data only for as long as necessary to fulfill
            the purposes outlined in this policy or to comply with statutory
            obligations. In general, data is retained for a minimum of eight
            years, in accordance with RBI's record-keeping requirements for
            digital lending intermediaries. Once the retention period ends, data
            is securely deleted or anonymized unless required for dispute
            resolution, legal compliance, or audit trails.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz understands the importance of one's personal information and
            thereby uses the highest application standard to protect the
            information collected from you. We employ industry-standard security
            measures to safeguard user data from unauthorized access, loss, or
            misuse. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>End-to-end encryption during data transmission</li>
            <li>Encryption-at-rest and secure socket layer (SSL) technology</li>
            <li>Robust access controls for data storage systems</li>
            <li>Hosting on certified cloud platforms</li>
            <li>
              Periodic vulnerability scans, third-party audits, and penetration
              testing
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Only authorized personnel with a strict need-to-know basis are
            granted access to user data.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Infinz uses cookies and similar tracking technologies to enhance
            user experience, analyze usage patterns, and deliver personalized
            content. These cookies do not collect personal information unless
            explicitly provided by the user. Users can modify browser settings
            to reject or delete cookies, though doing so may impair certain
            platform functionalities.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            User Rights and Redressal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Users have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Access their personal information</li>
            <li>Request corrections to any inaccurate data</li>
            <li>Revoke previously given consent</li>
            <li>Object to certain data uses</li>
            <li>Request data deletion (subject to regulatory constraints)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Requests can be sent via email to our Data Protection/Grievance
            Officer, and we aim to process these within the legally stipulated
            timelines.
          </p>
        </section>

        {/* Grievance Redressal */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Grievance Redressal Mechanism
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinz is committed to resolving any data-related concerns in a
            transparent and timely manner. We have appointed a dedicated
            Grievance Officer in accordance with the IT Act. Users may reach out
            for assistance, complaint submission, or dispute resolution.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Grievance Officer Contact Details:
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> [Officer's Full Name]
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:XXXX@Infinz.in"
                  className="text-blue-600 hover:underline"
                >
                  XXXX@Infinz.in
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-blue-600 hover:underline"
                >
                  +91-XXXXXXXXXX
                </a>
              </p>
              <p>
                <strong>Office Address:</strong> [Full Postal Address]
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">
            Complaints are acknowledged within 48 hours and typically resolved
            within 30 working days.
          </p>
        </section>

        {/* Policy Amendment */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Policy Amendment & Changes
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This policy is subject to modification and/or change at the sole
            discretion of Infinz. All such modifications shall be strictly in
            line with the RBI requirements and guidelines issued from time to
            time, or for internal company policies. Any significant
            modifications will be communicated via email, website banners, or
            in-app notifications. Continued usage of the services
            post-notification constitutes user acknowledgment and acceptance of
            the revised policy.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 pb-3 border-b-2 border-gray-200">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, you can contact
            us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>By email:</strong>{" "}
              <a
                href="mailto:connect@Infinzonline.com"
                className="text-blue-600 hover:underline font-medium"
              >
                connect@Infinzonline.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rakshitha Finserve Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
