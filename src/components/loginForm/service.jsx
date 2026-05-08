import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import api from "../../config/api";

export const sendResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("✅ Password reset email sent!");
  } catch (err) {
    console.error("Reset Password Error:", err);
  }
};

export const googleLogin = async (onLogin, navigate) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    const res = await api.post("/auth/google", { idToken });
    // console.log(JSON.stringify(res))
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", JSON.stringify(res.data.name));
    localStorage.setItem("access", JSON.stringify(res.data.access));
    onLogin();
    navigate("/home");
  } catch (err) {
    console.error("Google Login Failed:", err);
  }
};

export const githubLogin = async (onLogin, navigate) => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    // console.log('id token : '+idToken)

    const res = await api.post("/auth/github", { idToken });
    // console.log(JSON.stringify(res))
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", JSON.stringify(res.data.name));
    localStorage.setItem("access", JSON.stringify(res.data.access));
    onLogin();
    navigate("/home");
  } catch (err) {
    console.error("GitHub Login Failed:", err);
  }
};
