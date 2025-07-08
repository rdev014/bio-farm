'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { useState } from 'react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

interface ProductCarouselProps {
    images: string[];
    name: string;
    className?: string;
}

export default function ProductImageCarousel({
    images,
    name,
    className = ""
}: ProductCarouselProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    return (
        <div className={`product-carousel ${className}`}>
            {/* Main Image Swiper */}
            <Swiper
                spaceBetween={10}
                navigation={images.length > 1}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Pagination, Navigation, Thumbs, Zoom]}
                className="main-swiper mb-4"
                zoom={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                breakpoints={{
                    640: {
                        zoom: { maxRatio: 2 },
                    },
                    768: {
                        zoom: { maxRatio: 3 },
                    },
                }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="swiper-zoom-container">
                            <Image
                                src={img || "/placeholder.jpg"}
                                alt={`${name} - Image ${index + 1}`}
                                width={600}
                                height={600}
                                className="w-fit max-h-64 sm:h-80 md:max-h-96 lg:max-h-[500px] rounded-xl border border-black/20 object-cover  shadow-sm"
                                priority={index === 0}
                                quality={90}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                            {index + 1} / {images.length}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={8}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="thumb-swiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 6,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 14,
                        },
                    }}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="cursor-pointer">
                            <div
                                className={`relative overflow-hidden rounded-md transition-all duration-200 ${index === activeIndex
                                        ? 'ring-2 ring-green-500 ring-offset-2'
                                        : 'hover:ring-2 hover:ring-gray-300'
                                    }`}
                            >
                                <Image
                                    src={img || "/placeholder.jpg"}
                                    alt={`${name} thumbnail ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="w-full h-16 sm:h-20 object-cover"
                                    quality={60}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
        .product-carousel .swiper-button-next,
        .product-carousel .swiper-button-prev {
          color: #3b82f6;
          background: rgba(255, 255, 255, 0.9);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        
        .product-carousel .swiper-button-next:hover,
        .product-carousel .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }
        
        .product-carousel .swiper-button-next::after,
        .product-carousel .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .product-carousel .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          transition: all 0.3s ease;
        }
        
        .product-carousel .swiper-pagination-bullet-active {
          background: #3b82f6;
          transform: scale(1.2);
        }
        
        .product-carousel .thumb-swiper .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        
        .product-carousel .thumb-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        
        .product-carousel .main-swiper {
          border-radius: 12px;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .product-carousel .swiper-button-next,
          .product-carousel .swiper-button-prev {
            width: 35px;
            height: 35px;
          }
          
          .product-carousel .swiper-button-next::after,
          .product-carousel .swiper-button-prev::after {
            font-size: 14px;
          }
        }
        
        /* Zoom cursor */
        .product-carousel .swiper-zoom-container {
          cursor: zoom-in;
        }
        
        .product-carousel .swiper-zoom-container.swiper-zoom-container-zoomed {
          cursor: zoom-out;
        }
      `}</style>
        </div>
    );
}