"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Clock,
} from "lucide-react";

// Hero Section
function ContactHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Got queries? We're Here to{" "}
            <span className="text-sky-700">Help You!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up animate-delay-200">
            Ready to start your financial journey? Get in touch with our expert
            team for personalized financial guidance and support
          </p>
        </div>
      </div>
    </section>
  );
}

// Contact Information Section
interface ContactInfoProps {
  onOpenModal: () => void;
}

function ContactInfo({ onOpenModal }: ContactInfoProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="animate-slide-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Head Office
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-semibold mb-1">
                        Address
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        No 338, 2nd Floor, Siddhiaiah Puranik road,
                        <br />
                        3rd stage, 4th Block, Basaveshwaranagar,
                        <br />
                        Bangalore North - 560079
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-semibold mb-1">Phone</p>
                      <p className="text-gray-600">06366158631</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-semibold mb-1">Email</p>
                      <p className="text-gray-600">
                        info@rakshithafinserve.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-semibold mb-1">
                        Website
                      </p>
                      <p className="text-gray-600">www.1infinz.com</p>
                    </div>
                  </div>

                  {/* Google Maps Embed */}
                  <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5448892!2d77.5516!3d12.9996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU5JzU4LjYiTiA3N8KwMzMnMDUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-right">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get Expert Advice - Free Consultation
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  onClick={onOpenModal}
                  type="button"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  Submit
                  <Send className="ml-2 h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>
                    Our team will respond within 2 hours during business hours
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Connect With Us Section
function ConnectWithUs() {
  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: " https://www.linkedin.com/company/1infinz/",
      color: "blue",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/1infinz/",
      color: "blue",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/1infinz/",
      color: "pink",
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://www.youtube.com/@Cash_Mate",
      color: "red",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connect With Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Social Media */}
          <div className="animate-slide-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Social Media
            </h3>

            <div className="grid grid-cols-4 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-bounce-in`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div
                    className={`w-12 h-12 bg-${social.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <social.icon
                      className={`w-6 h-6 text-${social.color}-600`}
                    />
                  </div>
                  <p className="text-gray-900 font-semibold">{social.name}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Get Our Apps */}
          {/* <div className="animate-slide-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get Our Apps
            </h3>

            <div className="space-y-4">
              <a
                href="https://apps.apple.com/app/infinz"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black text-white rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/apple.png"
                    alt="Download on App Store"
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <p className="text-sm text-gray-300">Download on the</p>
                    <p className="text-lg font-semibold">App Store</p>
                  </div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.infinz"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black text-white rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/playstore.png"
                    alt="Get it on Google Play"
                    className="w-12 h-12 rounded-xl"
                  />
                  <div>
                    <p className="text-sm text-gray-300">Get it on</p>
                    <p className="text-lg font-semibold">Google Play</p>
                  </div>
                </div>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// Quick Actions Section
interface QuickActionsProps {
  onOpenModal: () => void;
  onOpenLeadForm: () => void;
}

function QuickActions({ onOpenModal, onOpenLeadForm }: QuickActionsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600">
            Take the next step in your financial journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 animate-bounce-in">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Apply for Loan
            </h3>
            <p className="text-gray-600 mb-6">
              Get instant pre-approval for personal or business loans
            </p>
            <button
               onClick={() => window.open("/apply_now", "_self")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 animate-bounce-in animate-delay-200">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Check Eligibility
            </h3>
            <p className="text-gray-600 mb-6">
              Find out if you qualify for our loan products
            </p>
            <button
              onClick={() => window.open("/calculator", "_self")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Check Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 animate-bounce-in animate-delay-400">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Learn More</h3>
            <p className="text-gray-600 mb-6">
              Discover our comprehensive financial solutions
            </p>
            <button
              onClick={() => window.open("/about", "_self")}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Contact Page
export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  return (
    <>
      <ContactHero />
      <ContactInfo onOpenModal={() => setIsLeadFormOpen(true)} />
      <ConnectWithUs />
      <QuickActions
        onOpenModal={() => setIsModalOpen(true)}
        onOpenLeadForm={() => setIsLeadFormOpen(true)}
      />

      {/* Modal placeholders */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Loan Application Modal</h3>
            <p className="text-gray-600 mb-4">
              Replace this with your LoanApplicationModal component
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-sky-700 text-white py-3 rounded-xl font-semibold hover:bg-sky-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isLeadFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Lead Form Modal</h3>
            <p className="text-gray-600 mb-4">
              Replace this with your LeadFormModal component
            </p>
            <button
              onClick={() => setIsLeadFormOpen(false)}
              className="w-full bg-sky-700 text-white py-3 rounded-xl font-semibold hover:bg-sky-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
