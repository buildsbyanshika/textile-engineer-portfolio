"use client";

import React, { useState } from 'react';
import loom from "./../assets/images/Engineer_bg.png";
import fabric from "./../assets/images/Gallery_5.jpeg";
import quality from "./../assets/images/Gallery_3.jpeg";
import ModalProjectDetail from "./ModalProjectDetail";


const lines = [
  "Textile Engineering Projects", 
];

const projects = [
  {
    title: 'Automated Loom Installation',
    description: 'Led the installation and calibration of automated looms in a textile factory, increasing production efficiency by 30%.',
    image: loom,
    details: 'Implemented advanced control systems and trained operators. Automated Loom Installation refers to the process of setting up advanced weaving machines (looms) that operate automatically using modern technology like sensors, microcontrollers, and software systems. These looms are a part of smart textile manufacturing units and help in improving efficiency, quality, and production speed in the textile industry.',
  },
  {
    title: 'Sustainable Fabric Processing',
    description: 'Developed a water-saving dyeing process and a  reducing environmental impact by 25%.',
    image: fabric,
    details: 'Collaborated with R&D to optimize chemical usage. Sustainable Fabric Processing refers to eco-friendly methods of converting raw fibers into finished fabrics, minimizing environmental impact, reducing water and energy consumption, and eliminating harmful chemicals throughout the textile production cycle.',
  },
  {
    title: 'Quality Control System',
    description: 'Designed a QC system for fabric defect detection and to improving the product quality.',
    image: quality,
    details: 'Integrated IoT sensors for real-time monitoring. A Quality Control (QC) System is a structured set of processes used to ensure that textile or garment products meet defined standards of quality — including durability, measurements, appearance, colorfastness, stitching, and more. It plays a vital role in minimizing defects, improving customer satisfaction, and maintaining brand credibility.',
  },
];

function TextileProjects () {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
  <section id="projects" className="py-12 bg-blue-900">
    <div className="max-w-6xl mx-auto px-4 ">
      <h2 className="text-3xl font-bold text-center text-white mb-8 fade-in-up">
        {lines.map((line, index) => (
        <span key={index} className="">
          {line}
        </span>
      ))}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-xl  shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
             onClick={() => openModal(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <button
                className="bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg transition 
             hover:bg-blue-50 hover:text-blue-900 hover:border hover:border-blue-900 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={e => {
                  e.stopPropagation();
                  openModal(project);
                }}
              >
                Show More
              </button>
          </div>
        ))}
      </div>
       <ModalProjectDetail
          open={modalOpen}
          project={selectedProject}
          onClose={() => setModalOpen(false)}
        />
    </div>
  </section>

);
}

export default TextileProjects;