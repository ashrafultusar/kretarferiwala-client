"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface ISliderImage {
  _id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const Slider: React.FC = () => {
  const [sliderImages, setSliderImages] = useState<ISliderImage[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/sliders");
        const data = await res.json();
        setSliderImages(data);
      } catch (error) {
        console.error("Failed to fetch slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Scroll Down Button */}
      {showScrollButton && (
        <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleScrollDown}
            className="bg-white text-black rounded-full p-4 shadow-lg hover:bg-gray-200 transition animate-bounce cursor-pointer"
          >
            ↓
          </button>
        </div>
      )}

      <Swiper
        spaceBetween={0}
        effect="fade"
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="w-full aspect-[16/9] md:aspect-[21/9]"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image._id || index}>
            <div className="relative w-full h-full">
              <Image
                src={image.imageUrl}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
