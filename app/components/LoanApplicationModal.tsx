'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  X, 
  Smartphone, 
  Clock, 
  RefreshCw, 
  Scale, 
  CheckCircle, 
  ArrowRight,
  User,
  CreditCard,
  Mail,
  Phone,
  Calendar
} from "lucide-react";

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ApplicationStep = 'mobile' | 'otp' | 'form' | 'success';

function LoanApplicationModal({ isOpen, onClose }: LoanApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    gender: '',
    email: '',
    loanAmount: '',
    purpose: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleMobileSubmit = async () => {
    if (!validateMobile(mobileNumber)) {
      setErrors({ mobile: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setOtpTimer(60);
      setCurrentStep('otp');
      setIsLoading(false);
    }, 1500);
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate OTP verification
    setTimeout(() => {
      setCurrentStep('form');
      setIsLoading(false);
    }, 1000);
  };

  const handleFormSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.pan.trim()) newErrors.pan = 'PAN is required';
    else if (!validatePAN(formData.pan)) newErrors.pan = 'Please enter a valid PAN number';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate form submission
    setTimeout(() => {
      setCurrentStep('success');
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    setOtp('');
    setErrors({});
  };

  const resetModal = () => {
    setCurrentStep('mobile');
    setMobileNumber('');
    setOtp('');
    setFormData({
      name: '',
      pan: '',
      gender: '',
      email: '',
      loanAmount: '',
      purpose: ''
    });
    setErrors({});
    setOtpSent(false);
    setOtpTimer(0);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

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

            {/* Main Illustration */}
            <div className="relative z-10 flex items-center justify-center p-8">
              <Image
                src="/3d-hand-hold-smartphone-with-authentication-form.jpg"
                alt="Loan Application"
                width={300}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-8 flex flex-col overflow-hidden">
            {currentStep === 'mobile' && (
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get up to <span className="text-pink-600">₹5 lakhs</span>
                  </h2>
                  <p className="text-xl font-semibold text-gray-700">
                    in just <span className="text-pink-600">2 minutes!</span>
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">100% digital process</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Instant approval</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Easy EMI options</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Scale className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">0 foreclosure charges</span>
                  </div>
                </div>

                {/* Mobile Number Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="flex gap-3">
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      maxLength={10}
                    />
                    <button
                      onClick={handleMobileSubmit}
                      disabled={isLoading}
                      className="px-6 py-3 bg-[#0080E5] text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Sending...' : 'Get OTP'}
                    </button>
                  </div>
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                {/* App Download */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Download Our Mobile App</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                      <img
                        src="/apple.png"
                        alt="Download on App Store"
                        className="w-6 h-6"
                      />
                      <span className="text-sm">Download on App Store</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                      <img
                        src="/playstore.png"
                        alt="Download on Play Store"
                        className="w-6 h-6"
                      />
                      <span className="text-sm">Download on Play Store</span>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            )}

            {currentStep === 'otp' && (
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Mobile</h2>
                  <p className="text-gray-600">
                    We've sent a 6-digit OTP to <span className="font-semibold">{mobileNumber}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => {
                          const newOtp = otp.split('');
                          newOtp[index] = e.target.value;
                          setOtp(newOtp.join(''));
                          if (e.target.value && index < 5) {
                            const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                            nextInput?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    ))}
                  </div>
                  {errors.otp && <p className="text-red-500 text-sm text-center">{errors.otp}</p>}
                  
                  <div className="text-center">
                    {otpTimer > 0 ? (
                      <p className="text-gray-600 text-sm">
                        Resend OTP in {otpTimer}s
                      </p>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        className="text-[#0080E5] hover:text-teal-700 text-sm font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-3 bg-[#0080E5] text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                </div>
              </div>
            )}

            {currentStep === 'form' && (
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Application</h2>
                  <p className="text-gray-600">Fill in your details to get instant approval</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter Name As Per PAN Card"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={formData.pan}
                      onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                      placeholder="Enter your PAN number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      maxLength={10}
                    />
                    {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                    <select
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Loan Amount</option>
                      <option value="50000">₹50,000</option>
                      <option value="100000">₹1,00,000</option>
                      <option value="200000">₹2,00,000</option>
                      <option value="300000">₹3,00,000</option>
                      <option value="500000">₹5,00,000</option>
                    </select>
                    {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Purpose</option>
                      <option value="medical">Medical Emergency</option>
                      <option value="education">Education</option>
                      <option value="wedding">Wedding</option>
                      <option value="home">Home Renovation</option>
                      <option value="debt">Debt Consolidation</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
                  </div>
                </div>

                <button
                  onClick={handleFormSubmit}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0080E5] text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
                </div>
              </div>
            )}

            {currentStep === 'success' && (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for your application. Our team will get in touch with you within 24 hours to process your loan request.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">What happens next?</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Our team will review your application</p>
                      <p>• You'll receive a call within 24 hours</p>
                      <p>• We'll guide you through the documentation process</p>
                      <p>• Get instant approval and disbursal</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#0080E5] text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanApplicationModal;
