import { auth } from "@/app/auth/auth";
import LogoutButton from "@/app/components/LogoutButton";
import { getUser } from "@/app/lib/db";

export default async function ProfilePage() {
    const session = await auth();
    const user = session?.user;

    const dbUser = await getUser(user?.email || "");
    if (!dbUser) {
        return <p className="text-white text-center mt-10">Người dùng không tồn tại.</p>;
    }

    if (!session) {
        return <p className="text-white text-center mt-10">Bạn chưa đăng nhập.</p>;
    }
    console.log(dbUser.password)
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
                <h1 className="text-xl font-bold">Xin chào, {session.user?.name}!</h1>
                <p className="text-gray-300 mt-2">{session.user?.email}</p>
                {/* {!dbUser.password && (
                    <p ><strong>Bạn chưa có mật khẩu!</strong> Nếu muốn đăng nhập bằng email & mật khẩu sau này, hãy <span className="text-blue-700 underline"><a href="/auth/set-password">tạo mật khẩu ngay</a></span>.</p>
                    
                )} */}
                <div className="mt-4 mx-auto w-28">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
