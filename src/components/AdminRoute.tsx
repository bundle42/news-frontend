import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) return <div>로딩중...</div>;

  if (!user || user.memberRole !== "ROLE_ADMIN") {
    return (alert("관리자만 접근 가능합니다."), (<Navigate to="/" replace />));
  }

  return <>{children}</>;
}
