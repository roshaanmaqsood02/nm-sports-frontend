"use client";

import { FiBarChart, FiCalendar, FiLock, FiUsers } from "react-icons/fi";

export default function FeaturePage() {
  const features = [
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Performance Analytics",
      description:
        "Track player and team performance with advanced metrics and visualizations.",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Roster Management",
      description:
        "Easily manage player rosters, positions, and team assignments.",
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: "Scheduling & Events",
      description:
        "Create and manage game schedules, practices, and team events.",
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Secure Tenant System",
      description:
        "Isolated data environments for each organization with role-based access.",
    },
  ];
  return (
    <section id="features" className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-600">
            Designed specifically for sports organizations of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
