import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

function BoardUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loginUser } = useAuth();

  const [form, setForm] = useState({
    boardTitle: "",
    boardContents: "",
  });

  useEffect(() => {
    if (!id) return;

    client.get(`/api/board/${id}`).then((res) => {
      if (loginUser?.id !== res.data.memberId) {
        alert("권한이 없습니다.");
        navigate(`/board/${id}`);
        return;
      }

      setForm({
        boardTitle: res.data.boardTitle,
        boardContents: res.data.boardContents,
      });
    });
  }, [id]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await client.put(`/api/board/${id}`, form);
      navigate(`/board/${id}`);
    } catch (e) {
      alert("수정 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* 수정 폼 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-4">✏️ 글 수정</h1>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Title</p>
              <input
                name="boardTitle"
                value={form.boardTitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Contents</p>
              <textarea
                name="boardContents"
                value={form.boardContents}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 h-40"
              />
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← 취소
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardUpdatePage;
