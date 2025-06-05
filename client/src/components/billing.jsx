import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

function BillingSummary({ total, discount, finalAmount, button }) {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/placeorder");
  };

  return (
    <div className="cart-right">
      <div className="price-summary-box">
        <p className="price-summary-title">Billing Details</p>

        <div className="price-summary-row">
          <span>Sub Total:</span> 
          <span>₹{total}</span>
        </div>

        <div className="price-summary-row discount">
          <span>Bag Discount:</span>
          <span>-₹{discount}</span>
        </div>

        <div className="price-summary-row delivery">
          <span>Delivery Fee:</span>
          <span>Free</span>
        </div>

        <hr style={{ margin: "16px 0" }} />

        <div className="final-amount">
          <span>Final Amount:</span>
          <span>₹{finalAmount}</span>
        </div>

        <div className="free-delivery-msg">
          Yay! You get <strong>FREE delivery</strong> on this order
        </div>

        {button && (
          <button className="proceed-button" onClick={handleProceed}>
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

export default BillingSummary;
