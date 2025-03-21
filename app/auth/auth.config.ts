import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
export const authConfig = {
    pages: {
      signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnPublic = ['/',"/login", '/posts'].includes(nextUrl.pathname);
          console.log("on authorized"+nextUrl.pathname)
          if (!isOnPublic && !isLoggedIn) {
              return false; // Redirect unauthenticated users to login page
          }
          if (isLoggedIn && nextUrl.pathname.startsWith("/auth/login")) {
            return NextResponse.redirect(new URL('/', nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
  } satisfies NextAuthConfig;