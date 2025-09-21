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
            <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">No images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`product-carousel w-full max-w-none ${className}`}>
            {/* Main Image Swiper */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4 group">
                <Swiper
                    spaceBetween={0}
                    navigation={images.length > 1}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[Pagination, Navigation, Thumbs, Zoom]}
                    className="main-swiper aspect-square"
                    zoom={{
                        maxRatio: 3,
                        minRatio: 1,
                        toggle: true,
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    loop={images.length > 1}
                    grabCursor={true}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="relative flex items-center justify-center">
                            <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                                <Image
                                    src={img || "/placeholder.jpg"}
                                    alt={`${name} - Image ${index + 1}`}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-cover"
                                    priority={index === 0}
                                    quality={90}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm z-10">
                                {index + 1} / {images.length}
                            </div>

                            {/* Zoom Hint */}
                            <div className="absolute bottom-4 left-4 bg-white/90 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                Click to zoom
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Pagination for mobile */}
                <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden"></div>
            </div>

            {/* Thumbnail Swiper */}
            {images.length > 1 && (
                <div className="px-1">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={8}
                        slidesPerView={3}
                        watchSlidesProgress={true}
                        modules={[Thumbs]}
                        className="thumb-swiper"
                        centerInsufficientSlides={true}
                        breakpoints={{
                            480: {
                                slidesPerView: 4,
                                spaceBetween: 8,
                            },
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
                            1280: {
                                slidesPerView: 8,
                                spaceBetween: 16,
                            },
                        }}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index} className="cursor-pointer">
                                <div
                                    className={`relative overflow-hidden rounded-xl transition-all duration-200 border-2 ${
                                        index === activeIndex
                                            ? 'border-blue-500 ring-2 ring-blue-200 ring-offset-2'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <Image
                                        src={img || "/placeholder.jpg"}
                                        alt={`${name} thumbnail ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full aspect-square object-cover"
                                        quality={60}
                                    />
                                    {/* Active indicator */}
                                    {index === activeIndex && (
                                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx global>{`
                .product-carousel .swiper-button-next,
                .product-carousel .swiper-button-prev {
                    color: #1f2937;
                    background: rgba(255, 255, 255, 0.95);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: scale(0.8);
                }
                
                .product-carousel .group:hover .swiper-button-next,
                .product-carousel .group:hover .swiper-button-prev {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .product-carousel .swiper-button-next:hover,
                .product-carousel .swiper-button-prev:hover {
                    background: rgba(255, 255, 255, 1);
                    transform: scale(1.05);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }
                
                .product-carousel .swiper-button-next::after,
                .product-carousel .swiper-button-prev::after {
                    font-size: 18px;
                    font-weight: 600;
                }
                
                .product-carousel .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.6);
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                
                .product-carousel .swiper-pagination-bullet-active {
                    background: #3b82f6;
                    transform: scale(1.3);
                    border-color: #3b82f6;
                }
                
                .product-carousel .thumb-swiper .swiper-slide {
                    opacity: 0.7;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .product-carousel .thumb-swiper .swiper-slide-thumb-active {
                    opacity: 1;
                }
                
                .product-carousel .main-swiper {
                    border-radius: 16px;
                    overflow: hidden;
                }
                
                /* Mobile optimizations */
                @media (max-width: 768px) {
                    .product-carousel .swiper-button-next,
                    .product-carousel .swiper-button-prev {
                        width: 40px;
                        height: 40px;
                        opacity: 1;
                        transform: scale(1);
                    }
                    
                    .product-carousel .swiper-button-next::after,
                    .product-carousel .swiper-button-prev::after {
                        font-size: 16px;
                    }
                }
                
                /* Zoom cursor effects */
                .product-carousel .swiper-zoom-container {
                    cursor: zoom-in;
                    transition: transform 0.3s ease;
                }
                
                .product-carousel .swiper-zoom-container.swiper-zoom-container-zoomed {
                    cursor: zoom-out;
                }
                
                /* Smooth loading animation */
                .product-carousel img {
                    transition: opacity 0.3s ease;
                }
                
                /* Hide scrollbar for thumbnail swiper */
                .product-carousel .thumb-swiper {
                    padding-bottom: 4px;
                }
                
                /* Better focus states for accessibility */
                .product-carousel .swiper-button-next:focus,
                .product-carousel .swiper-button-prev:focus {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }
                
                .product-carousel .thumb-swiper .swiper-slide:focus-within {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                    border-radius: 12px;
                }
            `}</style>
        </div>
    );
}