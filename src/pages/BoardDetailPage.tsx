import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { Board } from "../types/board";
import type { Comment } from "../types/comment";

function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user: loginUser, loading } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await client.post("/api/comment", {
        boardId: id,
        commentContents: commentText,
      });

      setCommentText("");

      const res = await client.get(`/api/comment/${id}`);
      setComments(res.data);
    } catch {
      alert("댓글 작성 실패");
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    if (!window.confirm("댓글 삭제하시겠습니까?")) return;

    try {
      await client.delete(`/api/comment/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      alert("삭제 실패");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await client.delete(`/api/board/${id}`);
      navigate("/board");
    } catch (error) {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    if (!id) return;

    client
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch(() => setError("게시글을 불러오지 못했습니다."));
    client
      .get(`/api/comment/${id}`)
      .then((res) => setComments(res.data))
      .catch(() => setError("댓글을 불러오지 못했습니다."));
  }, [id]);

  // Auth 로딩 먼저 처리
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로그인 정보 확인중...
      </div>
    );
  }

  // 게시글 로딩
  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {error || "로딩중..."}
      </div>
    );
  }

  const isOwner = loginUser?.id === board.memberId;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* 게시글 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-2">{board.boardTitle}</h1>

          {/* 작성자 / 날짜 / 조회수 */}
          <div className="text-sm text-gray-500 flex gap-4 mb-4">
            <span>작성자: {board.memberEmail}</span>
            <span>조회수: {board.boardHits}</span>
            <span>작성일: {new Date(board.createdAt).toLocaleString()}</span>
          </div>

          <p className="text-gray-700 whitespace-pre-line">
            {board.boardContents}
          </p>

          {/* 수정 / 삭제 버튼 */}
          {isOwner && (
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => navigate(`/board/update/${id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                수정
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 뉴스 정보 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">📰 뉴스 정보</h3>

          <a
            href={board.newsLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            원문 보기
          </a>

          <p className="text-gray-500 text-sm mt-2">{board.pubDate}</p>
        </div>

        {/* 감정 분석 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-3">📊 감정 분석</h3>

          <div className="flex gap-6">
            <div>
              <p className="text-gray-500 text-sm">Label</p>
              <p className="text-xl font-bold">{board.label}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Confidence</p>
              <p className="text-xl font-bold">
                {(board.confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Score</p>
              <p
                className={`text-xl font-bold ${
                  board.sentimentScore > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {board.sentimentScore}
              </p>
            </div>
          </div>
        </div>

        {/* 분석 종목 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">📌 분석 종목</h3>

          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {board.searchQuery}
          </span>
        </div>

        {/* 첨부 파일 */}
        {board.fileAttached === 1 && (
          <img
            src={`/uploads/${board.storedFileName}`}
            className="max-w-full h-auto"
          />
        )}

        {/* 뒤로가기 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 뒤로가기
          </button>
        </div>
      </div>

      {/* 댓글 섹션 */}
      {/* 댓글 */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">댓글</h3>

        {/* 입력창 */}
        {loginUser && (
          <div className="flex gap-2 mb-4">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              작성
            </button>
          </div>
        )}

        {/* 목록 */}
        <div className="space-y-3">
          {comments.length === 0 && (
            <p className="text-gray-400">댓글이 없습니다.</p>
          )}

          {comments.map((c) => (
            <div
              key={c.id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">{c.memberEmail}</p>
                <p>{c.commentContents}</p>
              </div>

              {/* 본인 댓글만 삭제 */}
              {loginUser?.id === c.memberId && (
                <button
                  onClick={() => handleCommentDelete(c.id)}
                  className="text-red-500 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardDetailPage;
