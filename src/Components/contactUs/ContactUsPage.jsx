import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContactForm from "./ContactUsForm";

const ContactUsPage = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch or any asynchronous operation
    setTimeout(() => {
      setLoading(false);
      // Uncomment to simulate an error
      // setError("Failed to load data");
    }, 2000);
  }, []);

  return (
    <main
      className="flex gap-5 max-md:flex-col max-md:gap-0 pt-10"
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <section className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
        {loading ? (
          <Skeleton height={400} className="mt-10" />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <ContactForm />
        )}
      </section>
      <section className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full mt-20">
        {loading ? (
          <Skeleton height={400} width={"100%"} className="mt-10" />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e34c28963a993589d581d3049653aed5412e15266f3bd15927ec0ffd7eefed1?apiKey=391ff68a63584b0181b4aa51e20262f0&"
            alt="Illustration of a contact form"
            className="self-stretch my-auto w-full aspect-[1.23] max-md:mt-10 max-md:max-w-full"
          />
        )}
      </section>
    </main>
  );
});

export default ContactUsPage;
