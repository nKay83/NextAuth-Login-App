import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "app/data/users.json");

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    
    const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
    if (users.some((user: any) => user.email === email)) {
      return NextResponse.json({ message: "Email đã tồn tại." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Đăng ký thành công.", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi máy chủ, vui lòng thử lại." }, { status: 500 });
  }
}
