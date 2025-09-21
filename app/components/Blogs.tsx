function Blogs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Resources
          </h2>
          <p className="text-xl text-gray-600">
            Expert advice and insights to help you make informed financial
            decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
              alt="Credit score tips"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">
                CREDIT TIPS
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5 Ways to Improve Your Credit Score Fast
              </h3>
              <p className="text-gray-600 mb-4">
                Learn proven strategies to boost your credit score and qualify
                for better loan rates.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read More →
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
              alt="Loan comparison guide"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-green-600 font-semibold mb-2">
                LOAN GUIDE
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personal Loan vs Credit Card: Which is Better?
              </h3>
              <p className="text-gray-600 mb-4">
                Compare the pros and cons of personal loans versus credit cards
                for major expenses.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read More →
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
              alt="Home buying guide"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-purple-600 font-semibold mb-2">
                HOME BUYING
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                First-Time Home Buyer's Complete Guide
              </h3>
              <p className="text-gray-600 mb-4">
                Everything you need to know about getting your first mortgage
                and buying a home.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read More →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Blogs;
