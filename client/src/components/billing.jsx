import React from "react";
import { useNavigate } from "react-router-dom";

function BillingSummary({ total, discount, finalAmount, button }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/placeorder");
  };

  return (
    <div className="w-[90%] sm:w-full mx-auto bg-gray-100/20 rounded-2xl mt-10 p-6  shadow-md">
      <div className="mx-auto">
        <p className="text-lg font-semibold mb-6">Billing Details</p>

        <div className="flex justify-between text-sm mb-2">
          <span>Sub Total:</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between text-sm mb-2 text-green-600">
          <span>Bag Discount:</span>
          <span>-₹{discount}</span>
        </div>

        <div className="flex justify-between text-sm mb-4 text-green-600">
          <span>Delivery Fee:</span>
          <span>Free</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-base font-semibold mb-3">
          <span>Final Amount:</span>
          <span>₹{finalAmount}</span>
        </div>

        <div className="bg-green-100 text-green-700 text-sm font-medium py-2 px-3 text-center rounded-md mb-4">
          Yay! You get <strong>FREE delivery</strong> on this order
        </div>

        {button && (
          <button
            onClick={handleProceed}
            className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-gray-100 transition"
          >
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

export default BillingSummary;
