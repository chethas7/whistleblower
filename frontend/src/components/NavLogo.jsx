// src/components/WhistleblowerLogo.jsx
import { useState } from "react";

export default function NavLogo({ darkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center transition-all duration-300 px-3 py-1 rounded-md cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vector Whistle Logo */}
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/031/685/small_2x/whistle-sport-silhouette-sports-accessory-line-art-logos-or-icons-illustration-vector.jpg"
        alt="Whistle Logo"
        className={`h-8 w-8 mr-2 transition-transform duration-300 ${
          isHovered ? "rotate-180" : ""
        }`}
      />

      {/* Text with boldness swap and increased size */}
      <span className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}>
        <span
          className={`transition-all duration-300 ${
            isHovered ? "font-normal" : "font-bold"
          }`}
        >
          WHISTLE
        </span>
        <span
          className={`transition-all duration-300 ${
            isHovered ? "font-bold" : "font-normal"
          }`}
        >
          BLOWER
        </span>
      </span>
    </div>
  );
}
