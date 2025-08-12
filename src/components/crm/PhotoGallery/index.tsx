
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

import { Swiper as SwiperType } from "swiper/types";

interface PhotoGalleryProps {
  images: string[]; 
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const fallbackImage = "/assets/imagescrm/сat.png";

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };

  const paddedImages = [...images];

  // Добавляем fallback'и до 4 штук
  while (paddedImages.length < 4) {
    paddedImages.push(fallbackImage);
  }
  return (
    <div className="w-full max-w-4xl mx-auto">
      
      <Swiper
        spaceBetween={10}
        
        className="mb-4"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Photo ${idx + 1}`}
              onError={handleImgError}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={5}
        
        watchSlidesProgress
        modules={[Thumbs]}
        className="h-[40px] "
      >
       {paddedImages.slice(0, 4).map((src, idx) => (
         <SwiperSlide key={idx}
         className="!h-[40px] !w-[40px]">
            <img
              src={src}
              onError={handleImgError}
              alt={`Thumbnail ${idx + 1}`}
              className="h-[40px] w-[40px] object-cover rounded-md cursor-pointer"
            />
          </SwiperSlide>
       ))}
        <SwiperSlide key="add-button">
          <button
            onClick={() => alert("Открыть загрузку фото")}
            className="h-[40px] w-[40px] flex items-center justify-center border border-dashed border-gray-400 rounded-md text-gray-500 text-xl hover:bg-gray-100 transition"
          >
            +
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
