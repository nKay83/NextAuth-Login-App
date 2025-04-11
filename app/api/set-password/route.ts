import { NextResponse } from "next/server";
import { auth } from "@/app/auth/auth";
import { updatePassword } from '@/app/lib/db'; // Import your database functions
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Bạn chưa đăng nhập" }, { status: 401 });
    }
    const { password } = await req.json();

    const email = session.user.email;
    if (!email) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 });
    }

    await updatePassword(email, password);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Lưu mật khẩu thất bại" }, { status: 500 });
  }
}
