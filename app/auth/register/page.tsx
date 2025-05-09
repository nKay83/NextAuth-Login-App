"use client";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      newErrors.name = "Tên không được để trống.";
    }

    if (!email) {
      newErrors.email = "Email không được để trống.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await handleRegister();
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert(result.message)
        toast.success("Đăng ký thành công. Bạn có thể đăng nhập.", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      } else {
        alert(result.message)
        toast.error(result.message || "Đăng ký không thành công.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Tạo tài khoản mới</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="name">
              Tên
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên"
              required
            />
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 px-3 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={toggleShowPassword}
              >
                {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>
        
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md flex items-center justify-center transition disabled:opacity-50"
          >
            Đăng ký
          </button>

          <div className="text-sm text-gray-400 mt-4 text-center">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
