import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

function UpdateProfilePage() {
  const navigate = useNavigate();

  const [id, setId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 회원 탈퇴하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await client.delete("/api/member/me");

      alert("회원 탈퇴 완료");
      navigate("/login");
    } catch (e) {
      alert("회원 탈퇴 실패");
    }
  };

  // 기존 회원정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await getMe();

        setId(me.id);
        setEmail(me.memberEmail);
        setName(me.memberName);
      } catch (e) {
        alert("로그인이 필요합니다");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await client.put("/api/member/me", {
        id,
        memberEmail: email,
        memberPassword: password,
        memberName: name,
      });

      alert("수정 완료");
      navigate("/board");
    } catch (e) {
      alert("수정 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">정보 수정</h1>

        <div className="space-y-4">
          {/* 이메일 (readonly) */}
          <input
            className="w-full px-4 py-3 border rounded-lg bg-gray-100"
            value={email}
            readOnly
          />

          {/* 비밀번호 */}
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="새 비밀번호 (입력 시 변경)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 이름 */}
          <input
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            정보수정
          </button>

          <button
            onClick={handleDelete}
            className="w-full mt-3 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
