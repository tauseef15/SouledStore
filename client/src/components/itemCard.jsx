import React from "react";
import { Link } from "react-router-dom";

function ItemCard({ product }) {
  return (
    <div>
      <Link
        to={`/product/${product.id}`}
        className="flex flex-row lg:flex-row items-center m-1 rounded-md transition-transform duration-300 hover:-translate-y-1 no-underline"
      >
        {/* Vertical name (only on lg and up) */}
        <div className="shrink-0 mr-4 text-center hidden lg:block">
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textAlign: "center",
            }}
          >
            <span className="font-semibold text-[1.2rem] uppercase tracking-wide break-words">
              {product.name}
            </span>
          </div>
        </div>

        {/* Image and details */}
        <div className="flex flex-col items-start justify-center gap-1 md:gap-2 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-md shadow-md transition-transform duration-300 hover:scale-105"
          />

          {/* Product name for small/medium screens (below image) */}
          <div className="block lg:hidden px-2 w-full">
            <span className="font-bold text-[10px] sm:text-lg uppercase tracking-wide truncate block whitespace-nowrap overflow-hidden">
              {product.name}
            </span>
          </div>

          <div className="flex justify-between items-center w-full md:font-semibold font-normal px-2 text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px]">
            <span>{product.typeofproduct}</span>
            <span>₹{product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;
