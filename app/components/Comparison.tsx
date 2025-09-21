function Comparison () {
    return(
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See the Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare what you could save with Infinz vs. going directly to a
              single lender
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  Without Infinz
                </h3>
                <p className="text-gray-600">Going to one lender directly</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-red-600">8.99% APR</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold text-red-600">₹456</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-red-600">₹12,840</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Time to Compare</span>
                  <span className="font-semibold text-red-600">Hours/Days</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  With Infinz
                </h3>
                <p className="text-gray-600">Compare 50+ lenders instantly</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold text-green-600">
                    6.49% APR
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold text-green-600">₹398</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-semibold text-green-600">₹8,640</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Time to Compare</span>
                  <span className="font-semibold text-green-600">
                    3 Minutes
                  </span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                <p className="text-green-800 font-semibold">You Save: ₹4,200</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Comparison;