'use client';

import { ArrowRight, CheckCircle } from "lucide-react";
import Lottie from "react-lottie-player";

function Hero () {
    return (
  <section
        id="hero"
        className="bg-gradient-to-br from-teal-50 via-white to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Unlock Your Dreams
                  <br />
                  with
                  <span className="relative inline-block ml-2">
                    <span className="text-teal-600"> Personal Loan</span>
                    <span className="absolute left-0 right-0 -bottom-2 h-2 bg-teal-200 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                  Flexible terms and competitive rates to help you fund your next big
                  purchase or dream vacation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {}}
                  className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg inline-flex items-center justify-center"
                >
                  Compare & Apply
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-8 pt-2">
                <div>
                  <div className="text-2xl font-bold text-teal-700">50+</div>
                  <div className="text-gray-600">Trusted Lenders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-700">₹50M+</div>
                  <div className="text-gray-600">Loans Facilitated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-700">98%</div>
                  <div className="text-gray-600">Approval Happiness</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="aspect-[4/3] w-full flex items-center justify-center">
                  <Lottie
                    play
                    loop
                    path="/lottie/Animation - financial.json"
                    className="h-80 sm:h-96 lg:h-[520px] w-auto"
                  />
                </div>

                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-full shadow-md px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-800">Loan Approved</span>
                </div>
              </div>

              {/* <div className="mt-6 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                <span className="h-2 w-6 rounded-full bg-teal-600"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    )
}

export default Hero;