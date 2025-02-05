"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const slides = [
  {
    text: "Кузя",
    texId: "ID414141",
    texCity: "Вовчанск",
    dateText: "13.06",
    img: "/assets/imagescrm/сat.png",
  },
  {
    text: "Кузя",
    texId: "ID414141",
    texCity: "Вовчанск",
    dateText: "13.06",
    img: "/assets/imagescrm/сat.png",
  },
  {
    text: "Кузя",
    texId: "ID414141",
    texCity: "Вовчанск",
    dateText: "13.06",
    img: "/assets/imagescrm/сat.png",
  },
];

export default () => {
  return (
    <div className="max-w-[342px] overflow-hidden mx-6 shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)] border-[1px] border-solid border-mainBlue rounded-[10px] px-[10px]  relative">
      <span className="absolute before:content-[''] before:mr-2 bg-crm-backgraund w-full z-10 h-2 right-0 bottom-0"></span>
      
      <h3 className="font-semibold text-2xl mb-3 px-3 pt-2">
        Останні поповнення:
      </h3>
      <Swiper
        className="w-[310px] m-auto"
        spaceBetween={16}
        slidesPerView={1.2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!w-[163px] shadow-[3px_4px_10px_rgba(182,187,235,0.3),-0px_-4px_10px_rgba(182,187,235,0.3)] mb-2 relative">
            <div className="p-[4px]">
              <img src={slide.img} alt={slide.text} className="w-[155px]" />
              <div className="">
                <p className="mt-2 text-xl font-normal --font-inter">
                  {slide.text}
                </p>
                <p className="text-color-Id text-sm">{slide.texId}</p>
                <p className="text-xl">{slide.texCity}</p>
                <p className="text-xl">{slide.dateText}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
