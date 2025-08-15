"use client";
import { useState } from "react";
import api from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await api.post("/auth/users/login", form);
      setToken(res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Side - Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white flex flex-col justify-between">
        <div>
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            NM Sports
          </h1>
          <p className="mt-1 text-blue-200">Elevate Your Sports Management</p>
        </div>

        <div className="mt-12 max-w-md">
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="mt-4 text-blue-100">
            Sign in to access your sports organization dashboard and manage your
            teams, players, and events.
          </p>

          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 p-3 rounded-lg">
                <FiLogIn className="text-2xl" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Secure Access</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Your data is protected with tenant isolation
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">Single Sign-On</h3>
                <p className="text-sm text-blue-200 mt-1">
                  Access all your teams with one account
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-blue-200 text-sm">
            &copy; 2023 NM Sports. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">
              Access your sports organization dashboard
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
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/dashboard/register")}
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Create account
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                  <span className="ml-2">Microsoft</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
