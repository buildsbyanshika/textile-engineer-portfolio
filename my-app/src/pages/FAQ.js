// src/components/FAQ.js
"use client";

import React, { useState } from "react";
import FAQData from "../data/faqData";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useResetAnimation from "../hooks/useAnimationOnSectionChange";

function FAQ() {

  const fadeInRef = useResetAnimation("fade-in-up", []);
  const [faqs, setFaqs] = useState(
    FAQData.map((item, index) => ({ ...item, isOpen: index === 0 }))
  );

  const toggleFAQ = (id) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id
          ? { ...faq, isOpen: !faq.isOpen }
          : { ...faq, isOpen: false }
      )
    );
  };

  return (
    <section id="faq" className="py-8 bg-blue-500">

      <div className="max-w-4xl mx-auto p-6 bg-blue-800 rounded-xl shadow-md transition-all duration-300 cursor-pointer overflow-hidden shadow-lg mt-10 mb-10 min-h-[550px]">
        <h2 ref={fadeInRef} className="text-4xl font-bold text-blue-50 mb-8 mt-2 text-center ">FAQs</h2>
        <div className="space-y-6">
          {faqs.map(({ id, question, answer, isOpen }) => (
            <div
              key={id}
              className="bg-blue-50 rounded-md p-4 cursor-pointer transition-colors"
              onClick={() => toggleFAQ(id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-800">{question}</h3>
                <span className="text-blue-900 transition-transform duration-200">
                  {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                </span>
              </div>
              {isOpen && (
                <p className="mt-3 text-blue-900  leading-relaxed">{answer}</p>
              )}
            </div>
          ))}
        </div>
        </div >
    </section>
  );
}

export default FAQ;
