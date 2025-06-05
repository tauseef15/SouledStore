import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sliderImages from "../assets/assets";
import "../css/slider.css"; // Custom styles for white dots

function Slider() {
  return (
    <div  className="flex justify-center items-center w-full">
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
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div  className="flex justify-center items-center">
              <img  className="cursor-pointer " src={image} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
