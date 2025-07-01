import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Marvel from "../assets/slider-images/marvel.png";
import DC from "../assets/slider-images/dc.png";

function Banner() {
  return (
    <div className="w-full mt-[60px] px-2 sm:px-4 md:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} inline-block w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full bg-gray-500 opacity-100 transition-all duration-300"></span>`,
        }}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="flex justify-center items-center w-full h-auto">
            <img
              src={Marvel}
              alt="Marvel"
              className="w-full max-h-[400px] object-contain sm:rounded-lg cursor-pointer"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center w-full h-auto">
            <img
              src={DC}
              alt="DC"
              className="w-full max-h-[400px] object-contain sm:rounded-lg cursor-pointer"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Tailwind override for active bullet */}
      <style>{`
        .swiper-pagination-bullet-active {
          background-color: white !important;
        }
        @media (max-width: 768px) {
          .swiper-pagination {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Banner;
