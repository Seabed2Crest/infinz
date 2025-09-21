function Faq() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our loan comparison service
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How does Infinz make money?
            </h3>
            <p className="text-gray-600">
              We receive a small fee from lenders when you choose their loan
              offer. This service is completely free for you and doesn't affect
              your rates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Will checking my rate affect my credit score?
            </h3>
            <p className="text-gray-600">
              No, we only perform soft credit checks which don't impact your
              credit score. Only when you decide to proceed with a lender will a
              hard credit check be performed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How quickly can I get my loan?
            </h3>
            <p className="text-gray-600">
              Once approved, many of our lenders can fund your loan as quickly
              as the next business day. The exact timing depends on the lender
              and loan type.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What credit score do I need?
            </h3>
            <p className="text-gray-600">
              We work with lenders who serve all credit ranges. Even if you have
              fair or poor credit, we can help you find loan options that work
              for your situation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Is my information secure?
            </h3>
            <p className="text-gray-600">
              Absolutely. We use bank-level 256-bit SSL encryption to protect
              your data. Your information is never sold or shared without your
              explicit permission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Faq;
