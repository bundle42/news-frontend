import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import type { Board } from "../types/board";

type Props = {
  endpoint?: string;
  title?: string;
};

function BoardPage({ endpoint = "/api/board", title = "게시판" }: Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const stockLogos: Record<string, string> = {
    삼성전자: "/logos/samsung.png",
    SK하이닉스: "/logos/skhynix.png",
    현대차: "/logos/hyundai.png",
  };

  const noImage = "/logos/no-image.png";

  const getLabelStyle = (label?: string) => {
    switch (label) {
      case "positive":
        return "border-green-400 bg-green-50";
      case "negative":
        return "border-red-400 bg-red-50";
      case "neutral":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  // 데이터 불러오기
  const fetchBoards = async () => {
    setLoading(true);

    try {
      const res = await client.get(`${endpoint}?page=${page}&size=20`);

      // Spring Page 구조 기준
      const data = res.data;
      setBoards(Array.isArray(data) ? data : (data?.content ?? []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
    window.scrollTo(0, 0);
  }, [page, endpoint]);

  useEffect(() => {
    setPage(0);
  }, [endpoint]);

  // 로딩 UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        게시글 불러오는 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/board/write")}
          >
            글쓰기
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {boards.map((item) => {
            const logo = stockLogos[item.searchQuery] ?? noImage;

            return (
              <div
                key={item.id}
                onClick={() => navigate(`/board/${item.id}`)}
                className={`rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer overflow-hidden border ${getLabelStyle(
                  item.label,
                )}`}
              >
                {/* 로고 */}
                <div className="h-32 flex items-center justify-center bg-white">
                  <img src={logo} alt="logo" className="h-16 object-contain" />
                </div>

                {/* 내용 */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    {item.boardTitle}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2">
                    {item.boardContents}
                  </p>

                  {/* 종목 */}
                  <div className="mt-3">
                    {item.searchQuery ? (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {item.searchQuery}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                        No stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            이전
          </button>

          <span className="text-gray-600 font-medium">{page + 1}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
