"use client";

import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Sports Organization?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of coaches and athletic directors using MN Sports to
          streamline their operations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => router.push("/dashboard/register")}
            className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            Start Free 14-Day Trial
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-4 border border-white text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            View Demo Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
