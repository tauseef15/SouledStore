import React, { useContext, useState } from "react";
import { shopContext } from "../context/shopContext";
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
    return <div className="text-center text-xl font-semibold h-screen mt-20">YOUR CART IS EMPTY!!!</div>;
  }

  return (
    <div className="h-screen w-[90%] max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-2/3 p-2 md:p-6 rounded-md shadow-sm"
      >
        <h2 className="text-xl font-bold mb-3 sm:mb-6">DELIVERY ADDRESS</h2>

        {[
          { label: "First Name *", name: "firstName" },
          { label: "Last Name *", name: "lastName" },
          { label: "Email *", name: "email" },
          { label: "Mobile Number *", name: "mobile", placeholder: "+91" },
          { label: "Flat No. / Building *", name: "building" },
          { label: "Area / Locality *", name: "locality" },
          { label: "PIN Code *", name: "pinCode" },
          { label: "Landmark", name: "landmark" },
        ].map(({ label, name, placeholder }) => (
          <div className="mb-1 sm:mb-4 flex flex-col" key={name}>
            <label className="mb-1 font-medium text-sm">{label}</label>
            <input
              name={name}
              value={address[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required={label.includes("*")}
              className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full mb-4">
            <label className="mb-1 font-medium text-sm">City *</label>
            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label className="mb-1 font-medium text-sm">State *</label>
            <input
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <label className="font-bold text-sm">Payment Method *</label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {["COD", "GPay", "Razorpay"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-black"
                />
                {method === "COD"
                  ? "Cash on Delivery (COD)"
                  : method === "GPay"
                  ? "Google Pay (GPay)"
                  : "Razorpay"}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      </form>

      <div className="w-full lg:w-1/3">
        <BillingSummary
          total={calculateTotal()}
          discount={calculateDiscount()}
          finalAmount={finalAmount()}
        />
      </div>
    </div>
  );
}

export default Placeorder;
