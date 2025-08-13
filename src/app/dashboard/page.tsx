"use client";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../lib/auth";
import api from "../lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      api
        .get("auth/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          removeToken();
          router.push("/dashboard/login");
        });
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <p className="mt-2">
          Welcome, {user.name} (Tenant: {user.tenant?.name})
        </p>
      )}
    </div>
  );
}
