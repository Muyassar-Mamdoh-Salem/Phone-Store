// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPasFko3YJIcumM2Y_VMZHhyMtg9rxiQ",
  authDomain: "phone-store-bbb1e.firebaseapp.com",
  projectId: "phone-store-bbb1e",
  storageBucket: "phone-store-bbb1e.appspot.com",
  messagingSenderId: "112849454913",
  appId: "1:112849454913:web:d45ebeabdb8d62063983c0",
  measurementId: "G-RSEZEC8P4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
      message: "Account created successfully"
    };
  } catch (error) {
    let message = "An error occurred during sign up";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already in use";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters";
        break;
      case "auth/invalid-email":
        message = "Invalid email address";
        break;
    }

    return { success: false, message };
  }
};

// Login function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let message = "An error occurred during login";

    switch (error.code) {
      case "auth/user-not-found":
        message = "No user found with this email";
        break;
      case "auth/wrong-password":
        message = "Incorrect password";
        break;
      case "auth/invalid-email":
        message = "Invalid email address";
        break;
    }

    return { success: false, message };
  }
};

export { auth, signUp, login };
