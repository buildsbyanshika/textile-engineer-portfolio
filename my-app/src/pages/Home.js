// src/pages/Home.js
"use client";

import React, { useEffect,useRef } from "react";
import bgimg from '../assets/images/Engineer_bg.png';

function Home() {
       const ref = useRef(null);

  useEffect(() => {

    const animate = () => {
      const el = ref.current;
      if (el) {
        el.classList.remove("fade-in-up"); 
        void el.offsetWidth;
        el.classList.add("fade-in-up");
      }
    };

    animate();
    window.addEventListener("hashchange", animate);
    return () => {
      window.removeEventListener("hashchange", animate);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-[500px] flex flex-col bg-blue-900"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
      

      {/* Hero Content */}
      <div  ref={ref} className="relative z-10 flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-3">
          Smart Textiles, Smarter Engineering
        </h1>
        <p className="text-sm md:text-xl text-blue-300 mb-4"><u>
           – The Future Woven with Innovation</u>
        </p>
        <a
          href="#gallery"
           className="bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded border border-blue-900 shadow-lg transition duration-200 
             hover:bg-blue-600 hover:text-white hover:border-none 
             focus:bg-blue-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          See My Work
        </a>
      </div>
    </section>
  );
}

export default Home;
