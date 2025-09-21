'use client';

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Zap, TrendingUp, Shield, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductsProps {
  onOpenModal: () => void;
}

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

function Products({ onOpenModal }: ProductsProps) {
  const router = useRouter();
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handlePersonalLoanClick = () => {
    router.push('/personal-loan');
  };

  const handleBusinessLoanClick = () => {
    router.push('/business-loan');
  };

  return (
    <section ref={ref} id="products" className="py-20 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Our Financial Solutions
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Perfect</span> Loan
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive personal and business loan solutions designed to meet your unique financial goals and fuel your success. 
            From competitive interest rates to flexible repayment options, discover financing that adapts to your lifestyle and business ambitions.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Loan Card */}
          <div 
            onClick={handlePersonalLoanClick}
            onMouseEnter={() => setHoveredCard('personal')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border-2 border-transparent hover:border-teal-200 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 perspective-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
              <DollarSign className="w-8 h-8 text-teal-600" />
            </div>
            
            <div className="relative z-10 p-10">
              {/* Large Image */}
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl group-hover:shadow-3xl mx-auto">
                  <Image 
                    src="/personal-loan.jpg" 
                    alt="Personal Loan"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-3xl border-4 border-teal-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
              </div>
              
              {/* Content */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors duration-500">
                  Personal Loan
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Transform your financial goals into reality with flexible personal loans designed for life's important moments and unexpected needs.
                </p>
              </div>
              
              {/* Enhanced Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 group-hover:text-teal-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors duration-300">
                    <Zap className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="font-medium">Get up to ₹5 Lakhs in 5 mins</span>
                </div>
                <div className="flex items-center text-gray-600 group-hover:text-teal-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors duration-300">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="font-medium">Competitive interest rates</span>
                </div>
                <div className="flex items-center text-gray-600 group-hover:text-teal-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors duration-300">
                    <Shield className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="font-medium">Flexible repayment terms</span>
                </div>
              </div>
              
              {/* Enhanced CTA */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg group-hover:from-teal-700 group-hover:to-teal-800 transition-all duration-500 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl">
                  Explore Personal Loan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
            {/* Animated Bottom Bar */}
            <div className="h-2 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 group-hover:from-teal-600 group-hover:via-teal-700 group-hover:to-teal-800 transition-all duration-500 group-hover:h-3"></div>
            
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
          </div>

          {/* Business Loan Card */}
          <div 
            onClick={handleBusinessLoanClick}
            onMouseEnter={() => setHoveredCard('business')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border-2 border-transparent hover:border-orange-200 cursor-pointer transform hover:-translate-y-4 hover:-rotate-1 perspective-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            
            <div className="relative z-10 p-10">
              {/* Large Image */}
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 shadow-2xl group-hover:shadow-3xl mx-auto">
                  <Image 
                    src="/business-loan.jpg" 
                    alt="Business Loan"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-3xl border-4 border-orange-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
              </div>
              
              {/* Content */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-500">
                  Business Loan
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  From small ventures to big ambitions - scale your enterprise with confidence through tailored business financing solutions.
                </p>
              </div>
              
              {/* Enhanced Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 group-hover:text-orange-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium">Get up to ₹1 Crore instantly</span>
                </div>
                <div className="flex items-center text-gray-600 group-hover:text-orange-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium">Minimal documentation</span>
                </div>
                <div className="flex items-center text-gray-600 group-hover:text-orange-700 transition-colors duration-300">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium">Quick approval process</span>
                </div>
              </div>
              
              {/* Enhanced CTA */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg group-hover:from-orange-700 group-hover:to-orange-800 transition-all duration-500 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl">
                  Explore Business Loan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
            
            {/* Animated Bottom Bar */}
            <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 group-hover:from-orange-600 group-hover:via-orange-700 group-hover:to-orange-800 transition-all duration-500 group-hover:h-3"></div>
            
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-lg text-gray-600 mb-6">
            Not sure which loan is right for you?
          </p>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Personalized Recommendation
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Products;

