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
import SignupPage from "./pages/SignupPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import BoardUpdatePage from "./pages/BoardUpdatePage";

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
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "update-profile",
        element: (
          <ProtectedRoute>
            <UpdateProfilePage />
          </ProtectedRoute>
        ),
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
        path: "board/human",
        element: (
          <ProtectedRoute>
            <BoardPage endpoint="/api/board/human" title="사용자 게시판" />
          </ProtectedRoute>
        ),
      },
      {
        path: "board/my",
        element: (
          <ProtectedRoute>
            <BoardPage endpoint="/api/board/my" title="내 게시글" />
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
        path: "board/update/:id",
        element: (
          <ProtectedRoute>
            <BoardUpdatePage />
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
