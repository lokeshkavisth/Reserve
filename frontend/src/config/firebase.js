import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWZ1m4Urs3iRy2dkpeLlzhyXoyufPCbbA",
  authDomain: "reserve-17eed.firebaseapp.com",
  projectId: "reserve-17eed",
  storageBucket: "reserve-17eed.appspot.com",
  messagingSenderId: "981258764000",
  appId: "1:981258764000:web:17d8ef616fb3bd5810da85",
  measurementId: "G-7KL98W9SC0",
};

const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
