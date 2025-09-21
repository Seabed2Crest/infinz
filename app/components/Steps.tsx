function Steps() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Getting your loan is easier than ever with our streamlined process
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fill Application
            </h3>
            <p className="text-gray-600">
              Complete our simple 3-minute application with basic information
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Compare Offers
            </h3>
            <p className="text-gray-600">
              Review personalized loan offers from multiple lenders instantly
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Choose Best Offer
            </h3>
            <p className="text-gray-600">
              Select the loan that best fits your needs and budget
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Get Funded
            </h3>
            <p className="text-gray-600">
              Receive your funds as fast as the next business day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Steps;
