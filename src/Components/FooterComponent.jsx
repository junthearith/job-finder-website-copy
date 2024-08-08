import React from "react";
import { useTranslation } from "react-i18next";
import useFontClass from "../common/useFontClass";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const FooterComponent = () => {
  const { fontClass } = useFontClass();
  const { t } = useTranslation();

  return (
    <Footer
      container
      className="w-full py-10 px-5 bg-primary-800 dark:bg-gray-800 text-white absolute left-0 right-0 no-rounded"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-8">
          <div className="flex-shrink-0 mb-6 md:mb-0 text-center md:text-left w-full md:w-auto mx-auto md:mx-0">
            <div className="flex flex-col items-center md:items-start mx-auto md:mx-0 px-12">
              <NavLink to="/">
                <img
                  src="https://ecommerce.techinsights.guru/file/3d3e78e2-5f53-4d18-8818-7b01f9cef98c.png"
                  className="h-12 mb-2"
                  alt="Job Quick Logo"
                />
              </NavLink>
              <span className={`text-2xl font-semibold ${fontClass}`}>
                Job Quick
              </span>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0 mx-32">
            <div className={`text-center sm:text-left mb-6 sm:mb-0 ${fontClass}`}>
              <Footer.Title
                title={t("footer.website.name")}
                className="text-gray-100 font-semibold text-lg"
              />
              <Footer.LinkGroup col className="text-base text-gray-300">
                <NavLink to="/jobs" className="text-base text-gray-300">
                  {t("footer.website.jobs")}
                </NavLink>
                <NavLink to="/media" className="text-base text-gray-300">
                  {t("footer.website.media")}
                </NavLink>
              </Footer.LinkGroup>
            </div>
            <div className={`text-center sm:text-left mb-6 sm:mb-0 ${fontClass}`}>
              <Footer.Title
                title={t("footer.information.name")}
                className="text-gray-100 font-semibold text-lg"
              />
              <Footer.LinkGroup col className="text-base text-gray-300">
                <NavLink to="/about-us" className="text-base text-gray-300">
                  {t("footer.information.about-us")}
                </NavLink>
                <NavLink to="/privacy-policy" className="text-base text-gray-300">
                  {t("footer.information.privacy-policy")}
                </NavLink>
              </Footer.LinkGroup>
            </div>
            <div className={`text-center sm:text-left mb-6 sm:mb-0 ${fontClass}`}>
              <Footer.Title
                title={t("footer.contact-us.name")}
                className="text-gray-100 font-semibold text-lg"
              />
              <Footer.LinkGroup col className="text-base text-gray-300">
                <NavLink to="/contact-us" className="text-base text-gray-300">
                  {t("footer.contact-us.phone")}
                </NavLink>
                <NavLink to="/contact-us" className="text-base text-gray-300">
                  {t("footer.contact-us.email")}
                </NavLink>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <div className={`text-center md:text-left ${fontClass}`}>
              <h3 className="mb-2 text-lg uppercase font-semibold text-gray-100">
                {t("footer.notification")}
              </h3>
              <p className="text-left mb-3 text-sm font-medium text-gray-300">
                {t("footer.description")}
              </p>
              <form
                action="https://app.convertkit.com/forms/4692392/subscriptions"
                className="seva-form formkit-form"
                method="post"
                data-sv-form="4692392"
                data-uid="344e3b5c48"
                data-format="inline"
                data-version="5"
                min-width="400 500 600 700"
              >
                <div data-style="clean" className="flex flex-col md:flex-row items-end mb-3">
                  <ul
                    className="formkit-alert formkit-alert-error"
                    data-element="errors"
                    data-group="alert"
                  ></ul>
                  <div
                    data-element="fields"
                    data-stacked="false"
                    className="flex flex-col md:flex-row items-center w-full max-w-md mb-3 seva-fields formkit-fields"
                  >
                    <div className="relative w-full mb-3 md:mb-0 md:mr-3 formkit-field">
                      <label htmlFor="member_email" className="sr-only">Email address</label>
                      <input
                        id="member_email"
                        className={`${fontClass} formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md`}
                        name="email_address"
                        aria-label="Email Address"
                        placeholder={t("footer.email")}
                        required
                        type="email"
                      />
                    </div>
                    <button data-element="submit" className="formkit-submit">
                      <span className=" px-6 py-3 text-sm font-semibold text-center text-white bg-primary-900 cursor-pointer hover:bg-primary-850 focus:ring-4 focus:ring-blue-300 rounded-lg">
                        Subscribe
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <Footer.Copyright
            href="#"
            by="Job Finder™"
            year={2024}
            className="text-gray-200"
          />
          <div className="mt-4 flex space-x-6 md:mt-0 md:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              aria-label="Facebook"
              className="text-gray-200"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              aria-label="Instagram"
              className="text-gray-200"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              aria-label="Twitter"
              className="text-gray-200"
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
              aria-label="Github"
              className="text-gray-200"
            />
            <Footer.Icon
              href="#"
              icon={BsDribbble}
              aria-label="Dribbble"
              className="text-gray-200"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
