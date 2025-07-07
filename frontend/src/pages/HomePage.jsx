// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import MainFeed from "../components/MainFeed";
import RightSidebar from "../components/RightSidebar";

export default function Home({ darkMode, setDarkMode }) {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Navbar fixed at top */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main content area with fixed sidebars and scrollable middle */}
      <div className="flex pt-16 h-[calc(100vh-4rem)] w-full">
        {/* Left Sidebar - 25% (fixed) */}
        <div
          className={`w-[25%] h-full border-r border-gray-200 dark:border-gray-700 
                     fixed left-0 top-16 overflow-y-auto`}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <LeftSidebar darkMode={darkMode} />
        </div>

        {/* Middle spacer to account for fixed left sidebar */}
        <div className="w-[25%] flex-shrink-0"></div>

        {/* Main Feed - 50% (scrollable) */}
        <div className="w-[50%] h-full overflow-y-auto">
          <MainFeed darkMode={darkMode} />
        </div>

        {/* Right Sidebar - 25% (fixed) */}
        <div
          className={`w-[25%] h-full border-l border-gray-200 dark:border-gray-700 
                     fixed right-0 top-16 overflow-y-auto`}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <RightSidebar darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
