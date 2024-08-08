import React from "react";

function InputField({ label, type }) {
  const inputClasses =
    "shrink-0 mt-2.5 rounded-lg border border-black border-solid h-[50px] max-md:max-w-full";
  const textareaClasses =
    "shrink-0 mt-3 rounded-lg border border-black border-solid h-[150px] max-md:max-w-full";

  return (
    <div className="flex flex-col mt-2.5 max-md:max-w-full">
      <label htmlFor={label} className=" text-base text-start font-normal ">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea id={label} className={textareaClasses} />
      ) : (
        <input type={type} id={label} className={inputClasses} />
      )}
    </div>
  );
}

export default InputField;
