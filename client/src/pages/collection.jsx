// Collection.js
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/collection.css";
import { shopContext } from "../context/shopContext";
import ItemCard from "../components/itemCard";
import { FaLongArrowAltRight } from "react-icons/fa";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Collection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { Products } = useContext(shopContext);

  const categories = ["Topwear", "Bottomwear", "Footwear", "Accessories"];

  // Capitalize the first letter in case user enters lowercase
const selectedCategory = category
  ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
  : "Topwear"; // default fallback


  const filteredProducts = shuffleArray(
    Products.filter((product) => product.category === selectedCategory)
  );

  return (
    <div className="collection-page">
      <div className="search-bar">
        
      </div>
      <div className="collection">
        {/* Left Sidebar */}
        <div className="collection-left">
          <span style={{ padding: "10px" }} className='font-bold flex items-center gap-2'>
            CATEGORIES <FaLongArrowAltRight />
          </span>
          <ul style={{ marginTop: "20px" }} className="category-list">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => navigate(`/collection/${cat.toLowerCase()}`)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Grid */}
        <div className="collection-right">
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
