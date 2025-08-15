"use client";

import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import sportImage from "../../../public/sports_1.png";
import sportImage2 from "../../../public/sports_2.jpg";
import sportImage3 from "../../../public/sports_3.jpg";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Sports Organization with{" "}
              <span className="text-blue-600">Powerful SaaS</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              The all-in-one platform for teams, leagues, and athletic
              departments to manage players, schedules, and performance
              analytics.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push("/dashboard/register")}
                className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                Start Free Trial
                <FiArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
              >
                View Demo Dashboard
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-blue-600 rounded-2xl w-80 h-80 md:w-96 md:h-96 overflow-hidden">
                <Image
                  src={sportImage}
                  alt="Sports"
                  className="object-cover rounded-2xl"
                  fill
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-gray-800 rounded-2xl w-80 h-80 md:w-96 md:h-96">
                <Image
                  src={sportImage2}
                  alt="Sports"
                  className="object-cover rounded-2xl"
                  fill
                />
              </div>
              <div className="absolute top-6 -left-6 bg-white border border-gray-200 rounded-2xl w-80 h-80 md:w-96 md:h-96 shadow-xl">
                <Image
                  src={sportImage3}
                  alt="Sports"
                  className="object-cover rounded-2xl"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
