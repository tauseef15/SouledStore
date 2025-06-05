import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import "../css/cart.css";
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
    return <div className="no-product text-center">YOUR CART IS EMPTY!!!</div>;
  }

  return (
    <div className="cart ">
      <div className="cart-left">
        <span style={{ padding: "20px" }} className="text-2xl font-bold">
          MY CART
        </span>

        <div>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-link">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </Link>

                <div className="cart-item-details">
                  <div className="cart-top">
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-item-name font-bold"
                    >
                      {item.name}
                    </Link>
                    <div className="cart-item-type text-sm text-gray-600">
                      Type: {item.typeofproduct || "N/A"}
                    </div>
                  </div>

                  <div className="cart-mid">
                    <div
                      style={{ marginTop: "20px" }}
                      className="flex items-center gap-4"
                    >
                      {item.category !== "Accessories" && (
                        <div className="cart-item-size">
                          Size:
                          <select
                            value={item.size}
                            onChange={(e) =>
                              updateCartItem(index, "size", e.target.value)
                            }
                          >
                            {(item.category === "Footwear"
                              ? [
                                  "UK 6",
                                  "UK 7",
                                  "UK 8",
                                  "UK 9",
                                  "UK 10",
                                  "UK 11",
                                ]
                              : ["XS", "S", "M", "L", "XL"]
                            ).map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="cart-item-quantity mt-2">
                        Quantity:
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
                          className="quantity-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cart-bottom">
                    <div className="flex justify-between items-center mt-2">
                      <div className="cart-item-price">
                        Price: ₹{item.price}
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(index)}
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
      </div>

      <BillingSummary
        button="PROCEED"
        total={calculateTotal()}
        discount={calculateDiscount()}
        finalAmount={finalAmount()}
      />
    </div>
  );
}

export default Cart;
