'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle, ArrowRight, User, Phone, CreditCard, DollarSign, TrendingUp, Shield, Clock } from "lucide-react";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = 'form' | 'success';

function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    loanType: '',
    loanAmount: '',
    monthlyIncome: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    if (!formData.loanType) newErrors.loanType = 'Please select a loan type';
    if (!formData.loanAmount) newErrors.loanAmount = 'Please enter loan amount';
    if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Please enter monthly income';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentStep('success');
      setIsLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setCurrentStep('form');
    setFormData({
      fullName: '',
      mobileNumber: '',
      loanType: '',
      loanAmount: '',
      monthlyIncome: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {currentStep === 'form' && (
          <div className="flex h-full">
            {/* Left Side - Illustration */}
            <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-pink-50 to-orange-50 relative overflow-hidden">
              {/* Floating Coins */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-8 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-20 right-12 w-6 h-6 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-12 w-7 h-7 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-8 w-5 h-5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Main Image */}
              <div className="relative z-10 flex items-center justify-center p-8 w-full">
                <Image
                  src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
                  alt="Loan Application"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-sm object-contain"
                />
              </div>

              {/* Features */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur rounded-lg px-3 py-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Quick Approval</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 relative flex flex-col">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Get The Right Loan
                </h1>
                <p className="text-gray-600 text-lg">
                  Apply now and get instant approval
                </p>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="relative">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                    <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === 'fullName' || formData.fullName 
                        ? 'top-2 text-xs text-teal-600' 
                        : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}>
                      Full Name
                    </label>
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 ml-4">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="relative">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      onFocus={() => setFocusedField('mobileNumber')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      maxLength={10}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                    <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === 'mobileNumber' || formData.mobileNumber 
                        ? 'top-2 text-xs text-teal-600' 
                        : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}>
                      Mobile Number
                    </label>
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1 ml-4">{errors.mobileNumber}</p>
                  )}
                </div>

                 {/* Loan Type */}
                 <div className="relative">
                   <div className="relative">
                     <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <select
                       value={formData.loanType}
                       onChange={(e) => handleInputChange('loanType', e.target.value)}
                       onFocus={() => setFocusedField('loanType')}
                       onBlur={() => setFocusedField(null)}
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 appearance-none"
                     >
                       <option value="" disabled hidden>Select loan type</option>
                       <option value="personal">Personal Loan</option>
                       <option value="business">Business Loan</option>
                       <option value="home">Home Loan</option>
                       <option value="vehicle">Vehicle Loan</option>
                     </select>
                     <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                       focusedField === 'loanType' || formData.loanType 
                         ? 'top-2 text-xs text-teal-600' 
                         : 'top-1/2 -translate-y-1/2 text-gray-500'
                     }`}>
                       
                     </label>
                   </div>
                   {errors.loanType && (
                     <p className="text-red-500 text-sm mt-1 ml-4">{errors.loanType}</p>
                   )}
                 </div>

                {/* Loan Amount */}
                <div className="relative">
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      onFocus={() => setFocusedField('loanAmount')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                    <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === 'loanAmount' || formData.loanAmount 
                        ? 'top-2 text-xs text-teal-600' 
                        : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}>
                      Loan Amount
                    </label>
                  </div>
                  {errors.loanAmount && (
                    <p className="text-red-500 text-sm mt-1 ml-4">{errors.loanAmount}</p>
                  )}
                </div>

                {/* Monthly Income */}
                <div className="relative">
                  <div className="relative">
                    <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      onFocus={() => setFocusedField('monthlyIncome')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                    <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === 'monthlyIncome' || formData.monthlyIncome 
                        ? 'top-2 text-xs text-teal-600' 
                        : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}>
                      Monthly Income
                    </label>
                  </div>
                  {errors.monthlyIncome && (
                    <p className="text-red-500 text-sm mt-1 ml-4">{errors.monthlyIncome}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? 'Processing...' : 'Get Instant Quote'}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>100% Secure & Confidential</span>
                </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-teal-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quote Request Submitted!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your interest. Our team will contact you within 24 hours with your personalized loan quote.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="text-gray-900 font-semibold mb-2">What happens next?</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>• Our team will review your application</p>
                  <p>• You'll receive a call within 24 hours</p>
                  <p>• Get your personalized loan quote</p>
                  <p>• Complete the application process</p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadFormModal;