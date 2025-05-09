'use server';
 
import { signIn } from '@/app/auth/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Tài khoản hoặc mật khẩu không đúng';
        default:
          return 'Đã xảy ra lỗi, vui lòng thử lại sau';
      }
    }
    throw error;
  }
}