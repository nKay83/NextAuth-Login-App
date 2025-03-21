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
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  // return (
  //   <form action={formAction} className="space-y-3 text-black">
  //     <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
  //       <h1 className={`mb-3 text-2xl`}>
  //         Please log in to continue.
  //       </h1>
  //       <div className="w-full">
  //         <div>
  //           <label
  //             className="mb-3 mt-5 block text-xs font-medium text-gray-900"
  //             htmlFor="email"
  //           >
  //             Email
  //           </label>
  //           <div className="relative">
  //             <input
  //               className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  //               id="email"
  //               type="email"
  //               name="email"
  //               placeholder="Enter your email address"
  //               required
  //             />
  //             <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
  //           </div>
  //         </div>
  //         <div className="mt-4">
  //           <label
  //             className="mb-3 mt-5 block text-xs font-medium text-gray-900"
  //             htmlFor="password"
  //           >
  //             Password
  //           </label>
  //           <div className="relative">
  //             <input
  //               className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  //               id="password"
  //               type="password"
  //               name="password"
  //               placeholder="Enter password"
  //               required
  //               minLength={6}
  //             />
  //             <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
  //           </div>
  //         </div>
  //       </div>
  //       <input type="hidden" name="redirectTo" value={callbackUrl} />
  //       <button className="mt-4 w-full" aria-disabled={isPending}>
  //         Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
  //       </button>
  //       <SignInGoogle />
  //       <SignInFacebook />
  //       <SignInGithub />
  //       <div
  //         className="flex h-8 items-end space-x-1"
  //         aria-live="polite"
  //         aria-atomic="true"
  //       >
  //         {errorMessage && (
  //           <>
  //             <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
  //             <p className="text-sm text-red-500">{errorMessage}</p>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </form>
    
  // );

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
                  <SignInFacebook />
                  <SignInGithub />
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