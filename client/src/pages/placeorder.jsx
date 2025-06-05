import React, { useContext, useState } from "react";
import { shopContext } from "../context/shopContext";
import "../css/placeorder.css";
import "../css/cart.css";
import BillingSummary from "../components/billing";
import { toast } from "react-toastify";

function Placeorder() {
  const { cart, clearCart } = useContext(shopContext);

  const [address, setAddress] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    pinCode: "",
    city: "",
    state: "",
    building: "",
    locality: "",
    landmark: "",
    type: "Other",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateDiscount = () =>
    cart.reduce((discount, item) => discount + 100 * item.quantity, 0);

  const finalAmount = () => calculateTotal() - calculateDiscount();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart, address, paymentMethod }),
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        console.log("✅ Order submitted:", data);
        toast.success("ORDER PLACED 🎉");
        clearCart();

        setTimeout(() => {
          window.location.href = "/orders";
        }, 1500);
      } else {
        throw new Error("Invalid JSON response from server");
      }
    } catch (err) {
      console.error("❌ Order submission failed:", err.message);
      toast.error("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return <div className="no-product text-center">YOUR CART IS EMPTY!!!</div>;
  }

  return (
    <div className="placeorder">
      <form className="order-left" onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl">DELIVERY ADDRESS</h2>

        <div className="form-group">
          <label>First Name *</label>
          <input
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            name="email"
            value={address.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            name="mobile"
            value={address.mobile}
            onChange={handleChange}
            required
            placeholder="+91"
          />
        </div>

        <div className="form-group">
          <label>Flat No. / Building *</label>
          <input
            name="building"
            value={address.building}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area / Locality *</label>
          <input
            name="locality"
            value={address.locality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>PIN Code *</label>
          <input
            name="pinCode"
            value={address.pinCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State *</label>
            <input
              name="state"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Landmark</label>
          <input
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="font-bold">Payment Method *</label>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="GPay"
                checked={paymentMethod === "GPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Google Pay (GPay)
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Razorpay
            </label>
          </div>
        </div>

        <button type="submit" className="save-address-btn">
          PLACE ORDER
        </button>
      </form>

      <BillingSummary
        total={calculateTotal()}
        discount={calculateDiscount()}
        finalAmount={finalAmount()}
      />
    </div>
  );
}

export default Placeorder;
