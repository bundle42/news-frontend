import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { initAuth } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      await initAuth();
      navigate("/board");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          아직 계정이 없나요?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
