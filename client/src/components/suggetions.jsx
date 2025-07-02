import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import ItemCard from "./itemCard";

// Shuffle function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Suggestions({ title, status, category, excludeId }) {
  const { Products } = useContext(shopContext);

  let filteredProducts = Products;

  if (status) {
    filteredProducts = filteredProducts.filter((product) => product.status === status);
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }

  if (excludeId) {
    filteredProducts = filteredProducts.filter((product) => product.id !== excludeId);
  }

  const shuffledProducts = shuffleArray(filteredProducts).slice(0, 8);

  return (
    <div className="w-full px-4 py-10 sm:px-6 md:px-10 lg:px-20">
      {title && (
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        </div>
      )}

      {shuffledProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {shuffledProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ItemCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-4">No suggestions found.</p>
      )}
    </div>
  );
}

export default Suggestions;
