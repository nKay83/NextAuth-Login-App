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

const dataFile = path.join(process.cwd(), "app/data/users.json");

async function getUser(email: string) {
    try {
        const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        const user = users.find((user: any) => user.email === email);
        console.log(user)
        return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

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
  });