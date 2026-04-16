import { getBoards } from "../api/board";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Board } from "../types/board";

function BoardPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBoards();
      setBoards(res);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>게시판 목록</h2>

      {boards.map((item) => (
        <div key={item.id} onClick={() => navigate(`/board/${item.id}`)}>
          <h3>{item.boardTitle}</h3>
          <p>{item.boardContents}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardPage;
