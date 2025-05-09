import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
export const authConfig = {
    pages: {
      signIn: '/auth/login',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnPublic = ['/', "/auth/login", '/posts', '/auth/register', ].includes(nextUrl.pathname);
        console.log("on authorized"+nextUrl.pathname)
        console.log("isOnPublic"+isOnPublic)
        if (!isOnPublic && !isLoggedIn) {
            return false; // Redirect unauthenticated users to login page
        }
        if (isLoggedIn && nextUrl.pathname.startsWith("/auth/login")) {
          return NextResponse.redirect(new URL('/profile', nextUrl));
        }
        return true;
      },

    },
    providers: [], // Add providers with an empty array for now
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
  } satisfies NextAuthConfig;