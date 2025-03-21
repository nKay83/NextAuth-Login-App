import NextAuth from 'next-auth';
import { authConfig } from './app/auth/auth.config';
console.log("Middleware đang chạy"); // Kiểm tra middleware có chạy không
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
};

// export default withAuth({
//   pages: {
//     signIn: "/auth/signin", // Nếu chưa đăng nhập, chuyển hướng đến trang này
//   },
// });

// export const config = {
//     matcher: ["/:path*"], // Áp dụng middleware cho các route này
// };