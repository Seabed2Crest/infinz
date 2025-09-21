'use client';

import { Menu, X, ChevronDown } from "lucide-react";
import React from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img
              src="/logo_colour.png"
              alt="Infinz Logo"
              className="cursor-pointer"
              style={{ height: "80px", width: "auto" }}
              onClick={() => {}}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Home */}
            <button
              onClick={() => {}}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div className="relative"
                 onMouseEnter={() => setActiveDropdown('products')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Personal Loan
                  </button>
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Business Loan
                  </button>
                </div>
              )}
            </div>

            {/* Financial Tools Dropdown */}
            <div className="relative"
                 onMouseEnter={() => setActiveDropdown('tools')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                Financial Tools
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'tools' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Calculators
                  </button>
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Credit Score Check
                  </button>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative"
                 onMouseEnter={() => setActiveDropdown('resources')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Financial Directory
                  </button>
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  >
                    News & Press Releases
                  </button>
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => {}}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About Us
            </button>

            {/* Contact Us */}
            <button
              onClick={() => {}}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* App Store Links */}
          <div className="hidden md:flex space-x-3">
            <button
              onClick={() => window.open("https://apps.apple.com/app/infinz", "_blank")}
              className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>App Store</span>
            </button>
            <button
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.infinz", "_blank")}
              className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span>Play Store</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 text-left"
              >
                Home
              </button>
              
              {/* Products Mobile */}
              <div>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'products-mobile' ? null : 'products-mobile')}
                  className="text-gray-600 hover:text-blue-600 text-left flex items-center justify-between w-full"
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'products-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'products-mobile' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Personal Loan
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Business Loan
                    </button>
                  </div>
                )}
              </div>

              {/* Financial Tools Mobile */}
              <div>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'tools-mobile' ? null : 'tools-mobile')}
                  className="text-gray-600 hover:text-blue-600 text-left flex items-center justify-between w-full"
                >
                  Financial Tools
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'tools-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'tools-mobile' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Calculators
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Credit Score Check
                    </button>
                  </div>
                )}
              </div>

              {/* Resources Mobile */}
              <div>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'resources-mobile' ? null : 'resources-mobile')}
                  className="text-gray-600 hover:text-blue-600 text-left flex items-center justify-between w-full"
                >
                  Resources
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'resources-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'resources-mobile' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Blogs
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      Financial Directory
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-500 hover:text-blue-600 text-left block"
                    >
                      News & Press Releases
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 text-left"
              >
                About Us
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 text-left"
              >
                Contact Us
              </button>

              {/* Mobile App Store Links */}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <button
                  onClick={() => window.open("https://apps.apple.com/app/infinz", "_blank")}
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>App Store</span>
                </button>
                <button
                  onClick={() => window.open("https://play.google.com/store/apps/details?id=com.infinz", "_blank")}
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span>Play Store</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
