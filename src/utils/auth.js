import axios from "axios";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";

async function checkLogin(setIsLoggedIn, setUser) {
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

async function logIn(userData, setIsLoggedIn, setUser) {
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

async function handleLogin(setIsLoggedIn, setUser) {
  try {
    const response = await signInWithPopup(auth, provider);
    const { user: firebaseUser } = response;

    if (firebaseUser) {
      logIn(firebaseUser, setIsLoggedIn, setUser);
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleLogOut(setIsLoggedIn, navigate) {
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

export { checkLogin, logIn, handleLogin, handleLogOut };
