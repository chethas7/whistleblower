import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginSignup from "../components/LoginSignup";
import { motion } from "framer-motion";

export default function AuthPage() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const captions = [
    "Your courage makes organizations better",
    "Speaking up protects everyone",
    "Ethics start with individual action",
    "Your report could prevent harm",
    "Confidentiality guaranteed",
  ];

  const [currentCaption, setCurrentCaption] = useState(0);

  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate("/");
    }

    const interval = setInterval(() => {
      setCurrentCaption((prev) => (prev + 1) % captions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section - Visual Content */}
      <motion.div
        className="hidden lg:flex flex-col items-center justify-center w-[60%] p-12 bg-gradient-to-br from-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl font-bold mb-8 text-gray-800">
            <span className="text-blue-600">WHISTLE</span>BLOWER
          </h1>
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg bg-white p-1 mb-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="https://www.corporatecomplianceinsights.com/wp-content/uploads/2024/08/whistleblower-program.jpg"
              alt="Whistleblower"
              className="w-full h-96 object-cover rounded-lg"
            />
          </motion.div>
          <motion.div
            className="h-20 flex items-center justify-center"
            key={currentCaption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600 italic">
              "{captions[currentCaption]}"
            </p>
          </motion.div>
          <div className="flex justify-center mt-6 space-x-2">
            {captions.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentCaption(index)}
                className={`w-2 h-2 rounded-full ${
                  currentCaption === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 500 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Section - Auth Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md bg-white rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginSignup />
        </motion.div>
      </div>
    </div>
  );
}
