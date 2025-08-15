"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Navigation */}
      <Navbar />

      {/* Home page */}
      <HomePage />

      {/* Footer */}
      <Footer />
    </div>
  );
}
