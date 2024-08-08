import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const MediaComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust as needed for real data loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="flex justify-center items-center my-16 text-black custom-height"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="1000"
    >
      <div className="flex flex-col items-center max-w-[1070px] px-5 text-5xl max-md:text-xl">
        {isLoading ? (
          <>
            <h1 className="pb-2 w-full max-md:text-2xl">
              <Skeleton height={40} width="100%" />
            </h1>
            <div className="z-10 w-[300px] aspect-[1.2] max-md:mt-10">
              <Skeleton height={240} width="100%" />
            </div>
            <h2 className="self-stretch w-full max-md:text-xl">
              <Skeleton height={30} width="100%" />
            </h2>
          </>
        ) : (
          <>
            <h1 className="pb-2 w-full max-md:text-2xl">OOPs !!</h1>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ef7aac1eb8ae812f12af8a2c1f4dfd7a6fd524cfd95af281632236bd2ee02e4?apiKey=ff00f11844934b2d9618929d5184b9ad&"
              alt="404 Error Illustration"
              className="z-10 w-[300px] aspect-[1.2] max-md:mt-10"
            />
            <h2 className="self-stretch w-full max-md:text-xl">
              404 - Page Not Found
            </h2>
          </>
        )}
      </div>
    </section>
  );
};

export default MediaComponent;
