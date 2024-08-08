// PasswordInput.jsx
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const PasswordInput = ({ label, id, name, placeholder, value, onChange, onBlur, error, touched, fontClass }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={`mb-4 w-full text-left ${fontClass}`}>
      <label htmlFor={id} className={`block text-base leading-6 text-gray-900 dark:text-white mb-2 ${fontClass}`}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={`w-full px-3.5 py-3.5 bg-gray-50 rounded-lg border border-solid border-slate-300 text-base text-gray-900 pr-10 ${fontClass}`}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiEyeOff className="h-5 w-5 text-gray-500" /> : <HiEye className="h-5 w-5 text-gray-500" />}
        </div>
      </div>
      {touched && error && (
        <div className="mt-1 text-red-600 text-sm dark:text-red-500 ">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
