import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

import { User } from "src/types/auth";
import { useHeaderStateStore } from "../../store/store";
import useAuth from "../../apis/useAuth";

function Header() {
  const navigate = useNavigate();
  const { headerState } = useHeaderStateStore();
  const { user, isLoggedIn, handleLogin, handleLogout, checkLogin } = useAuth();
  const isDashboard = headerState === "Dashboard";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  function handleDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-between items-center sticky w-full top-0 gap-4 pt-8 px-4 py-2 z-50 bg-white mb-10">
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
      <div className="flex items-center lg:hidden fixed right-4 top-20 z-50">
        <button
          className="p-2 mr-4 items-center rounded-full hover:bg-sky-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <div className="hidden lg:flex lg:items-center">
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
              onClick={handleLogout}
              aria-label="Sign out"
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
                src={(user as User)?.photoURL}
                alt="signIn"
              />
            </div>
          </>
        )}
      </div>
      {menuOpen && (
        <div
          className={`fixed top-50 right-4 mt-2 bg-white shadow-lg rounded-lg z-50 transition-all duration-300 ${menuOpen ? "animate-dropdownOpen" : "animate-dropdownClose pointer-events-none"}`}
        >
          <div className="flex flex-col items-center">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <div
                className="p-2 items-center rounded-full hover:bg-sky-50 cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <p className="m-3 text-sm">Home</p>
              </div>
            </Link>
            {!isLoggedIn ? (
              <button
                className="p-2 items-center rounded-full hover:bg-sky-50 cursor-pointer"
                onClick={() => {
                  handleLogin();
                  setMenuOpen(false);
                }}
              >
                <p className="m-3 text-sm">Sign In</p>
              </button>
            ) : (
              <>
                <button
                  className="p-2 items-center rounded-full hover:bg-sky-50 cursor-pointer"
                  onClick={() => {
                    handleDashboard();
                    setMenuOpen(false);
                  }}
                >
                  <p className="m-3 text-sm">Dashboard</p>
                </button>
                <button
                  className="p-2 items-center rounded-full hover:bg-sky-50 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  aria-label="Sign out"
                >
                  <p className="m-3 text-sm">Sign Out</p>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
