import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home';
import Login from './assets/pages/Login';
import SignUp from './assets/pages/SignUp';
import About from './assets/pages/About';
import Cart from './assets/pages/Cart';
import NavbarMain from './assets/components/NavBarMain';
import Footer from './assets/components/Footer';
import { AuthProvider } from './assets/context/AuthContext';

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
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
