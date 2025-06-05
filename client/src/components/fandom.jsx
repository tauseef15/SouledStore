import React, { useContext } from "react";
import "../css/fandom.css";
import ItemCard from "./itemCard";
import { shopContext } from "../context/shopContext";
import Banner from "./banner"; // Import the Banner component
import MarvelLogo from "../assets/marvelLogo.png"; // Import the Marvel logo
import DCLogo from "../assets/dcLogo.png"; // Import the DC logo
// Shuffle utility
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Fandom() {
  const { Products } = useContext(shopContext);

  // Filter and shuffle for Marvel
  const marvelProducts = shuffleArray(
    Products?.filter((product) => product.status === "Marvel") || []
  ).slice(0, 4);

  // Filter and shuffle for DC
  const dcProducts = shuffleArray(
    Products?.filter((product) => product.status === "DC") || []
  ).slice(0, 4);

  return (
    <div>
      <div className="fandom-title">
        <span className="fandom-header uppercase">Shop by Fandom</span>
      </div>
      <div>
        <Banner />
      </div>
      <div className="logos">
        <div className="marvel"><img src={MarvelLogo} alt="" /></div>
        <div className="dc"><img src={DCLogo} alt="" /></div>
      </div>
      <div className="fandom">
        <div className="marvel">
          {marvelProducts.map((product) => (
            <div className="item" key={product.id}>
              <ItemCard product={product} />
            </div>
          ))}
        </div>
        <div className="dc">
          {dcProducts.map((product) => (
            <div className="item" key={product.id}>
              <ItemCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fandom;
