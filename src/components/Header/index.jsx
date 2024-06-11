import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useHeaderStateStore, useUserStore } from "../../store/store";
import { checkLogin, handleLogOut, handleLogin } from "../../utils/auth";

function Header() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserStore();
  const { headerState } = useHeaderStateStore();
  const isDashboard = headerState === "Dashboard";

  useEffect(() => {
    checkLogin(setIsLoggedIn, setUser);
  }, []);

  function handleDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center sm:justify-between items-center w-screen shrink sticky top-0 gap-4 lg:gap-8 pt-8 px-4 py-2 z-50 bg-white mb-10">
      <Link to="/">
        <div className="flex items-center mb-5 mt-5">
          <img
            className="w-35 ml-10 mx-auto"
            src="/assets/FlowCatcher_logo.png"
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
            onClick={() => handleLogin(setIsLoggedIn, setUser)}
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
              onClick={() => handleLogOut(setIsLoggedIn, navigate)}
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
