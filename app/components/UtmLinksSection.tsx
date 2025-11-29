"use client";

import { useEffect, useState } from "react";
import { ExternalLink, TrendingUp, Shield, Clock } from "lucide-react";
import http from "../http.common";

interface UtmLink {
  _id: string;
  priority: number;
  bankName: string;
  loanAmountMin: string;
  loanAmountMax: string;
  salary: string;
  ageMin: string;
  ageMax: string;
  pincodeType: "PAN INDIA" | "SHARED";
  utmLink: string;
}

interface UtmLinksSectionProps {
  age?: string;
  salary?: string;
  loanAmount?: string;
  pincode?: string;
  showWhenEmpty?: boolean; // Show section even when no filters provided
}

export default function UtmLinksSection({
  age,
  salary,
  loanAmount,
  pincode,
  showWhenEmpty = false,
}: UtmLinksSectionProps) {
  const [utmLinks, setUtmLinks] = useState<UtmLink[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUtmLinks = async () => {
      // Use default age if not provided (25-45 is a common range)
      const ageToUse = age || "30";
      
      if (!salary || !loanAmount) {
        if (!showWhenEmpty) {
          return; // Don't fetch if required params are missing
        }
        // If showWhenEmpty is true, fetch with default values
      setLoading(true);
      try {
        const params = new URLSearchParams({
          age: ageToUse,
          salary: salary || "20K",
          loanAmount: loanAmount || "1L",
          ...(pincode && { pincode }),
        });

        const response = await http.get(`/api/v1/utm-links/filter?${params.toString()}`);
        
        if (response.data.success) {
          setUtmLinks(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching UTM links:", error);
        setUtmLinks([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        age: ageToUse,
        salary,
        loanAmount,
        ...(pincode && { pincode }),
      });

        const response = await http.get(`/api/v1/utm-links/filter?${params.toString()}`);
        
        if (response.data.success) {
          setUtmLinks(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching UTM links:", error);
        setUtmLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUtmLinks();
  }, [age, salary, loanAmount, pincode, showWhenEmpty]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading best loan offers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (utmLinks.length === 0) {
    return null; // Don't show section if no links
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Loan Offers for You
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare and choose from top lenders based on your profile
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utmLinks.map((link) => (
            <div
              key={link._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {link.bankName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {link.pincodeType}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="font-semibold text-gray-900">
                      {link.loanAmountMin} - {link.loanAmountMax}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Salary Required</span>
                    <span className="font-semibold text-gray-900">
                      {link.salary}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Age Range</span>
                    <span className="font-semibold text-gray-900">
                      {link.ageMin} - {link.ageMax} years
                    </span>
                  </div>
                </div>

                <a
                  href={link.utmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Apply Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>Quick approval • Instant processing</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            * Terms and conditions apply. Interest rates and eligibility may vary.
          </p>
        </div>
      </div>
    </section>
  );
}

