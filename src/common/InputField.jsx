// InputField.jsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const InputField = ({ label, name, type = 'text', placeholder, fontClass }) => {
  return (
    <div className={`mb-4 w-full text-left ${fontClass}`}>
      <label htmlFor={name} className={`block text-base leading-6 text-gray-900 dark:text-slate-100 mb-2 ${fontClass}`}>
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full px-3.5 py-3.5 bg-gray-50 rounded-lg border border-solid border-slate-300 text-base text-gray-500  ${fontClass}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-red-600 text-sm dark:text-red-500"
      />
    </div>
  );
};

export default InputField;
