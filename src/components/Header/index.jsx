import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { useHeaderStateStore, useUserStore } from "../../store/store";

function Header() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserStore();
  const { headerState } = useHeaderStateStore();
  const isDashboard = headerState === "Dashboard";

  useEffect(() => {
    async function checkLogin() {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/check`,
        {
          withCredentials: true,
        },
      );

      if (response.data.result) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      }

      return response.data;
    }

    checkLogin();
  }, []);

  async function logIn(userData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signIn`,
        userData,
        {
          headers: {
            "content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.result === "ok") {
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogin() {
    try {
      const response = await signInWithPopup(auth, provider);
      const { user: firebaseUser } = response;

      if (firebaseUser) {
        logIn(firebaseUser);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogOut() {
    try {
      await signOut(auth);

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/signOut`,
        { withCredentials: true },
      );

      if (response.data.result === "ok") {
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center sm:justify-between items-center w-screen shrink sticky top-0 gap-4 lg:gap-8 pt-8 px-4 py-2 z-50 bg-white mb-10">
      <Link to="/">
        <div className="flex items-center mb-5 mt-5">
          <img
            className="w-35 ml-10 mx-auto"
            src="/assets/FlowChart_logo.png"
            alt="Logo"
          />
          {!isDashboard ? (
            <div className="ml-15 text-2xl z-10">FlowCatcher</div>
          ) : (
            <div className="ml-15 text-2xl z-10">Analytics Dashboard</div>
          )}
        </div>
      </Link>
      <div className="flex mr-4 ml-auto">
        <Link to="/">
          <div
            className="p-2 mr-4 items-center rounded-full hover:bg-sky-50 cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <p className="m-3 text-sm">Home</p>
          </div>
        </Link>
        {!isLoggedIn ? (
          <button
            className="p-2 mr-20 items-center rounded-full hover:bg-sky-50 cursor-pointer"
            onClick={handleLogin}
          >
            <p className="m-3 text-sm">Sign In</p>
          </button>
        ) : (
          <>
            <button
              className="p-2 items-center rounded-full hover:bg-sky-50 cursor-pointer"
              onClick={handleDashboard}
            >
              <p className="m-3 text-sm">Dashboard</p>
            </button>
            <button
              className="p-2 mr-4 items-center rounded-full hover:bg-sky-50 cursor-pointer"
              onClick={handleLogOut}
            >
              <p className="m-3 text-sm">Sign Out</p>
            </button>
            <div
              className="flex ml-auto items-center rounded-full cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <img
                className="h-25 w-25 rounded-full mr-20"
                src={user?.photoURL}
                alt="signIn"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
