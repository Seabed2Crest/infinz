import { CheckCircle, Shield, TrendingUp, Users } from "lucide-react";

function LoanTypes() {
  return (
    <section id="loan-types" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Types We Compare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect loan for your needs from our comprehensive
            selection of loan products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Personal Loans
            </h3>
            <p className="text-gray-600 text-center">
              Unsecured loans for any personal expense, from ₹1,000 to ₹100,000
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Home Loans
            </h3>
            <p className="text-gray-600 text-center">
              Mortgages, refinancing, and home equity loans with competitive
              rates
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Auto Loans
            </h3>
            <p className="text-gray-600 text-center">
              New and used car financing with flexible terms and great rates
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Business Loans
            </h3>
            <p className="text-gray-600 text-center">
              Funding solutions for small businesses and entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanTypes;
