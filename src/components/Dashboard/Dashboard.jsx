import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useHeaderStateStore } from "../../store/store";
import useAuth from "../../apis/useAuth";

import Header from "../Header";
import Navbar from "./NavBar";

function Dashboard() {
  const { setHeaderState } = useHeaderStateStore();
  const { checkLogin } = useAuth();

  useEffect(() => {
    setHeaderState("Dashboard");
    checkLogin();
  }, [setHeaderState]);

  return (
    <div className="flex flex-col min-h-screen mt-3">
      <Header />
      <div className="flex flex-row flex-1">
        <Navbar />
        <div className="flex-grow border border-gray-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
