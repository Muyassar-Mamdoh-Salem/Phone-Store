import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../assets/context/AuthContext';
import { animate } from 'framer-motion';

function NavbarMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [IsMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, cartItems } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دالة تمرير لأي قسم
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;

    animate(start, end, {
      duration: 1.2,
      onUpdate(value) {
        window.scrollTo(0, value);
      },
      ease: [0.42, 0, 0.58, 1.0],
    });
  };

  // تمرير مع فحص المسار الحالي
  const handleSectionScroll = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(id), 300);
    } else {
      scrollToSection(id);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#80CBC4] py-3 px-4 lg:px-[50px] fixed top-0 w-full z-50">
      {/* سطح المكتب */}
      <div className="hidden lg:block">
        <ul className="flex justify-between items-center font-semibold">
          <div className="flex gap-8">
            <li>
              <Link to="/" className="hover:underline hover:text-[#FFB433] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleSectionScroll('Footer')}
                className="hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionScroll('ContactUs')}
                className="hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </li>
          </div>

          {/* مربع البحث */}
          <div className="flex-1 max-w-md mx-4">
            <form className="relative">
              <div className="relative flex items-center">
                <button
                  type="submit"
                  className="absolute left-3 text-[#FFB433]"
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </button>
                <div className="absolute left-10 h-5 w-[1.5px] bg-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 pl-14 pr-4 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB433]"
                />
              </div>
            </form>
          </div>

          {/* الأزرار اليمنى */}
          <div className="flex gap-8 items-center">
            <Link to="/cart" className="relative p-1 text-[#FFB433] hover:text-[#ffda6b]">
              <FiShoppingCart size={30} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {currentUser ? (
              <>
                <span className="text-[#3336ff] font-semibold">
                  {`${currentUser.email.split('@')[0].slice(0, 4)}@${currentUser.email.split('@')[1]}`}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-[16px] font-bold bg-[#FFB433] text-white border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#E69500]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* الهاتف */}
      <div className="lg:hidden flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#FFB433] p-2">
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className="flex-1 mx-4 max-w-xs">
          <form className="relative">
            <div className="relative flex items-center">
              <button type="submit" className="absolute left-3 text-[#FFB433]">
                <FiSearch size={20} />
              </button>
              <div className="absolute left-10 h-5 w-[1.5px] bg-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 pl-14 pr-4 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB433]"
              />
            </div>
          </form>
        </div>

        <Link to="/cart" className="relative p-1 text-[#FFB433] hover:text-[#ffda6b]">
          <FiShoppingCart size={30} />
          {cartItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </Link>
      </div>

      {/* قائمة الهاتف */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#80CBC4] py-4 px-4 absolute left-0 right-0 z-50 shadow-md">
          <ul className="flex flex-col gap-4 font-semibold">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:underline hover:text-[#FFB433]">
                Home
              </Link>
            </li>
            <li>
              <button onClick={() => handleSectionScroll('Footer')} className="block w-full text-left py-2 hover:underline hover:text-[#FFB433]">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleSectionScroll('ContactUs')} className="block w-full text-left py-2 hover:underline hover:text-[#FFB433]">
                Contact
              </button>
            </li>

            {currentUser ? (
              <>
                <li className="pt-4 border-t border-[#FFB433]">
                  <span className="block py-2 text-[#FFB433]">
                    {`${currentUser.email.split('@')[0].slice(0, 4)}@${currentUser.email.split('@')[1]}`}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="pt-4 border-t border-[#FFB433]">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 text-center hover:bg-[#FFB433] hover:text-white mb-4"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-[16px] font-bold bg-[#FFB433] text-white border border-[#FFB433] rounded-lg px-6 py-2 text-center hover:bg-[#E69500]"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarMain;
