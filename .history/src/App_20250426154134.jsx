import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Cart from './pages/Cart';
import NavbarMain from './components/NavBarMain';
import Footer from './components/Footer';
import { AuthProvider } from './assets/context/AuthContext';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/CheckOut'; // تغيير من CheekOut إلى Checkout

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
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkOut" element={<Checkout />} /> {/* تعديل هنا */}
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
