import React from 'react';
import { useAuth } from '../assets/context/AuthContext';

const Cart = () => {
  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useAuth();

  return (
    <div className="py-6 px-4 lg:px-[50px]">
      {cart.length === 0 ? (
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold mb-6 mt-20">🛒 Shopping Cart</h1>
          <p className="text-gray-500">Your cart is currently empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow text-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="text-sm text-gray-400">{item.brand}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Clear Cart */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="text-xl bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
            >
              Delete All Products
            </button>
            <button className=''>go to checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
