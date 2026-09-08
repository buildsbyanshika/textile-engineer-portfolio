// src/pages/About.js
"use client";

import React, { useState } from "react";
import AccordionCard from "../components/AccordionCard";
import homeCards from "../data/homeCards";

function About() {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <section
      id="about"
    >
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10 px-4">
        {homeCards.map((card, idx) => (
          <AccordionCard
            key={card.title}
            title={card.title}
            iconName={card.iconName}
            isOpen={hoveredIndex === idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {card.content}
          </AccordionCard>
        ))}
      </div>
    </section>
  );
}

export default About;
