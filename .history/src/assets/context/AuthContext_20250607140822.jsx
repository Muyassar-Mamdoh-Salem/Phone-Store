import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as firebaseLogin, signUp as firebaseSignUp, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import Products from "../Products.json";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await firebaseLogin(email, password);
      if (result.success) {
        setCurrentUser(result.user);
        navigate('/');
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signup = async (email, password) => {
    try {
      const result = await firebaseSignUp(email, password);
      if (result.success) {
        setCurrentUser(result.user);
      }
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // حساب مجموع الكميات لجميع المنتجات في السلة
  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(Products);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // حساب عدد العناصر الفريدة في السلة (عدد أنواع المنتجات المختلفة)
  const uniqueItemCount = cart.length;

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    cart,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setCart,
    products,
    setProducts,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    uniqueItemCount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
