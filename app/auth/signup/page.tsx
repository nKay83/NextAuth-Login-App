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
  const [successMessage, setSuccessMessage] = useState<string>("");

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
          router.push("/");
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
    <div>
      <div className='mx-auto grid grid-rows-none items-center justify-items-center max-w-96 min-h-1 p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <h2
          style={{
            fontSize: "21px",
            textAlign: "center",
            paddingTop: "20px",
          }}
        >
          Đăng Ký
        </h2>
        <div className=''></div>
        <form onSubmit={handleSubmit} className=''>
          {/* Name Field */}
          <div className={''}>
            <label htmlFor="Name">Tên</label>
            <input
              id="Name"
              type="text"
              className='min-h-12 rounded-md text-black'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className={''}>{errors.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className={''}>
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              type="text"
              className="min-h-12 rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className={''}>{errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className={''}>
            <label htmlFor="Password">Mật khẩu</label>
            <div className={''}>
              <input
                id="Password"
                type={showPassword ? "text" : "password"}
                className='min-h-12 rounded-md text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={''}
                onClick={toggleShowPassword}
              >
                {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <div className={''}>{errors.password}</div>
            )}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={''}>{successMessage}</div>
          )}

          {/* Submit Button */}
          <button type="submit" className={'ml-20'}>
            Đăng Ký
          </button>
        </form>
        <Link href={"/auth/signin"} className={''}>
          Đăng Nhập
        </Link>
      </div>
    </div>
  );
}
