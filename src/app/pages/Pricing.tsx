"use client";

import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";

export default function PricingPage() {
  const router = useRouter();
  return (
    <section id="pricing" className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works for your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Up to 5 teams</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Basic scheduling</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Performance tracking</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FiCheck className="mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FiCheck className="mr-2" />
                <span>Custom branding</span>
              </li>
            </ul>
            <button
              onClick={() => router.push("/dashboard/register")}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-blue-600 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$79</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Up to 20 teams</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced scheduling</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Performance tracking</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FiCheck className="mr-2" />
                <span>Custom branding</span>
              </li>
            </ul>
            <button
              onClick={() => router.push("/dashboard/register")}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enterprise
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$199</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Unlimited teams</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced scheduling</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Performance tracking</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>Custom branding</span>
              </li>
            </ul>
            <button
              onClick={() => router.push("/dashboard/register")}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
