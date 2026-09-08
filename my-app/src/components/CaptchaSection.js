"use client";

import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react"; 

function generateCaptcha ()  {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const CaptchaSection = ({ onVerified }) => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [ setIsVerified] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleReload = () => {
    setCaptcha(generateCaptcha());
    setUserInput("");
    setIsVerified(false);
    onVerified(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const verified = value === captcha;
    setIsVerified(verified);
    onVerified(verified);
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-100 ">
        Please type the letters and numbers below <span className="text-red-500">*</span>
      </label>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        className="w-full p-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter CAPTCHA here"
      />
      <button
          onClick={handleReload}
          type="button"
          className="border border-border text-white hover:text-black border-blue-300 rounded-lg px-1 py-1 hover:font-semibold text-sm hover:bg-gray-300 flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 border border-border border-blue-300 rounded-lg px-2 py-1 font-bold text-xl tracking-widest">
          {captcha}
        </div>
        
      </div>

      <div className="text-sm text-red-500 font-semibold">
        <strong>Attention:</strong> Captcha is case sensitive.
      </div>
    </div>
  );
};

export default CaptchaSection;
