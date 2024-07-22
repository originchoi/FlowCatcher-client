import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useUserStore } from "../store/store";
import { AuthResponse } from "src/types/auth";

function useAuth() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUserStore();

  async function checkLogin() {
    try {
      const response = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_SERVER_URL}/auth/check`,
        {
          withCredentials: true,
        },
      );

      if (response.data.result) {
        setIsLoggedIn(true);
        setUser(response.data.user || null);
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
      const firebaseUser: FirebaseUser | null = response.user;

      if (firebaseUser) {
        const userData = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };

        const loginResponse = await axios.post<AuthResponse>(
          `${import.meta.env.VITE_SERVER_URL}/auth/signIn`,
          userData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (loginResponse.data.result) {
          setIsLoggedIn(true);
          setUser(loginResponse.data.user || null);
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
