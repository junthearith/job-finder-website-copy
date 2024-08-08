import React from "react";

function Button({ text }) {
  return (
    <button className="justify-center self-start p-2.5 mt-8 text-white bg-blue-800 rounded-3xl border-2 border-blue-800 border-solid max-md:px-5 text-sm leading-none">
      {text}
    </button>
  );
}

export default Button;
