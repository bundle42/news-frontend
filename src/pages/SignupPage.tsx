import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(email, password, name);
      alert("회원가입 성공");
      navigate("/login");
    } catch (e: any) {
      const status = e?.response?.status;
      const msg = e?.response?.data;

      if (!status) {
        alert("서버가 응답하지 않습니다");
        return;
      }

      if (status === 400) {
        if (msg === "EMAIL_EXISTS") {
          alert("이미 존재하는 이메일입니다");
        } else {
          alert("입력값이 잘못되었습니다");
        }
      } else {
        alert("회원가입 실패");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            회원가입
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있나요?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
