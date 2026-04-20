import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppLayout from "./AppLayout";
import HomePage from "./pages/HomePage";
import PredictPage from "./pages/PredictPage";
import BoardWritePage from "./pages/BoardWritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
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
        path: "board/write",
        element: (
          <ProtectedRoute>
            <BoardWritePage />
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
        path: "predict",
        element: (
          <ProtectedRoute>
            <PredictPage />
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
