import React from "react";
import Metadata from '../lib/Metadata';
import ContactUsPage from "../Components/contactUs/ContactUsPage";

export default function ContactUs() {
  return (
    <>
      <Metadata
        title="Contact Us"
        description="Get in touch with us for any inquiries or support."
        author="Your Name"
        keywords="contact, support, inquiries"
        thumbnail="https://example.com/contact-us-thumbnail.jpg"
        url="https://example.com/contact-us"
        type="website"
      />
      <div className="mb-10 custom-height">
        <ContactUsPage />
      </div>
    </>
  );
}
