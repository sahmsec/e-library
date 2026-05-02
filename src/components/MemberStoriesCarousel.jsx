"use client";

import { Quote } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MemberStoriesCarousel({ stories }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3600,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
      className="pb-12"
    >
      {stories.map((story) => (
        <SwiperSlide key={`${story.name}-${story.role}`} className="h-auto">
          <article className="library-card flex h-full flex-col rounded-[2rem] border border-white/70 p-8">
            <Quote className="size-10 text-library-copper" />
            <p className="mt-6 text-lg leading-8 text-library-ink/78">
              {story.quote}
            </p>
            <div className="mt-8">
              <p className="font-display text-2xl font-semibold text-library-ink">
                {story.name}
              </p>
              <p className="text-sm uppercase tracking-[0.24em] text-library-copper">
                {story.role}
              </p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
