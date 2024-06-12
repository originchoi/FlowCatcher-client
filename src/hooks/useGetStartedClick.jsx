import { useNavigate } from "react-router-dom";
import useAuth from "../apis/useAuth";

function useGetStartedClick() {
  const { isLoggedIn, handleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleStartNowClick() {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      try {
        await handleLogin();
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  }

  return handleStartNowClick;
}

export default useGetStartedClick;
