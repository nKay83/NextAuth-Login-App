import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';
import { createUserOAuth2, getUser } from '@/app/lib/db'; // Import your database functions


export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
        },
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Facebook({
          clientId: process.env.FACEBOOK_CLIENT_ID!,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      }),
      GitHub({
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    callbacks:{
      async signIn({ user, account }) {
        if (account?.provider !== "credentials") {
          // Kiểm tra nếu người dùng đã tồn tại trong cơ sở dữ liệu
          // Nếu không tồn tại, tạo người dùng mới
          // và yêu cầu họ đặt mật khẩu
          if (!user.email) {
            return false; // Không cho phép đăng nhập nếu không có email
          }
          const existingUser = await getUser(user.email);
  
          if (!existingUser) {
            if (!user.name) {
              console.log("user.name không tồn tại");
              return false; // Không cho phép đăng nhập nếu không có tên
            }
            console.log("Tạo người dùng mới:", user.name, user.email);
            await createUserOAuth2(user.name, user.email); // Tạo người dùng mới với mật khẩu rỗng  
            return true ; // Cho phép đăng nhập
          }
        }
        return true;
      },
    }
  });