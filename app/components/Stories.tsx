function Stories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real people, real savings. See how Infinz helped our customers find
            better loan deals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Sarah's success story"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                <p className="text-gray-600 text-sm">Small Business Owner</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">₹8,500</div>
            <p className="text-gray-600 mb-4">
              Saved on her business loan by comparing rates through Infinz
            </p>
            <p className="text-gray-700 italic">
              "I couldn't believe the difference in rates. Infinz saved my
              business thousands!"
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Michael's success story"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Michael R.</h4>
                <p className="text-gray-600 text-sm">Software Engineer</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹12,000
            </div>
            <p className="text-gray-600 mb-4">
              Saved on his home refinancing with better rates
            </p>
            <p className="text-gray-700 italic">
              "The process was so smooth, and the savings were incredible!"
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                alt="Emily's success story"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Emily L.</h4>
                <p className="text-gray-600 text-sm">Marketing Director</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ₹3,200
            </div>
            <p className="text-gray-600 mb-4">
              Saved on her personal loan with lower interest rates
            </p>
            <p className="text-gray-700 italic">
              "Fast, easy, and saved me thousands. Highly recommend!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Stories;
