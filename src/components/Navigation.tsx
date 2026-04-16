import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <button onClick={() => navigate("/")}>홈</button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:8082/board/save")
        }
      >
        글 작성
      </button>
      <button onClick={() => navigate("/board")}>게시판</button>
      <button onClick={() => navigate("/admin/members")}>회원 목록</button>
    </div>
  );
}
