import { auth } from "../auth/auth";
import LogoutButton from "../components/LogoutButton";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        return <p className="text-white text-center mt-10">Bạn chưa đăng nhập.</p>;
    }
    
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
                <h1 className="text-xl font-bold">Xin chào, {session.user?.name}!</h1>
                <p className="text-gray-300 mt-2">{session.user?.email}</p>
                <div className="mt-4 mx-auto w-28">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
