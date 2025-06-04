import React from 'react'
import { FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';

// {library EmailJS}
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {



const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'your_service_id', // ← استبدله
      'your_template_id', // ← استبدله
      form.current,
      'your_public_key' // ← استبدله
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
        <div className='bg-[#b1ebe5] pb-5'>
            <h2 className='font-bold text-3xl pt-5 ml-10 '>Contact Us</h2>

            <section className="grid grid-cols-2 gap-4 place-items-center container">


                <div>
                    <ul className='flex gap-4 text-7xl'>
                        <Link className='text-7xl text-[#FA8912]'><FaTwitter /></Link>
                        <Link ><FaFacebookF className='text-7xl text-[#FA8912]' /></Link>
                        <Link ><FaTiktok className='text-7xl text-[#FA8912]' /></Link>
                    </ul>
                </div>

                <div>
                    <form className='grid gap-4 grid-cols-2' ref={form} onSubmit={sendEmail}>
                        {/* Name */}
                        <div className="flex flex-col">
                            <label>Name:</label>
                            <input type="text" className='border-2 border-blue-200 py-2 rounded-full px-4' />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label>Phone:</label>
                            <input type="phone" className='border-2 border-blue-200 py-2 rounded-full px-4' />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label>Email:</label>
                            <input type="email" className='border-2 border-blue-200 py-2 rounded-full px-4'  />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col col-span-2">
                            <label>Message:</label>
                            <textarea className='border-2 border-blue-200 py-2 px-4 rounded-xl min-h-[120px]'name="message" />
                        </div>

                        {/* Button */}
                        <div className="col-span-2 flex justify-start">
                            <button className='bg-[#148833] px-8 py-2 rounded-lg text-white text-xl' type='submit'>Send</button>
                        </div>

                    </form>

                </div>
            </section>

        </div>
    )
}

export default ContactUs