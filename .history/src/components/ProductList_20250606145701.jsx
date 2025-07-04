import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../assets/context/AuthContext";
import { Link } from "react-router-dom";
import productsData from "../assets/Products.json";
import gsap from "gsap";

const ProductList = () => {
  const { products, addToCart } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState("All");

  // ref لتخزين عناصر المنتجات في DOM
  const productsRef = useRef([]);

  // تنظيف المصفوفة قبل كل تحديث
  productsRef.current = [];

  // دالة لإضافة العناصر إلى المرجع
  const addToRefs = (el) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current.push(el);
    }
  };

  // استخراج الماركات من ملف JSON بدون تكرار
  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  // فلترة المنتجات حسب الماركة المختارة
  const filteredProducts =
    selectedBrand === "All"
      ? productsData
      : productsData.filter((product) => product.brand === selectedBrand);

  // أنيميشن GSAP عند تغيير الفلتر أو المنتجات
  useEffect(() => {import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../assets/context/AuthContext";
import { Link } from "react-router-dom";
import productsData from "../assets/Products.json";
import gsap from "gsap";

const ProductList = () => {
  const { products, addToCart } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState("All");

  const containerRef = useRef(null);

  // استخراج الماركات بدون تكرار
  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  // فلترة المنتجات حسب الماركة
  const filteredProducts =
    selectedBrand === "All"
      ? productsData
      : productsData.filter((product) => product.brand === selectedBrand);

  useEffect(() => {
    // عندما تتغير المنتجات، نعمل أنيميشن لجميع أولاد الحاوية containerRef
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [filteredProducts]);

  return (
    <div className="p-6">
      {/* فلترة حسب الماركة */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center items-center my-3">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
              selectedBrand === brand
                ? "bg-[#FFB433] text-white"
                : "bg-gray-200 hover:bg-[#FFB433]"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* عرض المنتجات */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-2xl hover:scale-[1.02] transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.brand}</p>
            </div>
            <p className="text-[#ffb433] p-3 rounded-[20px] w-fit text-right bg-gray-500 font-bold text-xl my-4">
              <span className="text-white">Price:</span> ${product.price}
            </p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#ffb433] text-white py-2 rounded-xl active:bg-[#663f05] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product.id}`}
                className="w-full bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 text-center"
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

    // أنيميشن دخول المنتجات: انزلاق من الأسفل مع زيادة الشفافية
    gsap.fromTo(
      productsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [filteredProducts]);

  return (
    <div className="p-6">
      {/* فلترة حسب الماركة */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center items-center my-3">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
              selectedBrand === brand
                ? "bg-[#FFB433] text-white"
                : "bg-gray-200 hover:bg-[#FFB433]"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            ref={addToRefs} // ربط العنصر مع المرجع
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-2xl hover:scale-[1.02] transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.brand}</p>
            </div>
            <p className="text-[#ffb433] p-3 rounded-[20px] w-fit text-right bg-gray-500 font-bold text-xl my-4">
              <span className="text-white">Price:</span> ${product.price}
            </p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#ffb433] text-white py-2 rounded-xl active:bg-[#663f05] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product.id}`}
                className="w-full bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 text-center"
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
