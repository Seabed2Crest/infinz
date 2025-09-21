'use client';

function Cta() {
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-r from-blue-600 to-blue-800"
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Find Your Perfect Loan?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join over 100,000 people who have found better loan rates through
          Infinz. It's free, fast, and won't affect your credit score.
        </p>
        <button
          onClick={() =>
            (window.location.href = "https://infinz-web-app.web.app")
          }
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium w-full"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
}
export default Cta;
