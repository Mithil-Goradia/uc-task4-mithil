import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Get cart data from localStorage and set it in state
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Remove the product from cart
    let updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total products and total price
  const totalProducts = cart.length;
  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-3xl p-4 text-[#f5deb3]">Cart</p>
      <div className="flex flex-col gap-3 p-4 mt-10 text-black rounded-xl bg-[#f5deb3] w-[90%] max-w-[400px] md:max-w-[350px] rounded-tr-none relative">
        {cart.length > 0 ? (
          <>
            {/* Products List */}
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:justify-between gap-3"
                >
                  {/* Product Details */}
                  <div className="flex flex-col sm:w-2/3">
                    <p className="font-bold text-sm sm:text-base">{product.title}</p>
                    <p className="text-sm">Price: ${product.price}</p>
                    <p className="text-sm">Quantity: {product.quantity}</p>
                  </div>
                  {/* Price/Quantity */}
                  <div className="bg-gray-200 px-3 py-2 rounded-md text-sm sm:text-base">
                    Total: ${product.price * product.quantity}
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="text-red-500 text-xs sm:text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-6 text-center border-t-2 border-black pt-4">
              <p className="font-semibold text-sm sm:text-base">
                Total Products: {totalProducts}
              </p>
              <p className="font-semibold text-sm sm:text-base">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-center">Loading cart details...</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
