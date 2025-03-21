// 'use client';
// import { FormEvent } from 'react'
// import { useRouter } from 'next/navigation'
 
// export default function LoginPage() {
//   const router = useRouter()
 
//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
 
//     const formData = new FormData(event.currentTarget)
//     const email = formData.get('email')
//     const password = formData.get('password')
 
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })
 
//     if (response.ok) {
//       router.push('/profile')
//     } else {
//       // Handle errors
//     }
//   }
 
//   return (
//     <form onSubmit={handleSubmit} className='mx-auto text-black grid grid-rows-none items-center justify-items-center max-w-96 min-h-1 p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
//       <input type="email" name="email" placeholder="Email" required className='min-h-12 rounded-md' /> <br/>
//       <input type="password" name="password" placeholder="Password" required  className='min-h-12 rounded-md'/>
//       <button type="submit" className='bg-white rounded-md min-w-20 text-2xl text-black'>Login</button>
//     </form>
//   )
// }
"use client";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react";

interface Errors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      await handleAuth();
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleAuth = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        alert(result.message)
        toast.success("Đăng nhập thành công.", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        alert(result.message)
        toast.error(result.message || "Đăng nhập không thành công.", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.')
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className='mx-auto grid grid-rows-none items-center justify-items-center max-w-96 min-h-1 p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h2 className=''>Đăng Nhập</h2>
      <div className=''></div>
      <form onSubmit={handleSubmit} className=''>
        <div className=''>
          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            type="text"
            className='text-black min-h-12 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className=''>{errors.email}</div>
          )}
        </div>
        <div className=''>
          <label htmlFor="Password">Mật khẩu</label>
          <div className=''>
            <input
              id="Password"
              type={showPassword ? "text" : "password"}
              className='text-black min-h-12 rounded-md'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className=''
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <div className=''>{errors.password}</div>
          )}
        </div>
        {successMessage && (
          <div className=''>{successMessage}</div>
        )}
        <button type="submit" className="">
          Đăng Nhập
        </button>
      </form>
      <Link href={"/auth/signup"} className=''>
        Đăng Kí Ngay
      </Link>
      <button
        onClick={() => signIn("google")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >Đăng nhập bằng google</button>
    </div>
  );
}
