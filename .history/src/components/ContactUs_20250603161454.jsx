import React from 'react'
import { FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const ContactUs = () => {
    return (
        <div >
        <div >
        <div className=''>
            <h2 className='font-bold text-3xl'>Contact Us</h2>

            <section className=''>

                <div>
                    <ul className='flex gap-4 text-2xl'>
                        <Link className='text-4xl text-[#FA8912]'><FaTwitter /></Link>
                        <Link className=''><FaFacebookF className='text-4xl text-[#FA8912]' /></Link>
                        <Link ><FaTiktok className='text-4xl text-[#FA8912]' /></Link>
                    </ul>
                </div>

                <div>
                    <form >
                        <label>Name:</label>
                        <input type="text" className='border-2 border-blue-200 py-2 rounded-full' />
                        <label>phone:</label>
                        <input type="phone" className='border-2 border-blue-200 py-2 rounded-full' />
                        <label>Email:</label>
                        <input type="email" className='border-2 border-blue-200 py-2 rounded-full' />
                        <label>Message:</label>
                        <input type="text" className='border-2 py-6 border-blue-200 rounded-xl' />
                        <button className='bg-[#148833] px-8 py-2 rounded-lg text-white text-xl'>Send</button>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default ContactUs