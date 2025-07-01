import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";
import ItemCard from "./itemCard";

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
    <div className="px-1 sm:px-4 pt-4">
      <div className="mt-[50px]">
        {title && (
          <div>
            <div className="flex items-center">
              <h1 className="text-[1.3rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.25rem] font-bold uppercase mb-[0.1rem] sm:mb-[0.2rem] lg:mb-[0.5rem]">
                {title}
              </h1>
            </div>
            <p className="text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[1rem] text-gray-500 mb-[1.5rem]">
              Explore our {title} products
            </p>
          </div>
        )}

        <div
          className={`grid ${
            shuffledProducts.length < 4
              ? "justify-center"
              : ""
          } gap-[0.5rem] sm:gap-[1rem] md:gap-[0.5rem] lg:gap-[1.5rem] 
          grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-4 
          ${shuffledProducts.length < 4 ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : ""}`}
        >
          {shuffledProducts.length > 0 ? (
            shuffledProducts.map((product) => (
              <ItemCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-4">
              No {status.toLowerCase()} products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categorized;
