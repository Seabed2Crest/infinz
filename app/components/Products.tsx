'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductsProps {
  onOpenModal: () => void;
}

function Products({ onOpenModal }: ProductsProps) {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive personal and business loan solutions designed to meet your unique financial goals and fuel your success. 
            From competitive interest rates to flexible repayment options, discover financing that adapts to your lifestyle and business ambitions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Personal Loan Card */}
          <div 
            onClick={onOpenModal}
            className="group bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transition-all duration-500 overflow-hidden border border-gray-100 hover:border-teal-200 cursor-pointer transform hover:-translate-y-2 hover:rotate-1 perspective-1000"
          >
            <div className="p-8 relative z-10 bg-gradient-to-br from-white to-gray-50/50">
              {/* Image */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                <Image 
                  src="/personal-loan.jpg" 
                  alt="Personal Loan"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors">
                Personal Loan
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Transform your financial goals into reality with flexible personal loans designed for life's important moments and unexpected needs.
              </p>
              
              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                  Get up to ₹5 Lakhs in 5 mins
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                  Competitive interest rates
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                  Flexible repayment terms
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:from-teal-600 group-hover:to-teal-700 transition-colors group-hover:h-2 transition-all duration-300"></div>
            
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Business Loan Card */}
          <div 
            onClick={() => window.open('/business-loan', '_self')}
            className="group bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 cursor-pointer transform hover:-translate-y-2 hover:-rotate-1 perspective-1000"
          >
            <div className="p-8 relative z-10 bg-gradient-to-br from-white to-gray-50/50">
              {/* Image */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                <Image 
                  src="/business-loan.jpg" 
                  alt="Business Loan"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">
                Business Loan
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From small ventures to big ambitions - scale your enterprise with confidence through tailored business financing solutions.
              </p>
              
              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                  Get up to ₹5 Lakhs instantly
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                  Minimal documentation
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                  Quick approval process
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700 transition-colors group-hover:h-2 transition-all duration-300"></div>
            
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;

