import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import type { Board } from "../types/board";

function MyBoardPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const stockLogos: Record<string, string> = {
    삼성전자: "/logos/samsung.png",
    SK하이닉스: "/logos/skhynix.png",
    현대차: "/logos/hyundai.png",
  };

  const noImage = "/logos/no-image.png";

  const fetchMyBoards = async () => {
    setLoading(true);

    try {
      const res = await client.get("/api/board/my", {
        withCredentials: true,
      });

      setBoards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBoards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        내 글 불러오는 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">내가 쓴 글</h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {boards.map((item) => {
            const logo = stockLogos[item.searchQuery] ?? noImage;

            return (
              <div
                key={item.id}
                onClick={() => navigate(`/board/${item.id}`)}
                className="rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer overflow-hidden bg-white"
              >
                {/* 로고 */}
                <div className="h-32 flex items-center justify-center bg-white">
                  <img src={logo} className="h-16 object-contain" />
                </div>

                {/* 내용 */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {item.boardTitle}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mt-2">
                    {item.boardContents}
                  </p>

                  <div className="mt-3 text-xs text-gray-400">
                    조회수 {item.boardHits}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {boards.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            작성한 글이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBoardPage;
