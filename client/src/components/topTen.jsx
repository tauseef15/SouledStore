import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { shopContext } from "../context/shopContext";
import ItemCard from "./itemCard";
import "../css/categorized.css";

// Shuffle function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TopTen({ title }) {
  const { Products } = useContext(shopContext);

  // Filter and shuffle
  const topTenProducts = shuffleArray(
    Products?.filter((product) => product.status === "Top10") || []
  );

  return (
    <div className="TopTen-wrapper">
      <div  className="title flex-row items-center">
        <h1 className="categorized-title ">{title}</h1>
      <p className="categorized-subtitle">Explore our {title} products</p>
      </div>

      {topTenProducts.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          draggable={true}
          scrollbar={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {topTenProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ItemCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-products-text">No Top 10 products available.</p>
      )}
    </div>
  );
}

export default TopTen;
