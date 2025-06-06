import React, { useRef } from 'react';
import { FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ry2gq67',     // ← Service ID
      'template_tqax8p9',    // ← Template ID
      form.current,
      'sT-JJYsulZ724TlJj'    // ← Public Key
    )
      .then((result) => {
        console.log(result.text);
        alert('تم إرسال الرسالة بنجاح ✅');
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        alert('حدث خطأ ❌');
      });
  };

  return (
    <div className='bg-gradient-to-b from-[#b1ebe5] to-[#e0f7f4] pb-10 pt-5' id='ContactUs'>
      <h2 className='font-bold text-4xl text-center text-[#065f46] mb-8 drop-shadow-lg'>Contact Us</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-6">

        {/* Social Icons */}
        <div className="flex flex-col items-center justify-center">
          <ul className='flex gap-6 text-5xl'>
            <Link className='text-[#1DA1F2] hover:scale-110 duration-300'><FaTwitter /></Link>
            <Link className='text-[#1877F2] hover:scale-110 duration-300'><FaFacebookF /></Link>
            <Link className='text-black hover:scale-110 duration-300'><FaTiktok /></Link>
          </ul>
          <p className='mt-6 text-lg text-gray-600 text-center'>تابعنا على السوشيال ميديا</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full">
          <form className='grid gap-4 grid-cols-2' ref={form} onSubmit={sendEmail}>

            {/* Name */}
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="mb-1 text-gray-700 font-medium">Name:</label>
              <input className='border border-gray-300 py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400' name="user_name" type="text" required />
            </div>

            {/* Phone */}
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="mb-1 text-gray-700 font-medium">Phone:</label>
              <input type="tel" className='border border-gray-300 py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400' name="phone" />
            </div>

            {/* Email */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-gray-700 font-medium">Email:</label>
              <input type="email" className='border border-gray-300 py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400' name="email" required />
            </div>

            {/* Message */}
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-gray-700 font-medium">Message:</label>
              <textarea className='border border-gray-300 py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-[120px]' name="message" required />
            </div>

            {/* Button */}
            <div className="col-span-2 flex justify-start mt-2">
              <button className='bg-gradient-to-r from-green-600 to-emerald-400 px-8 py-3 rounded-xl text-white text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300' type='submit'>
                Send
              </button>
            </div>
          </form>
        </div>

      </section>
    </div>
  );
};

export default ContactUs;
