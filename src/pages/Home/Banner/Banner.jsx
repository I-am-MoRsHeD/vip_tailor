import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";
// import './styles.css';

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <div id="banner" className="flex gap-5 md:mt-[63px] mt-[48px] lg:h-[90vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="">
            <img src="https://i.ibb.co/2SGp8L2/Image-1.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img src="https://i.ibb.co/ZJCh9Gv/Image-2.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img src="https://i.ibb.co/WP4qBc6/Image-3.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
