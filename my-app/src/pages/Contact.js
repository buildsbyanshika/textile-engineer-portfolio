"use client";

import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { getCountryCallingCode } from 'libphonenumber-js';
import useResetAnimation from "../hooks/useAnimationOnSectionChange";
import CaptchaSection from '../components/CaptchaSection';


function Contact() {
  const fadeInRef = useResetAnimation("fade-in-up", []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    state: '',
    city: '',
    phone: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(Date.now());

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.isoCode === formData.country);
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
        setPhoneCode(`+${getCountryCallingCode(selectedCountry.isoCode)}`);
      } else {
        setStates([]);
        setPhoneCode('');
      }
    } else {
      setStates([]);
      setPhoneCode('');
    }
    // setFormData(prev => ({ ...prev, state: '', city: '' }));
  }, [formData.country, countries]);

  // useEffect(() => {
  //   if (formData.country && formData.state) {
  //     const selectedCountry = countries.find(c => c.isoCode === formData.country);
  //     const selectedState = states.find(s => s.isoCode === formData.state);
  //     if (selectedCountry && selectedState) {
  //       const cityList = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
  //       setCities(cityList);
  //     }
  //   } else {
  //     setCities([]);
  //   }
  //   setFormData(prev => ({ ...prev, city: '' }));
  // }, [formData.state, formData.country, countries, states]);
useEffect(() => {
  if (formData.country && formData.state) {
    const cityList = City.getCitiesOfState(formData.country, formData.state);
    setCities(cityList || []);
  } else {
    setCities([]);
  }
}, [formData.country, formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [captchaTouched, setCaptchaTouched] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCaptchaVerified) {
      setCaptchaTouched(true);
      return;
    }
    setCaptchaTouched(false);


    const cleanedPhone = formData.phone.trim().replace(/[\s-]/g, '');
    const finalPhone = phoneCode ? `${phoneCode}${cleanedPhone}` : cleanedPhone;

    const countryName = countries.find(c => c.isoCode === formData.country)?.name || '';
    const stateName = states.find(s => s.isoCode === formData.state)?.name || '';
    const cityName = formData.city;

    const formBody = new URLSearchParams([
      ['name', formData.name],
      ['email', formData.email],
      ['country', countryName],
      ['state', stateName],
      ['city', cityName],
      ['phone', finalPhone],
      ['company', formData.company],
      ['message', formData.message]
    ]).toString();

    try {
      const response = await fetch(
         process.env.REACT_APP_GOOGLE_FORM_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody,
        }
      );

      const text = await response.text();
      let result = {};

      try {
        result = JSON.parse(text);
      } catch (e) {
        console.warn("Non-JSON response:", text);
        result.result = 'success';
      }

      if (result.result === 'success') {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({
          name: '', email: '', phone: '', company: '',
          message: '', country: '', state: '', city: ''
        });
        setIsCaptchaVerified(false);
        setCaptchaKey(Date.now());

        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Unknown error occurred.' });
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (err) {
      console.error('Request failed', err);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className="py-12 bg-blue-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={fadeInRef} className="text-4xl font-bold text-white mb-8 text-center">Get in Touch</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <form onSubmit={handleSubmit} className="bg-blue-500 rounded-xl p-6 flex-1 space-y-4">
            {/* Legend Note */}
            <p className="text-xs text-white/90">
              Fields marked with <span className="text-red-300 font-bold">*</span> are required.
            </p>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name <span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email <span className="text-red-300">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>

            {/* Location Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Country <span className="text-red-300">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  State <span className="text-red-300">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!states.length}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  City <span className="text-red-300">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!cities.length}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Phone Number <span className="text-red-300">*</span>
              </label>
              <div className="w-full flex gap-2 items-center">
                {phoneCode && (
                  <span className="px-4 py-3 rounded-lg bg-blue-100 border border-blue-300 text-sm font-semibold flex items-center whitespace-nowrap flex-shrink-0 text-blue-900">
                    {phoneCode}
                  </span>
                )}
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setFormData((prev) => ({ ...prev, phone: val }));
                    }
                  }}
                  className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                />
              </div>
            </div>

            {/* Company Name (Optional) */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Your Message <span className="text-red-300">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              ></textarea>
            </div>

            <hr className="border-t border-dashed border-blue-300/60 my-4" />

            {/* CAPTCHA Section */}
            <CaptchaSection
              key={captchaKey}
              className="bg-white rounded-lg p-3"
              onVerified={(verified) => {
                setIsCaptchaVerified(verified);
                if (verified) setCaptchaTouched(false);
              }}
            />

            {captchaTouched && !isCaptchaVerified && (
              <p className="mt-2 text-center bg-white font-bold rounded-lg p-2 shadow-md text-red-600 text-sm">
                Please complete the CAPTCHA correctly.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-blue-50 hover:text-blue-900 hover:border hover:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Send Message
            </button>

            {/* Status Notification */}
            {status && (
              <p
                className={`mt-4 text-center bg-white font-bold rounded-lg p-2 shadow-md text-sm ${
                  status.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg min-h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d241317.11609945508!2d72.5713622!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1665060912345!5m2!1sen!2sin"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              >
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
