import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* Pass darkMode toggle if needed inside HomePage */}
                <HomePage darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
