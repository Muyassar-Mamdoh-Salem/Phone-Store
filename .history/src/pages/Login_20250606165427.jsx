import React, { useState } from "react";
import { useAuth } from "../assets/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  // حالة البريد الإلكتروني وكلمة المرور والخطأ وحالة التحميل
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // لتخزين أي خطأ أثناء عملية تسجيل الدخول
  const [loading, setLoading] = useState(false); // لحالة التحميل أثناء محاولة تسجيل الدخول
  const navigate = useNavigate(); // لاستخدام التوجيه عند النجاح في الدخول
  const { login } = useAuth(); // جلب الدالة الخاصة بتسجيل الدخول من السياق

  // دالة المعالجة عند إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
    } else {
      alert("Logged in successfully ✅");
      navigate("/");
    }

    setLoading(false);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBF8EF]">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl text-[#80CBC4] font-semibold text-center mb-8">Login</h1>

        {/* عرض رسالة الخطأ إذا كانت موجودة */}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* حقل البريد الإلكتروني */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium text-left">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // تحديث البريد الإلكتروني عند الكتابة
              placeholder="example@email.com"
              className="w-full p-4 mt-2 border bg-[#FBF8EF] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg text-left"
              required
            />
          </div>

          {/* حقل كلمة المرور */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium text-left">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // تحديث كلمة المرور عند الكتابة
              placeholder="Enter your password"
              className="w-full bg-[#FBF8EF] p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg text-left"
              required
            />
          </div>

          {/* رابط استرجاع كلمة المرور */}
          <div className="text-right mb-6">
            <a href="#" className="text-blue-500 hover:underline text-sm">Forgot Password?</a>
          </div>

          {/* زر إرسال النموذج */}
          <button
            type="submit"
            disabled={loading} // تعطيل الزر أثناء التحميل
            className="w-full px-6 py-3 bg-[#80CBC4] text-white rounded-md hover:bg-[#68aca5] duration-300 focus:outline-none text-lg"
          >
            {loading ? "Logging in..." : "Login"} {/* تغيير النص أثناء عملية تسجيل الدخول */}
          </button>
        </form>

        {/* رابط التسجيل في حالة عدم وجود حساب */}
        <div className="text-center mt-6">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
