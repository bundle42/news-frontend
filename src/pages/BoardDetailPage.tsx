import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    client.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
    });
  }, [id]);

  const handlePredict = () => {
    if (!board.searchQuery) return;

    client
      .get(`/api/predict?stockName=${encodeURIComponent(board.searchQuery)}`)
      .then((res) => {
        setPrediction(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handlePredict2 = () => {
    if (!board.searchQuery) return;

    window.location.href = `http://localhost:8082/stock/predict?stockName=${encodeURIComponent(board.searchQuery)}`;
  };

  if (!board) return <div>로딩중...</div>;

  return (
    <div>
      <h1>{board.boardTitle}</h1>
      <p>{board.boardContents}</p>

      <h3>{board.searchQuery} 주가 예측</h3>
      <button onClick={handlePredict}>예측하기</button>

      {prediction && (
        <div style={{ marginTop: "30px" }}>
          <h2>📈 {prediction.stock_name} 주가 예측</h2>

          {(() => {
            const result = prediction.lstm_result;
            const next = result.next_prediction;

            return (
              <>
                {/* 🔵 상단 카드 */}
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "20px" }}
                >
                  <div>
                    <h4>예측 종가</h4>
                    <p>{next.predicted_next_close.toLocaleString()} 원</p>
                  </div>

                  <div>
                    <h4>등락폭</h4>
                    <p
                      style={{
                        color: next.predicted_change < 0 ? "red" : "green",
                      }}
                    >
                      {next.predicted_change.toLocaleString()} 원
                    </p>
                  </div>

                  <div>
                    <h4>등락률</h4>
                    <p
                      style={{
                        color: next.predicted_change_pct < 0 ? "red" : "green",
                      }}
                    >
                      {next.predicted_change_pct.toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <h4>방향</h4>
                    <p>{next.direction}</p>
                  </div>
                </div>

                {/* 🔵 모델 정보 */}
                <div style={{ marginTop: "30px" }}>
                  <h3>🤖 모델 정보</h3>
                  <p>시퀀스 길이: {result.sequence_length}</p>
                  <p>RMSE: {result.validation_metrics.rmse.toFixed(2)}</p>
                  <p>MAE: {result.validation_metrics.mae.toFixed(2)}</p>
                </div>

                {/* 🔵 Feature */}
                <div style={{ marginTop: "20px" }}>
                  <h4>사용된 Feature</h4>
                  <div>
                    {result.feature_cols.map((f: string) => (
                      <span key={f} style={{ marginRight: "10px" }}>
                        #{f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 🔵 테이블 */}
                <div style={{ marginTop: "30px" }}>
                  <h3>📊 과거 예측</h3>

                  <table
                    border={1}
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>실제</th>
                        <th>예측</th>
                        <th>실제 방향</th>
                        <th>예측 방향</th>
                        <th>적중</th>
                      </tr>
                    </thead>

                    <tbody>
                      {result.historical_predictions.map(
                        (item: any, idx: number) => (
                          <tr key={idx}>
                            <td>{item.date}</td>

                            <td>{item.actual_target_close.toLocaleString()}</td>

                            <td>
                              {item.predicted_target_close.toLocaleString()}
                            </td>

                            <td>{item.actual_direction}</td>

                            <td>{item.predicted_direction}</td>

                            <td>{item.direction_match ? "✅" : "❌"}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default BoardDetailPage;
