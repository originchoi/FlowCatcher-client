import { useNavigate } from "react-router-dom";
import axios from "axios";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";

import { useUserStore } from "../store/store";

function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserStore();

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
      console.error("Failed to check login status:", error);
      navigate("/");
    }
  }

  async function handleLogin() {
    try {
      const response = await signInWithPopup(auth, provider);
      const { user: firebaseUser } = response;

      if (firebaseUser) {
        const userData = {
          email: firebaseUser.email,
          username: firebaseUser.displayName,
        };

        const loginResponse = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/signIn`,
          userData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (loginResponse.data.result === "ok") {
          setIsLoggedIn(true);
          setUser(loginResponse.data.user);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Failed to handle login:", error);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/signOut`, {
        withCredentials: true,
      });

      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to handle logout:", error);
    }
  }

  return { user, isLoggedIn, handleLogin, handleLogout, checkLogin };
}

export default useAuth;
