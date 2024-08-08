import React from "react";

import Metadata from "../lib/Metadata";
import LoginForm from "../Components/auth/LoginForm";

function LoginPage() {
  return (
    <>
    <Metadata
        title="Login"
        description="Access your account by logging in."
        author="Your Name"
        keywords="login, access, account"
        thumbnail="https://cdn.builder.io/api/v1/image/assets/TEMP/336b00db8b95923de0a609ff638f4f11f286aa5d6f7453d35cdf68e5158f1387?apiKey=ad7733614e794f228aa68fbfd330edec&"
        url="https://jobquick.techinsights.guru/login"
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
          <div className="flex items-center justify-center px-4 lg:px-0">
            <LoginForm />
          </div>
          <div className="flex items-center justify-center px-4 lg:px-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/336b00db8b95923de0a609ff638f4f11f286aa5d6f7453d35cdf68e5158f1387?apiKey=ad7733614e794f228aa68fbfd330edec&"
              alt="Login visual"
              className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default LoginPage;
