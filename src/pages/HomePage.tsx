import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center bg-white p-10 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">📈 주가 예측 플랫폼</h1>

        <p className="text-gray-500 mb-6">
          AI 기반 주가 예측 및 게시판 서비스입니다
        </p>

        {/* 로그인 상태 분기 */}
        {!user ? (
          <div className="space-x-3">
            <button
              onClick={() => navigate("/board")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              게시판 보기
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              로그인
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              👋 {user.memberName || user.memberEmail} 님 환영합니다
            </p>

            <div className="space-x-3">
              <button
                onClick={() =>
                  (window.location.href = `${API_URL}/board/myList`)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                내 글 보기
              </button>

              {user.memberRole === "ROLE_ADMIN" && (
                <button
                  onClick={() => navigate("/admin/members")}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  관리자
                </button>
              )}

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
