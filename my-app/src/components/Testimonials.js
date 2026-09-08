import React from 'react';

const testimonials = [
  {
    name: 'Emberweave Textiles Ltd.',
    feedback: 'His expertise in machine maintenance reduced our downtime by 40%. Highly reliable!',
    role: 'Factory Manager',
  },
  {
    name: 'Dazzle Fabrics Inc.',
    feedback: 'The sustainable dyeing process he implemented was a game-changer for our operations.',
    role: 'Operations Head',
  },
  {
    name: 'Crimson Innovations Co.',
    feedback: 'His leadership in our loom installation project was exceptional.',
    role: 'Project Coordinator',
  },
];

function Testimonials () {

  return(
  <section id="testimonials" className="py-12 bg-blue-500">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8 fade-in-up">
        Client Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
          >
            <p className="text-gray-600 italic mb-4">"{testimonial.feedback}"</p>
            <h4 className="text-lg font-semibold text-indigo-800">{testimonial.name}</h4>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
}

export default Testimonials;