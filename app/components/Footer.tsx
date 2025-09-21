'use client';

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Contact Infinz
            </h3>
            <p className="text-gray-300 mb-4">
              Making loan comparison simple, transparent, and free for everyone.
            </p>
            <div className="space-y-2 text-gray-300">
              <p>📧 support@infinz.com</p>
              <p>📞 1-800-INFINZ-1</p>
              <p>
                🏢 123 Finance Street, Suite 100
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Loan Types</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Personal Loans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Home Loans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Auto Loans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Business Loans
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {}}
                  className="hover:text-white transition-colors text-left"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 Infinz. All rights reserved. | Licensed Loan Broker</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
