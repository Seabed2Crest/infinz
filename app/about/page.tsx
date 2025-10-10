'use client';

import { useState } from "react";
import { ArrowRight, CheckCircle, Lightbulb, Zap, DollarSign, Shield, Users, Award, Star, Banknote, MessageCircle, Clock, Phone, Mail, Target, Eye, Building2, MapPin, User } from "lucide-react";
import LoanApplicationModal from "../components/LoanApplicationModal";
import Faq from "../components/Faq";

// Hero Section
function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            Since 2019
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slide-up leading-tight">
            From Vision to Reality
          </h1>
          <h2 className="text-xl sm:text-2xl text-teal-600 font-semibold mb-8 animate-slide-up animate-delay-200">
            Transforming How India Accesses Financial Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-300">
            Connecting millions of Indians with the best financial solutions through innovation, transparency, and personalized service
          </p>
        </div>
      </div>
    </section>
  );
}

// Our Story Section
function OurStory() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Our Story
          </h2>
          <h3 className="text-2xl font-semibold text-teal-600 mb-8 animate-slide-up animate-delay-200">
            Transforming India's Financial Landscape, One Customer at a Time
          </h3>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed animate-slide-up animate-delay-300">
            <p>
              At Infinz, we're your innovative One-Stop Solution for all your financial needs. Founded in 2019, we've been at the forefront of helping customers discover the best financial products in India. With an extensive network of over 65 banks and NBFCs, we specialize in tailoring deals on Personal Loans, Business Loans, Home Loans, Loan Against Property, Gold Loans, and Credit Cards to match your unique preferences.
            </p>
            <p>
              What started as a vision to democratize financial services has grown into India's most trusted financial marketplace. We recognized that navigating the complex world of banking and finance shouldn't be overwhelming. That's why we created a platform that puts the power of choice back in your hands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mission & Vision Section
function MissionVision() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in-up">
            Our Mission & Vision
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-left">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower every Indian with accessible, transparent, and personalized financial solutions that fuel their dreams and aspirations.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-right">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become India's most trusted and comprehensive financial ecosystem, where finding the perfect financial product is simple, quick, and rewarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// What Makes Us Different Section
function WhatMakesUsDifferent() {
  const differentiators = [
    {
      icon: Users,
      title: "Comprehensive Comparison",
      description: "Access to 70+ leading banks and NBFCs ensures you get the most competitive offers in the market.",
      color: "teal"
    },
    {
      icon: Zap,
      title: "Lightning Fast Process",
      description: "Our advanced digital matching technology provides instant pre-approvals and quick disbursals.",
      color: "yellow"
    },
    {
      icon: DollarSign,
      title: "Zero Hidden Costs",
      description: "Complete transparency in pricing with no hidden fees or charges.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your personal and financial data is protected with 256-bit SSL encryption.",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "Our certified financial advisors provide personalized recommendations based on your profile.",
      color: "purple"
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "Over 5 years of excellence with 500,000+ satisfied customers and ₹10,000+ crores facilitated.",
      color: "orange"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            What Makes Us Different
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Founder's Note Section
function FoundersNote() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Founder's Note
            </h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Yashawanth S R
            </h3>
            <p className="text-teal-600 font-semibold mb-6">
              Founder & CEO
            </p>
            <blockquote className="text-lg text-gray-600 leading-relaxed italic">
              "Our vision at Infinz is to democratize financial services and make them accessible to every Indian. We believe that financial freedom should not be a privilege but a right. Through innovation, transparency, and personalized service, we are building a future where everyone can achieve their financial goals."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// Our Achievements Section
function OurAchievements() {
  const achievements = [
    {
      number: "500,000+",
      label: "Happy Customers",
      icon: Users,
      color: "teal"
    },
    {
      number: "₹10,000+",
      label: "Crores Loans Facilitated",
      icon: Banknote,
      color: "green"
    },
    {
      number: "70+",
      label: "Banking Partners",
      icon: Building2,
      color: "blue"
    },
    {
      number: "28",
      label: "States & UTs Covered",
      icon: MapPin,
      color: "purple"
    },
    {
      number: "4.8/5",
      label: "Customer Rating",
      icon: Star,
      color: "yellow"
    },
    {
      number: "<24 Hours",
      label: "Average Disbursal Time",
      icon: Clock,
      color: "orange"
    }
  ];

  return (
    <section className="py-16 bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
            Our Achievements
          </h2>
          <h3 className="text-2xl font-semibold text-teal-100 animate-slide-up animate-delay-200">
            By The Numbers
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">
                {achievement.number}
              </div>
              <div className="text-teal-100 font-semibold">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact CTA Section
function ContactCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
          Ready to Start Your Financial Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8 animate-slide-up animate-delay-200">
          Join thousands of satisfied customers who have found their perfect financial solutions with Infinz.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-300">
          <button
            onClick={onOpenModal}
            className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center justify-center"
          >
            Apply for Loan
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <button
            onClick={() => window.open('/contact', '_self')}
            className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-colors inline-flex items-center justify-center"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Main About Page
export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <WhatMakesUsDifferent />
      <FoundersNote />
      <OurAchievements />
      <Faq onOpenModal={() => setIsModalOpen(true)} />
      <ContactCTA onOpenModal={() => setIsModalOpen(true)} />
      
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
