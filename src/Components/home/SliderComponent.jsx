import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const imageUrls = [
  {
    url: "https://ibccambodia.com/wp-content/uploads/2019/09/Wing-Bank-01-scaled.jpg",
    width: 2000,
    height: 600,
    alt: "Image 1 description",
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b0637bed0518cc6adfec9c73be1365577988d916ebb2ce4986966ab195df3d4?apiKey=0bc16f2f0d6a46d9b1296b8c9a315482&",
    width: 2000,
    height: 600,
    alt: "Image 2 description",
  },
  {
    url: "https://ibccambodia.com/wp-content/uploads/2019/09/RMA-Logo.png",
    width: 2000,
    height: 600,
    alt: "Image 3 description",
  },
  {
    url: "https://hrincjobs-pro.s3.amazonaws.com/media/public/filer_public/33/a0/33a02da3-4d2e-4e32-bb47-1f5c0e56bbad/amk.png",
    width: 2000,
    height: 600,
    alt: "Image 4 description",
  },
  {
    url: "https://ecommerce.techinsights.guru/file/9994758f-3018-4310-ac66-c32ead46cd05.png",
    width: 2000,
    height: 600,
    alt: "Image 5 description",
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets/TEMP/8a31d4ddb445d49c683222412a95664d2d100100905c8604958e5f854bee6070?apiKey=391ff68a63584b0181b4aa51e20262f0&&apiKey=391ff68a63584b0181b4aa51e20262f0",
    width: 2000,
    height: 600,
    alt: "Image 6 description",
  },
];

const SliderComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust as needed for real data loading time

    return () => clearTimeout(timer);
  }, []);

  const renderSkeleton = useCallback(() => (
    <Skeleton
      height={0}
      width="100%"
      className="w-full aspect-[4/3] mt-10"
      style={{ paddingBottom: "75%" }}
    />
  ), []);

  const renderImage = useCallback((image) => (
    <img
      loading="lazy"
      src={image.url}
      width={image.width}
      height={image.height}
      srcSet={`${image.url} 800w, ${image.url}?w=400 400w`}
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
      className="w-full h-full object-cover rounded-xl"
      alt={image.alt}
      style={{ aspectRatio: `${image.width}/${image.height}` }}
    />
  ), []);

  return (
    <section className="product-gallery" data-aos="fade-up-left">
      <Swiper
        modules={[Autoplay, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {imageUrls.map((image, index) => (
          <SwiperSlide key={index} className="h-auto pb-10">
            <figure className="flex flex-col grow justify-center w-full bg-white rounded-xl">
              {isLoading ? renderSkeleton() : renderImage(image)}
            </figure>
          </SwiperSlide>
        ))}
        <div className="swiper-scrollbar mt-8"></div>
        <div className="swiper-pagination mt-8"></div>
      </Swiper>
    </section>
  );
};

export default React.memo(SliderComponent);