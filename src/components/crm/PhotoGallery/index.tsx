"use client";

import apiClient from "@/src/utils/api";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

import { Swiper as SwiperType } from "swiper/types";
import { ICONS } from "@/src/constants/icons/icons";
import { uploadAnimalPhoto } from "@/src/utils/uploadAnimalPhoto";

interface PhotoGalleryProps {
  animalId: string;
  images: string[];
}

interface GalleryItem {
  id: string;
  url: string;
}
const PhotoGallery = ({ animalId,images }: PhotoGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const fallbackImage = "/assets/imagescrm/сat.png";
  const [gallery, setGallery] = useState<GalleryItem[]>(
    images.map((url, idx) => ({ id: `init-${idx}`, url }))
  );
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    try {
      // Временный объект для мгновенного отображения
      const tempId = `temp-${Date.now()}`;
      const tempUrl = URL.createObjectURL(file);
      setGallery(prev => [...prev, { id: tempId, url: tempUrl }]);

      // Загрузка на сервер
      const { id, url } = await uploadAnimalPhoto(animalId, "media", file);

      // Заменяем временный объект на серверный
      setGallery(prev =>
        prev.map(g => (g.id === tempId ? { id, url } : g))
      );
    } catch (err) {
      console.error(err);
      alert("Не удалось загрузить фото");
    }
  };
const displayImages: GalleryItem[] =
    gallery.length === 0
      ? [
          { id: "fallback1", url: fallbackImage },
          { id: "fallback2", url: fallbackImage },
        ]
      : gallery.length === 1
      ? [gallery[0], { id: "fallback2", url: fallbackImage }]
        : gallery;
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="mb-4"
      >
        {displayImages.map(img => (
          <SwiperSlide key={img.id} className="!w-[240px] !h-[240px]">
            <img
              src={img.url}
            alt={`Photo ${img.id}`}
              onError={handleImgError}
              className="w-[240px] h-[240px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={Math.min(displayImages.length + 1, 5)} 
        modules={[Thumbs]}
        className="h-[40px]"
      >
         {displayImages.map(img => (
          <SwiperSlide key={`thumb-${img.id}`} className="!h-[40px] !w-[40px]">
            <img
              src={img.url}
              onError={handleImgError}
              alt={`Thumbnail ${img.id}`}
              className="h-[40px] w-[40px] object-cover rounded-md cursor-pointer"
            />
          </SwiperSlide>
        ))}
        
           <SwiperSlide key="add-button" className="!h-[40px] !w-[40px]">
          <label className="h-[40px] w-[40px] flex items-center justify-center border-2 border-solid border-crm-light-blue rounded-[4px] cursor-pointer">
            <ICONS.PLUS_BTN />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </SwiperSlide>  
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
