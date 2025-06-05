import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Marvel from "../assets/slider-images/marvel.png";
import DC from "../assets/slider-images/dc.png";
import "../css/slider.css"; // Custom styles for white dots

function Banner() {
  return (
    <div style={{marginTop:"60px"}} className="flex justify-center items-center w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ width: "100%", height: "100%" }}
      >
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <img className="cursor-pointer" src={Marvel} alt="Marvel" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center">
            <img className="cursor-pointer" src={DC} alt="DC" />
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
}

export default Banner;
