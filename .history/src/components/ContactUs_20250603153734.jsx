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
<input type="number" />
<label>Email</label>
<input type="email" />
<label>Message</label>
<input type="text"  className='p-4'/>
<button className='bg-[#FFB433] p-4 rounded-lg'>Send</button>
</form>
    </div>
</section>

    </div>
  )
}

export default ContactUs