import React, { useState } from 'react';

const CheckOut = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // يمكنك إضافة منطق الدفع هنا (مثل الاتصال بـ API للدفع)
    alert('تم الدفع بنجاح!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8  grid-cols-1 sm-grid-cols-1 lg-grid -cols-1 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#FFB433] mb-6">إتمام الدفع</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الاسم */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 mb-2">الاسم الكامل</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* رقم البطاقة */}
          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="text-gray-700 mb-2">رقم البطاقة</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* تاريخ انتهاء البطاقة */}
          <div className="flex flex-col">
            <label htmlFor="expirationDate" className="text-gray-700 mb-2">تاريخ انتهاء البطاقة</label>
            <input
              type="month"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* CVV */}
          <div className="flex flex-col">
            <label htmlFor="cvv" className="text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* العنوان */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700 mb-2">العنوان</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg"
              rows="3"
              required
            ></textarea>
          </div>

          {/* زر الدفع */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFB433] text-white font-semibold rounded-lg hover:bg-[#E69500] transition-colors"
            >
              إتمام الدفع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
