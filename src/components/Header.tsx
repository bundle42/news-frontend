import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 로고 */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer leading-tight"
        >
          <h1 className="text-4xl font-extrabold text-blue-600">UpNext</h1>

          <p className="text-sm text-gray-400">prediction platform</p>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-gray-600">{user.memberEmail}님</span>

              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                로그아웃
              </button>
              <button
                onClick={() =>
                  (window.location.href = `${API_URL}/member/update`)
                }
                className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                내 정보 수정
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                로그인
              </button>

              <button
                onClick={() =>
                  (window.location.href = `${API_URL}/member/save`)
                }
                className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
