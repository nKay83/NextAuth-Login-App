import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "app/data/users.json");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Vui lòng nhập email và mật khẩu." }, { status: 400 });
    }

    const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
    const user = users.find((user: any) => user.email === email);

    if (!user) {
      return NextResponse.json({ message: "Email không đúng." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Mật khẩu không đúng." }, { status: 401 });
    }

    return NextResponse.json({ message: "Đăng nhập thành công.", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi máy chủ, vui lòng thử lại." }, { status: 500 });
  }
}
