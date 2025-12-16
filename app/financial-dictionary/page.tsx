'use client';

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import http from "../http.common";

// Type definitions
interface FinancialTerm {
  _id?: string;
  term: string;
  definition: string;
  category: string;
  example?: string;
  icon?: string;
  iconUrl?: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  categories: string[];
}

interface TermsGridProps {
  filteredTerms: FinancialTerm[];
  onOpenModal: () => void;
}

interface CTASectionProps {
  onOpenModal: () => void;
}

// ---------------- HERO ----------------
function DictionaryHero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-5xl font-bold">
            Financial <span className="text-[#0080E5]">Dictionary</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Understand finance with simple explanations
          </p>
        </div>
        <Image src="/book.jpg" width={400} height={300} alt="" />
      </div>
    </section>
  );
}

// ---------------- LETTER FILTER ----------------
function LetterFilter({
  selectedLetter,
  setSelectedLetter,
}: {
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
}) {
  const letters = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <section className="bg-white py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold border transition ${
                selectedLetter === letter
                  ? "bg-[#0080E5] text-white border-[#0080E5]"
                  : "bg-gray-100 text-gray-700 hover:bg-teal-100 border-gray-300"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- SEARCH & FILTER ----------------
function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  isFilterOpen,
  setIsFilterOpen,
  categories,
}: SearchAndFilterProps) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 py-3 border rounded-lg"
              placeholder="Search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="border px-4 py-3 rounded-lg flex items-center gap-1"
            >
              {selectedCategory}
              <ChevronDown className="w-4" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      selectedCategory === cat ? "bg-teal-50 font-semibold" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- GRID ----------------
function TermsGrid({ filteredTerms, loading = false }: { filteredTerms: FinancialTerm[]; loading?: boolean }) {
  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!filteredTerms.length)
    return <p className="text-center py-10 text-gray-600">No terms found matching your search</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {filteredTerms.map((term) => (
        <div key={term._id} className="border p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">{term.icon || "📘"} {term.term}</h3>
          <p className="text-gray-600 text-sm mt-2">{term.definition}</p>
          <span className="text-xs bg-teal-100 px-2 py-1 rounded inline-block mt-3">
            {term.category}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------- MAIN PAGE ----------------
export default function FinancialDictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [terms, setTerms] = useState<FinancialTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await http.get("/api/v1/financial-dictionary");
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setTerms(
            data.map((item: any) => ({
              _id: item._id,
              term: item.title,
              definition: item.description,
              category: item.category,
            }))
          );
          setHasData(true);
        } else {
          setHasData(false);
        }
      } catch (error) {
        console.error("Failed to fetch terms:", error);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(terms.map(t => t.category))),
  ];

  // ✅ FINAL FILTER LOGIC (SEARCH + CATEGORY + LETTER)
  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || term.category === selectedCategory;

    const matchesLetter =
      selectedLetter === "All" ||
      term.term.toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Loading state
  if (loading) {
    return (
      <>
        <DictionaryHero />
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">Loading financial terms...</p>
        </div>
      </>
    );
  }

  // No data state
  if (!hasData) {
    return (
      <>
        <DictionaryHero />
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <p className="text-2xl font-semibold text-gray-800 mb-2">No Data Available</p>
            <p className="text-gray-600">Unable to load financial terms at this time. Please try again later.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DictionaryHero />

      <LetterFilter
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
      />

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        categories={categories}
      />

      <TermsGrid filteredTerms={filteredTerms} loading={false} />
    </>
  );
}