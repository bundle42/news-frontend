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

  if (!user) return <Navigate to="/" replace />;

  if (user.memberRole !== "ROLE_ADMIN") {
    alert("관리자만 접근 가능합니다.");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
