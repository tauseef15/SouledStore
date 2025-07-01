import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const selectedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "Topwear";

  const filteredProducts = shuffleArray(
    Products.filter((product) => product.category === selectedCategory)
  );

  return (
    <div className="min-h-screen w-full px-2 md:px-6 mt-2 md:mt-5 lg:mt-10">
      <div className="flex flex-col gap-6 pt-10">
        {/* Top Category Bar (Responsive) */}
        <div className="flex flex-col md:flex-row gap-2 overflow-x-auto md:overflow-visible px-2 md:px-0 py-2 shadow rounded-md">
          <span className="font-bold flex items-center gap-2 text-sm   md:text-xl shrink-0">
            CATEGORIES <FaLongArrowAltRight />
          </span>
          <ul className="flex flex-row md:flex-row gap-2 w-full">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`p-2 shrink-0 rounded-md cursor-pointer text-[10px] md:text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "hover:bg-gray-900"
                }`}
                onClick={() => navigate(`/collection/${cat.toLowerCase()}`)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
