import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomeLayout from "./pages/HomeLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
