// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5BiGYeFHcApDGWzWZ_68sAo74gtCZZSs",
  authDomain: "codeforge-159ca.firebaseapp.com",
  projectId: "codeforge-159ca",
  storageBucket: "codeforge-159ca.firebasestorage.app",
  messagingSenderId: "386679860289",
  appId: "1:386679860289:web:65af9a9bcd030117d72ac0",
  measurementId: "G-C9D5HGK7P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };