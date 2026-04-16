import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      await refreshUser();

      navigate("/board");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
