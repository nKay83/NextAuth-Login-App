"use-client"

import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

export function SignInGoogle() {
  return (
    <button 
      className="flex w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md items-center justify-center space-x-2 transition disabled:opacity-50"
      onClick={() => signIn("google")}
    >
      <FaGoogle className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}

export function SignInFacebook() {
  return (
    <button 
      className="flex w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md items-center justify-center space-x-2 transition disabled:opacity-50"
      onClick={() => signIn("facebook")}
    >
      <FaFacebook className="w-5 h-5" />
      <span>Sign in with Facebook</span>
    </button>
  );
}

export function SignInGithub() {
  return (
    <button 
      className="flex w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md items-center justify-center space-x-2 transition disabled:opacity-50"
      onClick={() => signIn("github")}
    >
      <FaGithub className="w-5 h-5" />
      <span>Sign in with GitHub</span>
    </button>
  );
}
