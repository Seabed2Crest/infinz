"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calculator,
  CreditCard,
  FileText,
  Users,
  HelpCircle,
  BookOpen,
  Newspaper,
  MessageCircle,
} from "lucide-react";

// Custom hook for intersection observer
function useInView(threshold = 0.3) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { isInView, elementRef };
}

function FooterColumn({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const { isInView, elementRef } = useInView(0.2);

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h4 className="text-lg font-bold text-gray-900 mb-6">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        text-gray-600 hover:text-blue-600 transition-all duration-300 text-left
        transform ${isHovered ? "translate-x-2" : "translate-x-0"}
        flex items-center gap-2
      `}
    >
      {children}
    </button>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  delay = 0,
}: {
  icon: any;
  href: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 
        flex items-center justify-center transition-all duration-300
        transform ${isHovered ? "scale-110 -translate-y-1" : "scale-100"}
        hover:shadow-lg
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        className={`w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors duration-300`}
      />
    </a>
  );
}

function Footer() {
  const router = useRouter();
  const { isInView, elementRef } = useInView(0.1);

  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Column 1: Logo & Description */}
          <FooterColumn title="" delay={0}>
            <div className="space-y-4">
              {/* Logo */}
              <div className="mb-4">
                <img
                  src="/logo_colour.png"
                  alt="Infinz Logo"
                  className="h-12 w-auto cursor-pointer"
                  onClick={() => router.push("/")}
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your trusted partner for smart borrowing decisions with India's
                most comprehensive loan marketplace. Compare, choose, and get
                the best loan rates.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                <SocialIcon
                  icon={Linkedin}
                  href="https://in.linkedin.com/company/cashmateonline"
                  delay={0}
                />
                <SocialIcon
                  icon={Facebook}
                  href="https://www.facebook.com/cashmateonline/"
                  delay={100}
                />
                <SocialIcon
                  icon={Instagram}
                  href="https://www.instagram.com/cashmateonline/"
                  delay={200}
                />
                <SocialIcon
                  icon={Youtube}
                  href="https://youtube.com/@cash_mate?si=1rttniT_7h0_hg7E"
                  delay={300}
                />
              </div>
            </div>
          </FooterColumn>

          {/* Column 2: Products */}
          <FooterColumn title="Products" delay={100}>
            <FooterLink onClick={() => router.push("/personal-loan")}>
              <CreditCard className="w-4 h-4" />
              Personal Loan
            </FooterLink>
            <FooterLink onClick={() => router.push("/business-loan")}>
              <CreditCard className="w-4 h-4" />
              Business Loan
            </FooterLink>
          </FooterColumn>

          {/* Column 3: Financial Tools */}
          <FooterColumn title="Financial Tools" delay={200}>
            <FooterLink onClick={() => router.push("/calculator")}>
              <Calculator className="w-4 h-4" />
              Calculators
            </FooterLink>
            {/* <FooterLink onClick={() => {}}>
              <Calculator className="w-4 h-4" />
              Eligibility Calculator
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <CreditCard className="w-4 h-4" />
              Credit Score Check
            </FooterLink> */}
          </FooterColumn>

          {/* Column 4: About Infinz */}
          <FooterColumn title="About Infinz" delay={300}>
            <FooterLink onClick={() => router.push("/about")}>
              <Users className="w-4 h-4" />
              About Us
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <Users className="w-4 h-4" />
              Career
            </FooterLink>
            <FooterLink onClick={() => router.push("/contact")}>
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </FooterLink>
            {/* <FooterLink onClick={() => {}}>
              <Users className="w-4 h-4" />
              Meet The Team
            </FooterLink> */}
          </FooterColumn>

          {/* Column 5: Resources */}
          <FooterColumn title="Resources" delay={400}>
            <FooterLink onClick={() => {}}>
              <BookOpen className="w-4 h-4" />
              Blogs
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <BookOpen className="w-4 h-4" />
              Financial Dictionary
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <FileText className="w-4 h-4" />
              Featured
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <Newspaper className="w-4 h-4" />
              Newsroom
            </FooterLink>
            <FooterLink onClick={() => {}}>
              <HelpCircle className="w-4 h-4" />
              FAQ
            </FooterLink>
          </FooterColumn>

          {/* Column 6: Address */}
          <FooterColumn title="" delay={500}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold mb-1">
                    Head Office
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    No S.1869, 1st H Main Rd, above Skinomy Clinic,
                    <br />
                    2nd Stage, Rajajinagar,
                    <br />
                    Bengaluru, Karnataka 560010
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">support@infinz.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">06366158631</p>
                </div>
              </div>
            </div>
          </FooterColumn>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t border-gray-200 pt-8 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © 2025 Infinz Financial Services Pvt. Ltd. All rights reserved.
            </div>

            <div className="flex gap-6 text-sm">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </button>
              {/* <button className="text-gray-600 hover:text-blue-600 transition-colors">
                Cookie Policy
              </button> */}
            </div>
          </div>

          {/* <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Licensed by Reserve Bank of India | CIN: U65999DL2020PTC123456
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
export default Footer;
