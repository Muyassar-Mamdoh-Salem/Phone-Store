import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Cart from './pages/Cart';
import NavbarMain from './components/NavBarMain';
import Footer from './components/Footer';
import { AuthProvider } from './assets/context/AuthContext';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/CheckOut'; // صححت اسم الملف
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
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Layout>
        <ScrollToTop />
        <BackToTop />
        {/* تغليف محتوى الصفحات بالـ ref الخاص بالـ GSAP */}
        <div ref={containerRef}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkOut" element={<Checkout />} />
          </Routes>
        </div>
      </Layout>
    </AuthProvider>
  );
}

export default App;
