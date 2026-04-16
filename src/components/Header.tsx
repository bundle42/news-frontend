import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1 onClick={() => navigate("/")}>주가 예측 웹사이트</h1>

      <div>
        {user ? (
          <>
            <span>{user.memberEmail}님</span>
            <button
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              로그아웃
            </button>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:8082/board/myList")
              }
            >
              내가 작성한 글
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:8082/member/save")
              }
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
}
