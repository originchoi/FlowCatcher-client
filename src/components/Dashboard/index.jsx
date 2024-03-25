import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";

import Header from "../Header";
import Navbar from "../NavBar";
import { useHeaderStateStore, useUserStore } from "../../store/store";

function Dashboard() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore();
  const { setHeaderState } = useHeaderStateStore();

  useEffect(() => {
    setHeaderState("Dashboard");

    async function checkLogin() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/check`,
          {
            withCredentials: true,
          },
        );

        if (response.data.result) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Login status check failed:", error);
        navigate("/");
      }
    }

    checkLogin();
  }, [navigate, setIsLoggedIn, setUser, setHeaderState]);

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
