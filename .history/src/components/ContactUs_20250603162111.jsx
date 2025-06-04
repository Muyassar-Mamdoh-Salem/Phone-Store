import React from 'react'
import { FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const ContactUs = () => {
    return (
        <div className='bg-[#4DB6AC]'>
            <h2 className='font-bold text-3xl'>Contact Us</h2>

            <section className='grid grid-cols-2 gap-4 place-items-center'>

                <div>
                    <ul className='flex gap-4 text-2xl'>
                        <Link className='text-8xl text-[#FA8912]'><FaTwitter /></Link>
                        <Link className=''><FaFacebookF className='text-4xl text-[#FA8912]' /></Link>
                        <Link ><FaTiktok className='text-4xl text-[#FA8912]' /></Link>
                    </ul>
                </div>

                <div>
                 <form className='grid gap-4 grid-cols-2'>
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
    <input type="email" className='border-2 border-blue-200 py-2 rounded-full px-4' />
  </div>

  {/* Message */}
  <div className="flex flex-col col-span-2">
    <label>Message:</label>
    <textarea className='border-2 border-blue-200 py-2 px-4 rounded-xl min-h-[120px]' />
  </div>

  {/* Button */}
  <div className="col-span-2 flex justify-center">
    <button className='bg-[#148833] px-8 py-2 rounded-lg text-white text-xl'>Send</button>
  </div>
</form>

                </div>
            </section>

        </div>
    )
}

export default ContactUs