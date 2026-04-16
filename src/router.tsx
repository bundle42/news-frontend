import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: (
          <div>
            <h2>Home</h2>
            <p>주가 예측 웹사이트에 오신 것을 환영합니다!</p>
          </div>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "board",
        element: (
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "board/:id",
        element: (
          <ProtectedRoute>
            <BoardDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/members",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
