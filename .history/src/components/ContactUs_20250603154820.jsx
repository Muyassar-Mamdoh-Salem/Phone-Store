import React from 'react'

const ContactUs = () => {
  return (
    <div>
        <h2>Contact Us</h2>

<section>

    <div>

    </div>

    <div>
<form >
<label>Name</label>
<input type="text" />
<label>phone</label>
<input type="phone" />
<label>Email</label>
<input type="email" />
<label>Message</label>
<input type="text"  className='p-4'/>
<button className='bg-[#148833] px-4 rounded-lg text-white'>Send</button>
</form>
    </div>
</section>

    </div>
  )
}

export default ContactUs