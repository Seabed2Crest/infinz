'use client';

import { useState, useEffect, useRef } from "react";
import { Search, BookOpen, TrendingUp, DollarSign, CreditCard, Building2, Calculator, Shield, ArrowRight, Filter, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import LoanApplicationModal from "../components/LoanApplicationModal";

// Type definitions
interface FinancialTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
  example: string;
  icon: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

interface TermsGridProps {
  filteredTerms: FinancialTerm[];
  onOpenModal: () => void;
}

interface CTASectionProps {
  onOpenModal: () => void;
}

// Financial terms data
const financialTerms: FinancialTerm[] = [
  {
    id: 1,
    term: "Annual Percentage Rate (APR)",
    definition: "The yearly interest rate charged on loans or credit cards, including fees and other costs. It represents the true cost of borrowing money over a year.",
    category: "Interest Rates",
    example: "A credit card with 18% APR means you'll pay 18% interest annually on outstanding balances.",
    icon: "📊"
  },
  {
    id: 2,
    term: "Credit Score",
    definition: "A numerical representation of your creditworthiness, ranging from 300-900. Higher scores indicate better credit health and lower risk to lenders.",
    category: "Credit",
    example: "A credit score of 750+ typically qualifies for the best loan rates and terms.",
    icon: "🎯"
  },
  {
    id: 3,
    term: "EMI (Equated Monthly Installment)",
    definition: "A fixed payment amount made by a borrower to a lender on a specific date each month. It includes both principal and interest components.",
    category: "Loans",
    example: "A ₹5 lakh personal loan at 12% for 3 years has an EMI of approximately ₹16,607.",
    icon: "💰"
  },
  {
    id: 4,
    term: "Collateral",
    definition: "An asset pledged as security for a loan. If the borrower defaults, the lender can seize the collateral to recover the loan amount.",
    category: "Security",
    example: "Your home serves as collateral for a home loan, your car for an auto loan.",
    icon: "🏠"
  },
  {
    id: 5,
    term: "Pre-approval",
    definition: "A preliminary assessment by a lender indicating how much you can borrow and at what terms, before you formally apply for a loan.",
    category: "Loan Process",
    example: "Getting pre-approved helps you shop for homes within your budget range.",
    icon: "✅"
  },
  {
    id: 6,
    term: "Debt-to-Income Ratio (DTI)",
    definition: "The percentage of your monthly income that goes toward paying debts. Lenders use this to assess your ability to take on new debt.",
    category: "Credit",
    example: "If you earn ₹50,000/month and pay ₹15,000 in EMIs, your DTI is 30%.",
    icon: "⚖️"
  },
  {
    id: 7,
    term: "Principal Amount",
    definition: "The original amount of money borrowed in a loan, excluding interest and fees. This is the base amount on which interest is calculated.",
    category: "Loans",
    example: "On a ₹10 lakh home loan, the principal amount is ₹10 lakh.",
    icon: "📈"
  },
  {
    id: 8,
    term: "Grace Period",
    definition: "A period after the due date during which payment can be made without penalty. Common in credit cards and some loans.",
    category: "Payment Terms",
    example: "Most credit cards offer a 15-21 day grace period for payments.",
    icon: "⏰"
  },
  {
    id: 9,
    term: "Fixed Interest Rate",
    definition: "An interest rate that remains constant throughout the loan term. Provides predictable monthly payments but may be higher initially.",
    category: "Interest Rates",
    example: "A 5-year personal loan at 12% fixed rate means 12% for the entire 5 years.",
    icon: "🔒"
  },
  {
    id: 10,
    term: "Variable Interest Rate",
    definition: "An interest rate that can change based on market conditions or a benchmark rate. Payments may increase or decrease over time.",
    category: "Interest Rates",
    example: "Home loans often start with lower variable rates that adjust with market conditions.",
    icon: "📊"
  },
  {
    id: 11,
    term: "Processing Fee",
    definition: "A one-time charge levied by lenders to cover administrative costs of processing a loan application. Usually 1-3% of loan amount.",
    category: "Fees",
    example: "A ₹5 lakh loan with 2% processing fee costs ₹10,000 upfront.",
    icon: "💳"
  },
  {
    id: 12,
    term: "Prepayment",
    definition: "Paying off part or all of a loan before the scheduled due date. May involve prepayment charges depending on loan terms.",
    category: "Payment Terms",
    example: "Paying an extra ₹10,000 on your home loan principal reduces future interest.",
    icon: "⚡"
  },
  {
    id: 13,
    term: "Credit Utilization",
    definition: "The percentage of your available credit that you're currently using. Lower utilization (under 30%) improves credit scores.",
    category: "Credit",
    example: "If you have ₹1 lakh credit limit and ₹20,000 balance, utilization is 20%.",
    icon: "📊"
  },
  {
    id: 14,
    term: "Loan Tenure",
    definition: "The total duration over which a loan must be repaid. Longer tenures mean lower EMIs but higher total interest.",
    category: "Loans",
    example: "A 5-year personal loan has 60 monthly EMIs.",
    icon: "📅"
  },
  {
    id: 15,
    term: "Foreclosure",
    definition: "Paying off the entire outstanding loan amount before the scheduled tenure ends. May involve foreclosure charges.",
    category: "Payment Terms",
    example: "Selling your home and using proceeds to close the home loan early.",
    icon: "🏁"
  },
  {
    id: 16,
    term: "Guarantor",
    definition: "A person who agrees to repay the loan if the primary borrower defaults. Provides additional security to the lender.",
    category: "Security",
    example: "A family member co-signing your loan application as guarantor.",
    icon: "🤝"
  },
  {
    id: 17,
    term: "KYC (Know Your Customer)",
    definition: "The process of verifying a customer's identity and address through official documents. Mandatory for all financial transactions.",
    category: "Compliance",
    example: "Submitting Aadhaar, PAN, and address proof for loan application.",
    icon: "🆔"
  },
  {
    id: 18,
    term: "Moratorium Period",
    definition: "A temporary suspension of loan payments, usually during financial hardship. Interest may continue to accrue.",
    category: "Payment Terms",
    example: "COVID-19 moratorium allowed borrowers to pause EMIs for 3-6 months.",
    icon: "⏸️"
  },
  {
    id: 19,
    term: "Secured Loan",
    definition: "A loan backed by collateral (like property or vehicle). Generally offers lower interest rates due to reduced risk.",
    category: "Loan Types",
    example: "Home loans, car loans, and gold loans are secured loans.",
    icon: "🔐"
  },
  {
    id: 20,
    term: "Unsecured Loan",
    definition: "A loan not backed by collateral, based purely on creditworthiness. Higher interest rates due to increased risk.",
    category: "Loan Types",
    example: "Personal loans, credit cards, and education loans are typically unsecured.",
    icon: "🎯"
  }
];

const categories = ["All", "Interest Rates", "Credit", "Loans", "Security", "Loan Process", "Payment Terms", "Fees", "Compliance", "Loan Types"];

// Hero Section
function DictionaryHero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Financial Education
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Financial <span className="text-teal-600">Dictionary</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Master financial terminology with our comprehensive dictionary. 
              From basic concepts to advanced terms, understand the language of finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span>20+ Financial Terms</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <span>Real Examples</span>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-teal-300 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/book.jpg"
                  alt="Financial Dictionary Book"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Interactive Learning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm text-gray-600">Search & Filter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm text-gray-600">Real Examples</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Search and Filter Section
function SearchAndFilter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, isFilterOpen, setIsFilterOpen }: SearchAndFilterProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search financial terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-lg"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-teal-300 transition-all duration-300 min-w-[200px]"
                >
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{selectedCategory}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors duration-200 ${
                          selectedCategory === category ? 'bg-teal-50 text-teal-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Terms Grid
function TermsGrid({ filteredTerms, onOpenModal }: TermsGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Financial Terms
          </h2>
          <p className="text-lg text-gray-600">
            Click on any term to learn more about it
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTerms.map((term: FinancialTerm, index: number) => (
            <div
              key={term.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{term.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {term.term}
                  </h3>
                  <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {term.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {term.definition}
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Example:</h4>
                <p className="text-sm text-gray-600 italic">
                  {term.example}
                </p>
              </div>
              
              <button
                onClick={onOpenModal}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Apply for Loan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No terms found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Quick Stats Section
function QuickStats() {
  const stats = [
    { label: "Financial Terms", value: "20+", icon: BookOpen },
    { label: "Categories", value: "10", icon: TrendingUp },
    { label: "Real Examples", value: "100%", icon: DollarSign },
    { label: "Free Access", value: "Always", icon: Shield }
  ];

  return (
    <section className="py-16 bg-teal-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Learn Financial Literacy
          </h2>
          <p className="text-teal-100 text-lg">
            Understanding financial terms is the first step toward financial success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-teal-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Apply Your Knowledge?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Now that you understand financial terms, take the next step with our loan products
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenModal}
            className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center justify-center"
          >
            Apply for Loan
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <button
            onClick={() => window.open('/calculator', '_self')}
            className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-all duration-300 inline-flex items-center justify-center"
          >
            <Calculator className="mr-2 h-5 w-5" />
            EMI Calculator
          </button>
        </div>
      </div>
    </section>
  );
}

// Main Financial Dictionary Page
export default function FinancialDictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter terms based on search and category
  const filteredTerms = financialTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterOpen && !(event.target as Element).closest('.relative')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);
 
  return (
    <>
      <DictionaryHero />
      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      <TermsGrid 
        filteredTerms={filteredTerms}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <QuickStats/>
      <CTASection onOpenModal={() => setIsModalOpen(true)} />
      
      <LoanApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
