import React from 'react'

const ContactUs = () => {
  return (
    <div>
        <h2>Contact Us</h2>

<section className='bg-[#4DB6AC]'>

    <div>

    </div>

    <div>
<form >
<label>Name:</label>
<input type="text" className='border-2 border-blue-200 rounded-full' />
<label>phone:</label>
<input type="phone" className='border-2 border-blue-200 rounded-full'  />
<label>Email:</label>
<input type="email" className='border-2 border-blue-200 rounded-full'  />
<label>Message:</label>
<input type="text"   className='border-2 py-6 border-blue-200 rounded-xl' />
<button className='bg-[#148833] px-8 py-2 rounded-lg text-white text'>Send</button>
</form>
    </div>
</section>

    </div>
  )
}

export default ContactUs