import React from "react";
import InputField from "./InputField";

function ContactForm() {
  const fields = [
    { label: "Name", type: "text" },
    { label: "Email", type: "email" },
    { label: "Message", type: "textarea" },
  ];

  return (
    <form className="flex flex-col text-2xl whitespace-nowrap text-black text-opacity-100 max-md:mt-10 max-md:max-w-full mt-2 custom-height">
      <h1 className="mt-20 text-4xl text-start font-kantumruy max-md:max-w-full text-primary-800 font-bold">
        Contact Us!
      </h1>
      <p className="text-start font-normal mt-3">
        Got any issue? How can i help you?
      </p>
      {fields.map((field, index) => (
        <InputField key={index} label={field.label} type={field.type} />
      ))}
      <span className="w-32 bg-primary-800 mt-5 rounded-lg text-white font-kantumruy">
        <button className="text-lg mb-1">Send</button>
      </span>
    </form>
  );
}

export default ContactForm;
