import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import ItemCard from "./itemCard";
import "../css/categorized.css"; // Link to external CSS file

// Shuffle function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Categorized({ status, title }) {
  const { Products } = useContext(shopContext);
  const filteredProducts = Products?.filter(
    (product) => product.status === status
  );
  const shuffledProducts = shuffleArray(filteredProducts).slice(0, 4);

  return (
    <div className="categorized-wrapper">
      <div className="title">
        {title && (
          <div>
            <div className="flex items-center">
              {/* <hr style={{width:"20px", marginRight:"8px"}}/> */}
              <h1 className="categorized-title">{title}</h1>
            </div>
            <p className="categorized-subtitle">Explore our {title} products</p>
          </div>
        )}

        <div
          className={`product-grid ${
            shuffledProducts.length < 4 ? "center-grid" : ""
          }`}
        >
          {shuffledProducts.length > 0 ? (
            shuffledProducts.map((product) => (
              <ItemCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products-text">
              No {status.toLowerCase()} products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categorized;
