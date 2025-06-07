import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useAuth(); // دالة إضافة للـ cart من الكونتكست

  // البحث عن المنتج باستخدام المعرف
  const product = products.find((p) => p.id === parseInt(id));

  // إذا لم يتم العثور على المنتج
  if (!product) {
    return <div className="text-center text-2xl mt-10">المنتج غير موجود</div>;
  }

  // التعامل مع إضافة المنتج إلى السلة
  const handleAddToCart = () => {
    addToCart(product); // إضافة المنتج إلى السلة
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-3xl font-bold mb-6">{product.name}</div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* الصورة */}
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-64 object-cover mb-6 sm:mb-0 sm:w-80 sm:h-80 justify-self-center"
        />

        {/* تفاصيل المنتج */}
        <div className="flex flex-col gap-2 sm:ml-6 justify-self-start">
          <div className="text-xl font-semibold">Price: ${product.price}</div>
          <div className="text-gray-900">Color: {product.color}</div>
          <div className="text-gray-900">Camera: {product.camera}</div>
          <div className="text-gray-900">RAM: {product.ram}</div>
          <div className="text-gray-900">Storage: {product.storage}</div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className="border rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <Link to="/CheckOut">
              <button className="border rounded-lg px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition duration-300 w-full sm:w-auto">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
