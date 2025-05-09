'use client';
 
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { SignInGithub, SignInFacebook, SignInGoogle } from '@/app/components/SignInButton';
import Link from 'next/link';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
      <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-96">
              <h1 className="text-2xl font-bold text-center mb-4">Đăng nhập để tiếp tục</h1>
              <form action={formAction} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                          Email
                      </label>
                      <div className="relative mt-1">
                          <input
                              className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="email"
                              type="email"
                              name="email"
                              placeholder="Nhập email"
                              required
                          />
                          <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                  </div>
                  {/* <div>
                      <label className="block text-sm font-medium text-gray-300" htmlFor="sdt">
                          Số điện thoại
                      </label>
                      <div className="relative mt-1">
                          <input
                              className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="sdt"
                              type="phone"
                              name="sdt"
                              placeholder="Nhập số điện thoại"
                              required
                          />
                      </div>
                  </div> */}
                  <div>
                      <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                          Mật khẩu
                      </label>
                      <div className="relative mt-1">
                          <input
                              className="w-full rounded-md border border-gray-600 bg-gray-900 py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="password"
                              type="password"
                              name="password"
                              placeholder="Nhập mật khẩu"
                              required
                          />
                          <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                  </div>
                  
                  {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md flex items-center justify-center transition disabled:opacity-50" disabled={isPending}>
                      Đăng nhập
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </button>
                  <SignInGoogle />
                  {/* <SignInFacebook /> */}
                  <SignInGithub />
                    <div className="text-sm text-gray-400 mt-4 text-center">
                        Chưa có tài khoản?{' '}
                        <Link href="/auth/register" className="text-blue-500 hover:underline">
                            Đăng ký ngay
                        </Link>
                    </div>
                  {errorMessage && (
                      <div className="mt-3 flex items-center text-red-500 text-sm">
                          <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                          {errorMessage}
                      </div>
                  )}
              </form>
          </div>
      </div>
  );

}