// src/components/Navbar.jsx
import {
  Home,
  User,
  Bell,
  Mail,
  LogOut,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { useState } from "react";
import NavLogo from "./NavLogo";

export default function Navbar({ darkMode, setDarkMode }) {
  const [activeTab, setActiveTab] = useState("home");

  const iconClass = (tab) =>
    `cursor-pointer p-2 rounded-md transition-all ${
      activeTab === tab
        ? "text-blue-500 bg-blue-100 dark:bg-blue-950"
        : "text-gray-600 dark:text-gray-300"
    } hover:text-blue-500`;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center z-50 px-6">
      {/* Left: Logo */}
      <div className="w-1/4">
        <NavLogo darkMode={darkMode} />
      </div>

      {/* Center: Search Bar */}
      <div className="w-1/2 flex items-center justify-center relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Icons and Theme Toggle */}
      <div className="w-1/4 flex items-center justify-end gap-5 pr-2">
        <Home
          size={35}
          className={iconClass("home")}
          onClick={() => setActiveTab("home")}
        />
        <User
          size={35}
          className={iconClass("profile")}
          onClick={() => setActiveTab("profile")}
        />
        <Bell
          size={35}
          className={iconClass("notifications")}
          onClick={() => setActiveTab("notifications")}
        />
        <Mail
          size={35}
          className={iconClass("messages")}
          onClick={() => setActiveTab("messages")}
        />
        <LogOut
          size={35}
          className={iconClass("logout")}
          onClick={() => console.log("Logout")}
        />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Sun size={28} className="text-yellow-400" />
          ) : (
            <Moon size={22} className="text-gray-700" />
          )}
        </button>
      </div>
    </nav>
  );
}
