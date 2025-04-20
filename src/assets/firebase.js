// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHPasFko3YJIcumM2Y_VMZHhyMtg9rxiQ",
  authDomain: "phone-store-bbb1e.firebaseapp.com",
  projectId: "phone-store-bbb1e",
  storageBucket: "phone-store-bbb1e.appspot.com",
  messagingSenderId: "112849454913",
  appId: "1:112849454913:web:d45ebeabdb8d62063983c0",
  measurementId: "G-RSEZEC8P4F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
      message: "تم إنشاء الحساب بنجاح"
    };
  } catch (error) {
    let message = "حدث خطأ أثناء التسجيل";
    switch(error.code) {
      case "auth/email-already-in-use":
        message = "هذا البريد الإلكتروني مستخدم بالفعل";
        break;
      case "auth/weak-password":
        message = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        break;
      case "auth/invalid-email":
        message = "بريد إلكتروني غير صالح";
        break;
    }
    return { success: false, message };
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let message = "حدث خطأ أثناء تسجيل الدخول";
    return { success: false, message };
  }
};

export { auth, signUp, login };
