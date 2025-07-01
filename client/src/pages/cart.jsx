import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import BillingSummary from "../components/billing";

function Cart() {
  const { cart, updateCartItem, removeFromCart } = useContext(shopContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return cart.reduce((discount, item) => discount + 100 * item.quantity, 0);
  };

  const finalAmount = () => {
    return calculateTotal() - calculateDiscount();
  };

  if (cart.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-4xl md:text-6xl font-bold text-center">
        YOUR CART IS EMPTY!!!
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-[100%] md:w-[90%] mx-auto mt-10 gap-6">
      {/* Cart Left Section */}
      <div className="w-full lg:w-[70%] flex flex-col">
        <span className="text-2xl font-bold p-4">MY CART</span>

        <div className="mt-4 bg-gray-100 dark:bg-black/20 p-4 rounded-lg">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center mb-4 p-3 sm:p-4 bg-black/10 border border-gray-300 rounded-lg gap-2 sm:gap-4"
            >
              <div className="flex flex-row sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
                {/* Image */}
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 sm:w-28 rounded-md object-contain"
                  />
                </Link>

                {/* Text & Controls */}
                <div className="flex flex-col justify-between flex-1 w-full">
                  <div>
                    <Link
                      to={`/product/${item.id}`}
                      className="text-[14px] sm:text-lg font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[10px] sm:text-sm text-gray-400">
                      {item.typeofproduct || "N/A"}
                    </p>
                  </div>

                  {/* Size and Qty */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-sm">
                    {/* Size */}
                    {item.category !== "Accessories" && (
                      <div className="flex items-center">
                        Size:
                        <select
                          value={item.size}
                          onChange={(e) =>
                            updateCartItem(index, "size", e.target.value)
                          }
                          className="ml-1 px-1 py-0.5 sm:px-2 sm:py-1 rounded bg-transparent border border-white text-white text-xs sm:text-sm w-[50px] sm:w-[70px]"
                        >
                          {(item.category === "Footwear"
                            ? ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"]
                            : ["XS", "S", "M", "L", "XL"]
                          ).map((size) => (
                            <option
                              key={size}
                              value={size}
                              className="bg-black text-white"
                            >
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="ml-1 px-0 py-0 sm:px-2 sm:py-1 w-[35px] sm:w-[60px] rounded bg-transparent border border-white text-white text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm flex flex-col font-semibold">
                      ₹{item.price}{" "}
                      <span className="text-[6px] sm:text-xs text-gray-500">
                        MRP incl. of all taxes
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-xs sm:text-sm px-3 py-1 rounded bg-white hover:bg-gray-300 text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Section */}
      <div className="w-full lg:w-[30%] mt-6 lg:mt-[100px]">
        <BillingSummary
          button="PROCEED"
          total={calculateTotal()}
          discount={calculateDiscount()}
          finalAmount={finalAmount()}
        />
      </div>
    </div>
  );
}

export default Cart;
