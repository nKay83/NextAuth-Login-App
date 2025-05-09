"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { signIn } from "next-auth/react"; //chức năng đăng nhập ngay sau khi tạo mật khẩu

export default function SetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {router.push("/profile")}, 20000); // Chuyển hướng đến trang profile sau 2 giây
    } else {
      const data = await res.json();
      setError(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Tạo mật khẩu</h1>
        {success ? (
          <p className="text-green-400 text-center">Mật khẩu đã được lưu! Đang chuyển hướng...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                Mật khẩu mới
              </label>
              <div className="relative mt-1">
                <input
                  className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 pl-3 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md flex items-center justify-center transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu mật khẩu"}
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}
