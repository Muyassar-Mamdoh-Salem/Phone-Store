import React from 'react';
import { FiPhoneCall, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Footer() {
  return (
<footer id="Footer" className="bg-[#4DB6AC] text-white py-4 px-4 sm:px-6 lg:px-8 mt-4">
<div className="max-w-7xl mx-auto">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center sm:text-left">
      {/* Store Info */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-[#FFB433] mb-4">PhoneZone</h2>
        <p className="text-base text-gray-100 mb-4">
          Your go-to online store for the latest smartphones and accessories at unbeatable prices.
        </p>
        <div className="flex justify-center sm:justify-start space-x-4 mt-4">
          <a href="#" className="text-gray-100 hover:text-[#FFB433] transition-colors">
            <FiFacebook size={20} />
          </a>
          <a href="#" className="text-gray-100 hover:text-[#FFB433] transition-colors">
            <FiTwitter size={20} />
          </a>
          <a href="#" className="text-gray-100 hover:text-[#FFB433] transition-colors">
            <FiInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#FFB433]">Quick Links</h3>
        <ul className="space-y-3 text-gray-100">
          <li><Link to="/" className="hover:underline hover:text-[#FFB433]">Home</Link></li>
          <li><a href="/#about" className="hover:underline hover:text-[#FFB433]">About Us</a></li>
          <li><a href="/#contact" className="hover:underline hover:text-[#FFB433]">Contact</a></li>
          <li><Link to="/cart" className="hover:underline hover:text-[#FFB433]">My Cart</Link></li>
          <li><Link to="#" className="hover:underline hover:text-[#FFB433]">Privacy Policy</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#FFB433]">Contact Us</h3>
        <ul className="space-y-3 text-gray-100">
          <li className="flex items-start gap-3 justify-center sm:justify-start">
            <FiPhoneCall className="mt-1 flex-shrink-0" />
            <div>
              <p>+20 101 234 5678</p>
            </div>
          </li>
          <li className="flex items-start gap-3 justify-center sm:justify-start">
            <FiMail className="mt-1 flex-shrink-0" />
            <div>
              <p>support@gmail.com</p>
            </div>
          </li>
          <li className="flex items-start gap-3 justify-center sm:justify-start">
            <FiMapPin className="mt-1 flex-shrink-0" />
            <div>
              <p>Cairo, Egypt</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Newsletter Subscription */}
      <div className="md:col-span-2 lg:col-span-1">
        <h3 className="text-xl font-semibold mb-4 text-[#FFB433]">Newsletter</h3>
        <p className="text-gray-100 mb-4">
          Subscribe to our newsletter for the latest updates and offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFB433]"
            required
          />
          <button
            type="submit"
            className="bg-[#FFB433] hover:bg-[#E69500] text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-12 pt-6 border-t border-gray-300/30">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} All rights reserved by <span className="text-[#FFB433]">PhoneZone</span>
        </p>
        <div className="flex flex-wrap justify-center md:justify-start space-x-4">
          <a href="#" className="text-gray-200 hover:text-[#FFB433] text-sm transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-200 hover:text-[#FFB433] text-sm transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-200 hover:text-[#FFB433] text-sm transition-colors">Shipping Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;