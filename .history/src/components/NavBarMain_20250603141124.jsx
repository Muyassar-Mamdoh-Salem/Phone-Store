import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../assets/context/AuthContext';
import { HashLink } from 'react-router-hash-link';
import { animate } from "framer-motion";


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
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionScroll = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // library motion farmer ////////////////////

const scrollToFooter = () => {
  const footer = document.getElementById("Footer");
  if (!footer) return;

  const start = window.scrollY;
  const end = footer.getBoundingClientRect().top + window.scrollY;

  animate(start, end, {
    duration: 1.2,
    onUpdate(value) {
      window.scrollTo(0, value);
    },
    ease: [0.42, 0, 0.58, 1.0]// حركة سلسة (ease-in-out)
  });
};

  return (
    <nav className="bg-[#80CBC4] py-3 px-4 lg:px-[50px] fixed top-0 w-full z-50 ">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <ul className="flex justify-between items-center list-none font-semibold p-0 m-0">
          <div className="flex gap-8">
            <li>
            
              <HashLink>

                Home
              </HashLink>
            </li>
            <li>
             <HashLink 
             to={"#Footer"} 
             onClick={scrollToFooter}
                className="hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer  scroll-smooth" >
              About
             </HashLink>
            </li>
            <li>
              <button
                onClick={() => handleSectionScroll('contact')}
                className="hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </li>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <form className="relative">
              <div className="relative flex items-center">
                <button
                  type="submit"
                  className="absolute left-3 text-[#FFB433] hover:text-[#E69500] focus:outline-none"
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </button>
                <div className="absolute left-10 h-5 w-[1.5px] bg-gray-400"></div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 pl-14 pr-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#FFB433] bg-white"
                />
              </div>
            </form>
          </div>

          <div className="flex gap-8 items-center">
            <Link
              to="/cart"
              className="relative p-1 text-[#FFB433] hover:text-[#ffda6b] rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart size={30} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {currentUser ? (
              <>
                {(() => {
                  const emailPrefix = currentUser.email.split('@')[0].slice(0, 4);
                  const emailDomain = currentUser.email.split('@')[1];
                  return (
                    <span className="text-[#FFB433] font-semibold">
                      {`${emailPrefix}@${emailDomain}`}
                    </span>
                  );
                })()}
                <button
                  onClick={handleLogout}
                  className="text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white transition-colors"
                >
                  Logout
                </button>
                
              </>
            ) : (
              <> 
                <Link
                  to="/login"
                  className="text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-[16px] font-bold bg-[#FFB433] text-white border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#E69500] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#FFB433] p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className="flex-1 mx-4 max-w-xs">
          <form className="relative">
            <div className="relative flex items-center">
              <button
                type="submit"
                className="absolute left-3 text-[#FFB433] hover:text-[#E69500] focus:outline-none"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
              <div className="absolute left-10 h-5 w-[1.5px] bg-gray-400"></div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 pl-14 pr-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#FFB433] bg-white"
              />
            </div>
          </form>
        </div>

        <Link
          to="/cart"
          className="relative p-1 text-[#FFB433] hover:text-[#ffda6b] rounded-full transition-colors"
          aria-label="Shopping Cart"
        >
          <FiShoppingCart size={30} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems} {/* عرض عدد العناصر في السلة */}
          </span>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#80CBC4] py-4 px-4 absolute left-0 right-0 z-50 shadow-md">
          <ul className="flex flex-col gap-4 list-none font-semibold p-0 m-0">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:underline hover:text-[#FFB433] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleSectionScroll('about')}
                className="block w-full text-left py-2 hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionScroll('contact')}
                className="block w-full text-left py-2 hover:underline hover:text-[#FFB433] transition-colors bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </li>

            {currentUser ? (
              <>
                <li className="pt-4 border-t border-[#FFB433]">
                  <span className="block py-2 text-[#FFB433]">
                    {(() => {
                      const emailPrefix = currentUser.email.split('@')[0].slice(0, 4);
                      const emailDomain = currentUser.email.split('@')[1];
                      return `${emailPrefix}@${emailDomain}`;
                    })()}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 hover:bg-[#FFB433] hover:text-white transition-colors"
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
                    className="block w-full text-[16px] font-bold bg-[#FBF8EF] text-[#FFB433] border border-[#FFB433] rounded-lg px-6 py-2 text-center hover:bg-[#FFB433] hover:text-white transition-colors mb-4"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-[16px] font-bold bg-[#FFB433] text-white border border-[#FFB433] rounded-lg px-6 py-2 text-center hover:bg-[#E69500] transition-colors"
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