import React from "react";
import "../css/Offers.css";

function Offers() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        <span className="marquee-text">
          BUY ANY 2 SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022; BUY ANY 2
          SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022; BUY ANY 2 SNEAKERS AND
          GET 50% ON ANY SNEAKER &#x2022; BUY ANY 2 SNEAKERS AND GET 50% ON ANY
          SNEAKER &#x2022;
        </span>
      </div>
      <div className="marquee-track">
        <span style={{marginLeft:"5px"}} className="marquee-text">
           BUY ANY 2 SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022; BUY
          ANY 2 SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022; BUY ANY 2
          SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022; BUY ANY 2
          SNEAKERS AND GET 50% ON ANY SNEAKER &#x2022;
        </span>
      </div>
    </div>
  );
}

export default Offers;
