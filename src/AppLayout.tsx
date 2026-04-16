import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}
