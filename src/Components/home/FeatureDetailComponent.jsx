import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

// No need for React.memo if there are no props or performance issues
const FeatureDetailComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust based on your data fetching needs

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center py-16 max-w-full">
      {isLoading ? (
        <>
          <Skeleton height={40} width={300} className="mb-4" />
          <Skeleton height={20} count={2} width={600} className="mb-4" />
          <Skeleton height={400} width={800} className="aspect-[6.25]" />
        </>
      ) : (
        <>
          <h2 className="text-4xl leading-6 text-black dark:text-white">
            Feature on
          </h2>
          <article className="flex flex-col mt-12 text-base text-neutral-600 dark:text-neutral-300 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
            <p className="text-center max-md:max-w-full">
              Job Finder is delighted to be covered by various Media. Our team
              adheres to six original core values <br />
              (Teamwork, High Ambition, Strong Confidence, Be the only ONE, Working
              Hard, and PDCA Quality Cycle) <br />
              to ensure we deliver what we promise to ourselves and our customers.
            </p>
          </article>
          <div className="flex justify-center items-center w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc4ff153c8a8e5bf9c98136fb6d8ed297c3d759da1126d945096b3c29a7d7654?apiKey=ff00f11844934b2d9618929d5184b9ad&"
              alt="Feature on media coverage"
              className="mt-3 w-full max-w-[800px] aspect-[6.25] object-cover"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default FeatureDetailComponent;
