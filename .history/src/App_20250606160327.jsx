import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { motion } from 'framer-motion'; // استيراد framer-motion
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Cart from './pages/Cart';
import NavbarMain from './components/NavBarMain';
import Footer from './components/Footer';
import { AuthProvider } from './assets/context/AuthContext';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/CheckOut';
import ScrollToTop from './components/ScrollToTo';
import BackToTop from './components/BackToTop';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <NavbarMain />}
      <div className="flex-grow">{children}</div>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FadeLoader color="#31decf" height={20} width={7} loading={true} margin={} />
      </div>
    );
  }

  return (
    <AuthProvider>
      {/* motion.div لتأثير الـ fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Layout>
          <ScrollToTop />
          <BackToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkOut" element={<Checkout />} />
          </Routes>
        </Layout>
      </motion.div>
    </AuthProvider>
  );
}

export default App;
