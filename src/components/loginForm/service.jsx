import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase";

const backendUrl = "https://groundreactionforce.onrender.com";

export const sendResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("✅ Password reset email sent!");
  } catch (err) {
    console.error("Reset Password Error:", err);
  }
};