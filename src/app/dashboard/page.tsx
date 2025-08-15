"use client";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../lib/auth";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { 
  BarChart, 
  Calendar, 
  Settings, 
  User, 
  LogOut, 
  HelpCircle, 
  Bell 
} from "react-feather";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New player registered", time: "10 min ago", read: false },
    { id: 2, title: "Team stats updated", time: "1 hour ago", read: true },
    { id: 3, title: "Upcoming match reminder", time: "2 hours ago", read: true },
  ]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("dashboard/login");
    } else {
      api
        .get("auth/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          removeToken();
          router.push("/dashboard/login");
        });
    }
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    removeToken();
    router.push("/dashboard/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">NM Sports</h1>
          <div className="mt-4 text-sm text-gray-600">
            <div className="font-medium">{user?.tenant?.name || "Tenant"}</div>
            <div className="text-xs">Premium Plan</div>
          </div>
        </div>
        
        <nav className="mt-6">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "dashboard" 
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
                : "hover:bg-gray-50"
            }`}
          >
            <BarChart size={18} className="mr-3" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("players")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "players" 
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
                : "hover:bg-gray-50"
            }`}
          >
            <User size={18} className="mr-3" />
            Players
          </button>
          
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "schedule" 
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
                : "hover:bg-gray-50"
            }`}
          >
            <Calendar size={18} className="mr-3" />
            Schedule
          </button>
          
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeTab === "settings" 
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" 
                : "hover:bg-gray-50"
            }`}
          >
            <Settings size={18} className="mr-3" />
            Settings
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
              <p className="text-sm text-gray-500">Manage your sports organization</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell size={20} className="text-gray-600" />
                </button>
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              
              <div className="relative group">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{user?.name || "User"}</div>
                    <div className="text-xs text-gray-500">{user?.tenant?.name || "Tenant"}</div>
                  </div>
                </div>
                
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-1 hidden group-hover:block z-10">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "email@example.com"}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={14} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" ? (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {user?.name}. Here's what's happening with {user?.tenant?.name} today.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm font-medium">Total Players</h3>
                  <p className="text-3xl font-bold mt-2">142</p>
                  <div className="mt-3 text-xs text-green-600 font-medium flex items-center">
                    <span>↑ 12% from last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
                  <p className="text-3xl font-bold mt-2">7</p>
                  <div className="mt-3 text-xs text-blue-600 font-medium">
                    Next: Tournament Finals (Aug 20)
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm font-medium">Active Teams</h3>
                  <p className="text-3xl font-bold mt-2">9</p>
                  <div className="mt-3 text-xs text-gray-600">
                    <span className="font-medium">3</span> new this quarter
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
                  <p className="text-3xl font-bold mt-2">$8,420</p>
                  <div className="mt-3 text-xs text-green-600 font-medium flex items-center">
                    <span>↑ 24% from last quarter</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Performance Overview</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View Report
                    </button>
                  </div>
                  <div className="bg-gray-50 h-64 rounded flex items-center justify-center">
                    <p className="text-gray-400">Performance chart visualization</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Recent Activity</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      See all
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-3">
                        <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <User size={14} className="text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">New player registered</p>
                        <p className="text-xs text-gray-500">Michael Jordan joined the team</p>
                        <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <Calendar size={14} className="text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Event scheduled</p>
                        <p className="text-xs text-gray-500">Summer Tournament on Aug 20-22</p>
                        <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <BarChart size={14} className="text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Stats updated</p>
                        <p className="text-xs text-gray-500">Team performance metrics added</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "players" ? (
            <div>
              <h1 className="text-2xl font-bold mb-6">Players Management</h1>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                Players content would be displayed here
              </div>
            </div>
          ) : activeTab === "schedule" ? (
            <div>
              <h1 className="text-2xl font-bold mb-6">Event Schedule</h1>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                Schedule content would be displayed here
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-6">Organization Settings</h1>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4">Tenant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      {user?.tenant?.name || "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Slug</label>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      {user?.tenant?.slug || "N/A"}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-lg font-medium mb-4">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      {user?.name || "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      {user?.email || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}