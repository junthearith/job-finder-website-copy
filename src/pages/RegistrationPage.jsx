import React from "react";
import Metadata from '../lib/Metadata';
import RegistrationForm from "../Components/auth/RegistrationForm";

const RegistrationPage = () => {
  return (
    <>
      <Metadata
        title="Register"
        description="Create an account to start using our services."
        author="Your Name"
        keywords="register, sign up, create account"
        thumbnail="https://cdn.builder.io/api/v1/image/assets/TEMP/dfc88a762229238be0ba236bdc53e7231de668be5613407739ad520eb7f8a51b?apiKey=ad7733614e794f228aa68fbfd330edec&"
        url="https://jobquick.techinsights.guru/register"
        type="website"
      />
      <main
        className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex items-center justify-center p-4 lg:p-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfc88a762229238be0ba236bdc53e7231de668be5613407739ad520eb7f8a51b?apiKey=ad7733614e794f228aa68fbfd330edec&"
                alt="Registration illustration"
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
              />
            </div>
            <div className="flex items-center justify-center p-4 lg:p-0">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegistrationPage;
