import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);

  useEffect(() => {
    client.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
    });
  }, [id]);

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        로딩중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* 게시글 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-2">{board.boardTitle}</h1>
          <p className="text-gray-600">{board.boardContents}</p>
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

        {/* 분석 종목 정보 */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">📌 분석 종목</h3>

          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {board.searchQuery}
          </span>
        </div>

        {/* 뒤로가기 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardDetailPage;
