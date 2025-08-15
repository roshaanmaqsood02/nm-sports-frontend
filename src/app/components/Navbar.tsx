"use client"

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FiBarChart } from "react-icons/fi";

export default function Navbar() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isScrolled, setIsScrolled] = useState(false);

          useEffect(() => {
            const handleScroll = () => {
              setIsScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);

    const router = useRouter();
    return (
        <header
              className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
              }`}
            >
              <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <FiBarChart className="text-white text-xl" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => router.push('/')}>MN Sports</span>
                </div>
      
                {/* Desktop Navigation */}
                
        <nav className="hidden md:flex items-center space-x-8">
                  <Link
                    href="#features"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Features
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Pricing
                  </Link>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => router.push("/dashboard/login")}
                      className="px-4 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/register")}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Get Started
                    </button>
                  </div>
                </nav>
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-gray-700"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
      
              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg py-4 px-4">
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="#features"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Features
                    </Link>
                    <Link
                      href="#testimonials"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="#pricing"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Pricing
                    </Link>
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <button
                        onClick={() => router.push("/dashboard/login")}
                        className="px-4 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => router.push("/dashboard/register")}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </header>
    )
}