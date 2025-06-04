import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as firebaseLogin, signUp as firebaseSignUp, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import axios from 'axios';
import products fr;
// إنشاء السياق
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // لحفظ المستخدم الحالي
  const [loading, setLoading] = useState(true); // لتتبع حالة تحميل الجلسة
  const navigate = useNavigate(); // لتوجيه المستخدم بعد التسجيل أو تسجيل الدخول
  const [cart, setCart] = useState([]); // لحفظ محتويات السلة]
  // const [cartItems, setCartItems] = useState([0]); // تخزين المنتجات في السلة // تخزين المنتجات في السلة


  // -------------------
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
  // ------------------ 

  //  دي بتتغير add to card  عند إضافة منتج إلى السلة
  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(Products);
  }, []);
  // -------
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // لو المنتج موجود، زود الكمية
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // لو المنتج جديد، أضفه بكمية 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  // --------
  // دالة لإزالة منتج من السلة
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId)); // حذف المنتج من السلة
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // لو الكمية بقت 0 نشيله من السلة
    );
  };
  // دالة لتفريغ السلة
  const clearCart = () => {
    setCart([]); // تفريغ السلة بتعيينها إلى مصفوفة فارغة
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  // توفير القيم للمكونات التي تستخدم السياق
  const value = {
    currentUser, // المستخدم الحالي
    login, // دالة تسجيل الدخول
    signup, // دالة التسجيل
    logout, // دالة تسجيل الخروج
    loading, // حالة التحميل
    cart, // حالة التحميل للسلة
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCart, // دالة لتعيين السلة الحالية
    products,
    setProducts, // دالة لتعيين المنتج الحالي
    increaseQuantity, // دالة لزيادة كمية
    decreaseQuantity, // دالة لتقليل الكمية
    totalPrice,
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
