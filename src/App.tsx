import React from 'react';
import { ArrowRight, CheckCircle, Shield, TrendingUp, Users, Star, Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => scrollToSection('hero')}>Infinz</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('loan-types')} className="text-gray-600 hover:text-blue-600 transition-colors">Loan Types</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>
            </nav>

            {/* Get a Loan Button */}
            <div className="hidden md:block">
              <button onClick={() => scrollToSection('loan-calculator')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Get a Loan
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 text-left">How It Works</button>
                <button onClick={() => scrollToSection('loan-types')} className="text-gray-600 hover:text-blue-600 text-left">Loan Types</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 text-left">Reviews</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 text-left">Contact</button>
                <button onClick={() => scrollToSection('loan-calculator')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium w-full">
                  Get a Loan
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your 
                  <span className="text-blue-600"> Perfect Loan</span> in Minutes
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Compare loan offers from top lenders instantly. Get pre-qualified without affecting your credit score and choose the best option for your needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('loan-calculator')} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center">
                  Start Comparing Loans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Trusted Lenders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$50M+</div>
                  <div className="text-gray-600">Loans Facilitated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>

            <div id="loan-calculator" className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Loan Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                    <input type="text" placeholder="$25,000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Personal Loan</option>
                      <option>Home Loan</option>
                      <option>Auto Loan</option>
                      <option>Business Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score Range</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>750+ (Excellent)</option>
                      <option>700-749 (Good)</option>
                      <option>650-699 (Fair)</option>
                      <option>600-649 (Poor)</option>
                    </select>
                  </div>
                  <button onClick={() => scrollToSection('cta')} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    See My Rates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg mb-8">Trusted by leading financial institutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Bank Partner" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Credit Union" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Financial Partner" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Lending Partner" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Bank Partner 2" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex justify-center">
              <img src="https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Financial Institution" className="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section id="loan-types" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Types We Compare</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect loan for your needs from our comprehensive selection of loan products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Personal Loans</h3>
              <p className="text-gray-600 text-center">Unsecured loans for any personal expense, from $1,000 to $100,000</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Home Loans</h3>
              <p className="text-gray-600 text-center">Mortgages, refinancing, and home equity loans with competitive rates</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Auto Loans</h3>
              <p className="text-gray-600 text-center">New and used car financing with flexible terms and great rates</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Business Loans</h3>
              <p className="text-gray-600 text-center">Funding solutions for small businesses and entrepreneurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real savings. See how Infinz helped our customers find better loan deals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Sarah's success story" className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$8,500</div>
              <p className="text-gray-600 mb-4">Saved on her business loan by comparing rates through Infinz</p>
              <p className="text-gray-700 italic">"I couldn't believe the difference in rates. Infinz saved my business thousands!"</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Michael's success story" className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael R.</h4>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">$12,000</div>
              <p className="text-gray-600 mb-4">Saved on his home refinancing with better rates</p>
              <p className="text-gray-700 italic">"The process was so smooth, and the savings were incredible!"</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Emily's success story" className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Emily L.</h4>
                  <p className="text-gray-600 text-sm">Marketing Director</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$3,200</div>
              <p className="text-gray-600 mb-4">Saved on her personal loan with lower interest rates</p>
              <p className="text-gray-700 italic">"Fast, easy, and saved me thousands. Highly recommend!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Infinz?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make finding the right loan simple, fast, and completely free. Compare offers from multiple lenders and get the best deal possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Rates Guaranteed</h3>
              <p className="text-gray-600">Compare rates from 50+ lenders to find the lowest APR and best terms for your situation.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Credit Impact</h3>
              <p className="text-gray-600">Check your rates and get pre-qualified without affecting your credit score. Safe and secure.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">Our loan specialists are here to help you navigate your options and find the perfect loan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Tool */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See the Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare what you could save with Infinz vs. going directly to a single lender
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Without Infinz</h3>
                <p className="text-gray-600">Going to one lender directly</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-red-600">8.99% APR</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold text-red-600">$456</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-red-600">$12,840</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Time to Compare</span>
                  <span className="font-semibold text-red-600">Hours/Days</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">RECOMMENDED</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-600 mb-2">With Infinz</h3>
                <p className="text-gray-600">Compare 50+ lenders instantly</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-green-600">6.49% APR</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold text-green-600">$398</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-green-600">$8,640</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Time to Compare</span>
                  <span className="font-semibold text-green-600">3 Minutes</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                <p className="text-green-800 font-semibold">You Save: $4,200</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Getting your loan is easier than ever with our streamlined process</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill Application</h3>
              <p className="text-gray-600">Complete our simple 3-minute application with basic information</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compare Offers</h3>
              <p className="text-gray-600">Review personalized loan offers from multiple lenders instantly</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Best Offer</h3>
              <p className="text-gray-600">Select the loan that best fits your needs and budget</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Funded</h3>
              <p className="text-gray-600">Receive your funds as fast as the next business day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Security is Our Priority</h2>
              <p className="text-xl text-gray-600 mb-8">
                We use bank-level security to protect your personal and financial information. Your data is encrypted and never shared without your permission.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">256-bit SSL Encryption</h4>
                    <p className="text-gray-600">Same security used by major banks</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy Protected</h4>
                    <p className="text-gray-600">Your information is never sold or shared</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Soft Credit Check</h4>
                    <p className="text-gray-600">No impact on your credit score</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Security and trust" className="rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our loan comparison service</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How does Infinz make money?</h3>
              <p className="text-gray-600">We receive a small fee from lenders when you choose their loan offer. This service is completely free for you and doesn't affect your rates.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Will checking my rate affect my credit score?</h3>
              <p className="text-gray-600">No, we only perform soft credit checks which don't impact your credit score. Only when you decide to proceed with a lender will a hard credit check be performed.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How quickly can I get my loan?</h3>
              <p className="text-gray-600">Once approved, many of our lenders can fund your loan as quickly as the next business day. The exact timing depends on the lender and loan type.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What credit score do I need?</h3>
              <p className="text-gray-600">We work with lenders who serve all credit ranges. Even if you have fair or poor credit, we can help you find loan options that work for your situation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is my information secure?</h3>
              <p className="text-gray-600">Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your information is never sold or shared without your explicit permission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers who found their perfect loan through Infinz</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Infinz helped me find a personal loan with an amazing rate. The process was so simple and I got approved in minutes!"</p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Small Business Owner</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"I compared 10+ lenders through Infinz and saved over $3,000 in interest. Highly recommend their service!"</p>
              <div className="font-semibold text-gray-900">Michael Chen</div>
              <div className="text-sm text-gray-500">Software Engineer</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The customer service was exceptional. They guided me through every step and found me the perfect home loan."</p>
              <div className="font-semibold text-gray-900">Emily Rodriguez</div>
              <div className="text-sm text-gray-500">Marketing Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Resources Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Resources</h2>
            <p className="text-xl text-gray-600">Expert advice and insights to help you make informed financial decisions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="Credit score tips" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">CREDIT TIPS</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5 Ways to Improve Your Credit Score Fast</h3>
                <p className="text-gray-600 mb-4">Learn proven strategies to boost your credit score and qualify for better loan rates.</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Read More →</button>
              </div>
            </article>

            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="Loan comparison guide" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-2">LOAN GUIDE</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Loan vs Credit Card: Which is Better?</h3>
                <p className="text-gray-600 mb-4">Compare the pros and cons of personal loans versus credit cards for major expenses.</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Read More →</button>
              </div>
            </article>

            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="Home buying guide" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">HOME BUYING</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">First-Time Home Buyer's Complete Guide</h3>
                <p className="text-gray-600 mb-4">Everything you need to know about getting your first mortgage and buying a home.</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Read More →</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Perfect Loan?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join over 100,000 people who have found better loan rates through Infinz. It's free, fast, and won't affect your credit score.
          </p>
          <button onClick={() => scrollToSection('loan-calculator')} className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Contact Infinz</h3>
              <p className="text-gray-300 mb-4">Making loan comparison simple, transparent, and free for everyone.</p>
              <div className="space-y-2 text-gray-300">
                <p>📧 support@infinz.com</p>
                <p>📞 1-800-INFINZ-1</p>
                <p>🏢 123 Finance Street, Suite 100<br />New York, NY 10001</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Loan Types</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('loan-types')} className="hover:text-white transition-colors text-left">Personal Loans</button></li>
                <li><button onClick={() => scrollToSection('loan-types')} className="hover:text-white transition-colors text-left">Home Loans</button></li>
                <li><button onClick={() => scrollToSection('loan-types')} className="hover:text-white transition-colors text-left">Auto Loans</button></li>
                <li><button onClick={() => scrollToSection('loan-types')} className="hover:text-white transition-colors text-left">Business Loans</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors text-left">About Us</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors text-left">How It Works</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors text-left">Reviews</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors text-left">Security</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 Infinz. All rights reserved. | Licensed Loan Broker</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;