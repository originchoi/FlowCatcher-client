import { useNavigate } from "react-router-dom";
import useAuth from "../apis/useAuth";

function useGetStartedClick(): () => Promise<void> {
  const { isLoggedIn, handleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleStartNowClick(): Promise<void> {
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
