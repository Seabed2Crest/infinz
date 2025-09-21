import { TrendingUp, Shield, Users } from "lucide-react";

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Infinz?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make finding the right loan simple, fast, and completely free.
            Compare offers from multiple lenders and get the best deal possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Best Rates Guaranteed
            </h3>
            <p className="text-gray-600">
              Compare rates from 50+ lenders to find the lowest APR and best
              terms for your situation.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No Credit Impact
            </h3>
            <p className="text-gray-600">
              Check your rates and get pre-qualified without affecting your
              credit score. Safe and secure.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Our loan specialists are here to help you navigate your options
              and find the perfect loan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
