"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/services/userApiSlice";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "kelli.gerlach@yahoo.com",
    password: "123456",
  });
  const [error, setError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation(); // ✅ RTK mutation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(formData).unwrap() as { data?: unknown }; // 🔥 unwrap gives actual response
      // Optional: store token or user if needed
      if (data && data.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
      }

      console.log("Login success:", data);
      router.push("/explore"); // Redirect to explore page on success
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border mb-4 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border mb-4 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
