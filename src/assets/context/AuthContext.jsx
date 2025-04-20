import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as firebaseLogin, signUp as firebaseSignUp, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// إنشاء السياق
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // لحفظ المستخدم الحالي
  const [loading, setLoading] = useState(true); // لتتبع حالة تحميل الجلسة
  const navigate = useNavigate(); // لتوجيه المستخدم بعد التسجيل أو تسجيل الدخول

  useEffect(() => {
    // مراقبة حالة تسجيل الدخول باستخدام Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // تعيين المستخدم الحالي
      setLoading(false); // تغيير حالة التحميل
    });

    return unsubscribe; // تنظيف الاشتراك عند تدمير الكومبوننت
  }, []);

  // دالة لتسجيل الدخول
  const login = async (email, password) => {
    try {
      const result = await firebaseLogin(email, password); // استخدام Firebase لتسجيل الدخول
      if (result.success) {
        setCurrentUser(result.user); // تعيين المستخدم بعد نجاح تسجيل الدخول
        navigate('/'); // التوجيه إلى الصفحة الرئيسية
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message }; // إعادة خطأ إذا فشل تسجيل الدخول
    }
  };

  // دالة للتسجيل
  const signup = async (email, password) => {
    try {
      const result = await firebaseSignUp(email, password); // استخدام Firebase للتسجيل
      if (result.success) {
        setCurrentUser(result.user); // تعيين المستخدم بعد التسجيل
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message }; // إعادة خطأ إذا فشل التسجيل
    }
  };

  // دالة لتسجيل الخروج
  const logout = async () => {
    try {
      await auth.signOut(); // استخدام Firebase لتسجيل الخروج
      setCurrentUser(null); // مسح المستخدم الحالي
    } catch (error) {
      console.error('Error logging out:', error); // التعامل مع الخطأ إذا فشل تسجيل الخروج
    }
  };

  // توفير القيم للمكونات التي تستخدم السياق
  const value = {
    currentUser, // المستخدم الحالي
    login, // دالة تسجيل الدخول
    signup, // دالة التسجيل
    logout, // دالة تسجيل الخروج
    loading // حالة التحميل
  };

  // العودة للمكونات الأطفال بعد التأكد من تحميل الجلسة
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* عرض المكونات بعد التأكد من تحميل الجلسة */}
    </AuthContext.Provider>
  );
}

// هووك لاستخدام السياق في باقي التطبيق
export function useAuth() {
  return useContext(AuthContext);
}
