import React, { useState } from "react";
import { useAuth } from "../assets/context/AuthContext";
import { Link } from "react-router-dom";
import productsData from"../assets";

const ProductList = () => {
  const { products, addToCart } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState("All");

  // استخراج الماركات من ملف JSON بدون تكرار
  const brands = ["All", ...new Set(productsData.map((p) => p.brand))];

  // فلترة المنتجات حسب الماركة المختارة
  const filteredProducts =
    selectedBrand === "All"
      ? productsData
      : productsData.filter((product) => product.brand === selectedBrand);

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
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-2xl hover:scale-[1.02] transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
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
