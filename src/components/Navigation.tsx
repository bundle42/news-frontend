import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b bg-gray-50">
      <div className="max-w-6xl mx-auto flex gap-6 px-6 py-3 text-sm">
        <button onClick={() => navigate("/")} className="hover:text-blue-600">
          홈
        </button>

        <button
          onClick={() => navigate("/board")}
          className="hover:text-blue-600"
        >
          게시판
        </button>

        <button
          onClick={() => navigate("/predict")}
          className="hover:text-blue-600"
        >
          예측하기
        </button>

        <button
          onClick={() => navigate("/admin/members")}
          className="hover:text-blue-600"
        >
          회원 목록
        </button>
      </div>
    </nav>
  );
}
