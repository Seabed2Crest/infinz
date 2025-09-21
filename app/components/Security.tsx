import { CheckCircle, Shield } from "lucide-react";

function Security() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Security is Our Priority
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We use bank-level security to protect your personal and financial
              information. Your data is encrypted and never shared without your
              permission.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    256-bit SSL Encryption
                  </h4>
                  <p className="text-gray-600">
                    Same security used by major banks
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Privacy Protected
                  </h4>
                  <p className="text-gray-600">
                    Your information is never sold or shared
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Soft Credit Check
                  </h4>
                  <p className="text-gray-600">
                    No impact on your credit score
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Security and trust"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Security;
