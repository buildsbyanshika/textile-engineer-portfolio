"use client";

import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { galleryImages } from '../data/galleryData';
import useResetAnimation from '../hooks/useAnimationOnSectionChange';

function Gallery  () {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const breakpointCols = {
    default: 4, 
    1100: 3, 
    700: 2, 
    500: 1, 
  };

  const fadeInRef = useResetAnimation("fade-in-up", []);

  return (
    <section id="gallery" className="py-12 bg-indigo-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={fadeInRef} className="text-3xl font-bold text-blue-50 mb-8 text-center">My Visual Diary</h2>
        <Masonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid flex -ml-4"
          columnClassName="my-masonry-grid_column pl-4"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => {
                setModalImg(image);
                setModalOpen(true);
              }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </Masonry>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <img
              src={modalImg}
              alt="Zoomed"
              className="w-[50vw] h-[80vh] object-cover  rounded-lg shadow-2xl bg-black"
            />
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-indigo-700 text-3xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;