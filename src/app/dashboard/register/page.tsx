"use client";
import { useState } from "react";
import api from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiBriefcase, FiSlack } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenantName: "",
    slug: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/users/register", form);
      setToken(res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Side - Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">SportsSaaS</h1>
          <p className="mt-1 text-blue-200">Elevate Your Sports Management</p>
        </div>

        <div className="mt-12 max-w-md">
          <h2 className="text-2xl font-bold">
            Streamline Your Sports Organization
          </h2>
          <p className="mt-4 text-blue-100">
            Manage teams, schedules, players, and performance metrics all in one
            place. Built for coaches, managers, and sports organizations.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FiUser className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">Player Management</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Track all player details
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FiBriefcase className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">Team Analytics</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Performance insights
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FiSlack className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">Scheduling</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Manage games & events
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FiLock className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">Secure Data</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Tenant-based isolation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-blue-200 text-sm">
            © 2023 SportsSaaS. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Set up your organization in minutes
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-gray-800">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="tenantName"
                  placeholder="Your organization name"
                  value={form.tenantName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Slug
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSlack className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="slug"
                  placeholder="your-org-name"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This will be used in your dashboard URL (e.g.,
                your-org-name.sportssaas.com)
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/dashboard/login")}
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Sign in
              </button>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
