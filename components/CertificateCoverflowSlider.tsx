'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Eye, ChevronLeft, ChevronRight, Award, Trophy, Calendar } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CertificateCoverflowSlider.css';

export interface HackathonItem {
  name: string;
  organizer: string;
  result: string;
  date: string;
  certificateImage: string | null;
}

interface CertificateCoverflowSliderProps {
  hackathons: HackathonItem[];
  onSelectCertificate: (cert: { title: string; image: string; issuer: string }) => void;
}

export default function CertificateCoverflowSlider({
  hackathons,
  onSelectCertificate,
}: CertificateCoverflowSliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Default fallback poster gradient backgrounds for items without specific certificate image
  const fallbackPosters = [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  ];

  return (
    <div className="certificate-coverflow-container">
      {/* Top Slider Navigation Controls Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="text-xs font-mono tracking-wider text-purple-400 uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          Interactive 3D Coverflow • Drag or Swipe
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            className="coverflow-nav-btn coverflow-prev"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={nextRef}
            className="coverflow-nav-btn coverflow-next"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper 3D Coverflow Carousel */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 220,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="certificate-coverflow-swiper"
      >
        {hackathons.map((item, index) => {
          const certImg = item.certificateImage || fallbackPosters[index % fallbackPosters.length];

          return (
            <SwiperSlide key={index}>
              <div className="certificate-coverflow-card group flex flex-col h-full">
                
                {/* Top Image Preview Banner */}
                <div
                  className="relative aspect-[16/10] w-full bg-black/80 overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (item.certificateImage) {
                      onSelectCertificate({
                        title: item.name,
                        image: item.certificateImage,
                        issuer: item.organizer,
                      });
                    }
                  }}
                >
                  <Image
                    src={certImg}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-black/20 to-transparent" />

                  {/* Badge Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-purple-300 font-medium text-[11px] flex items-center gap-1.5 shadow-md">
                    <Trophy size={13} className="text-purple-400" />
                    <span>{item.result}</span>
                  </div>

                  {/* Hover Overlay Button */}
                  {item.certificateImage && (
                    <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-semibold text-xs tracking-wide">
                      <div className="px-4 py-2 rounded-full bg-purple-600/90 border border-purple-400/50 flex items-center gap-1.5 shadow-lg transform group-hover:scale-105 transition-transform">
                        <Eye size={15} />
                        <span>View Certificate</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1.5">
                      <Award size={13} className="text-gray-500 shrink-0" />
                      <span>{item.organizer}</span>
                    </p>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-500 flex items-center gap-1 font-mono text-[11px]">
                      <Calendar size={12} />
                      {item.date}
                    </span>

                    {item.certificateImage ? (
                      <button
                        onClick={() =>
                          onSelectCertificate({
                            title: item.name,
                            image: item.certificateImage!,
                            issuer: item.organizer,
                          })
                        }
                        className="px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all font-medium flex items-center gap-1.5 text-[11px]"
                      >
                        <Eye size={13} />
                        <span>Certificate</span>
                      </button>
                    ) : (
                      <span className="text-gray-500 italic text-[11px]">Verified Participant</span>
                    )}
                  </div>

                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
