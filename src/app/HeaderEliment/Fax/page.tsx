"use client";

import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Shipping",
    question: "What is your shipping policy?",
    answer:
      "We offer free shipping on all orders over $50. Standard shipping takes 3–5 business days.",
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Delivery usually takes 7–14 business days.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee for all purchases.",
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, PayPal, and Apple Pay.",
  },
  {
    category: "Products",
    question: "Are your products authentic?",
    answer:
      "Yes, all products are 100% authentic and sourced from trusted suppliers.",
  },
];

export default function FAQPage() {
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

  const filteredFAQs =
    selectedCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8">
            Find answers to common questions
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedCategory === cat
                    ? "border-black  text-black "
                    : "hover:bg-muted text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="border border-gray-400 rounded-lg">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex justify-between text-left"
                >
                  <div>
                    <div className="text-xs text-primary">
                      {faq.category}
                    </div>
                    <div>{faq.question}</div>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 transition ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 border border-gray-400 rounded-lg p-8 text-center">
            <h2 className="text-2xl mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Contact our support team
            </p>

            <button
              onClick={() => router.push("/contact")}
              className="bg-primary text-black px-6 py-2 border border-black hover:bg-blue-500  rounded-lg"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}