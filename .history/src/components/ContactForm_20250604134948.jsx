// ContactForm.jsx
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

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
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <input type="text" name="user_name" placeholder="الاسم" className="border p-2 rounded" required />
      <input type="email" name="user_email" placeholder="البريد الإلكتروني" className="border p-2 rounded" required />
      <textarea name="message" placeholder="اكتب رسالتك..." className="border p-2 rounded h-32" required></textarea>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">إرسال</button>
    </form>
  );
};

export default ContactForm;
