import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../css/itemCard.css"; // Import the CSS file

function ItemCard({ product }) {
  return (
    <div>
      <Link className="card-wrapper"  to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="name-wrapper">
          <span className="product-name">{product.name}</span>
        </div>
        <div className="flex-row">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>
          <div
            style={{ paddingTop: "10px", margin: "5px" }}
            className="flex justify-between items-center font-bold"
          >
            <span>{product.typeofproduct}</span>
            <span>₹{product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;
