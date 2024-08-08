import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
    const { i18n, t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        const newFontClass = lng === "kh" ? "font-suwannaphum" : "font-kantumruy";
        localStorage.setItem('fontClass', newFontClass);
    };

    return (
        <div ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                aria-label={t("translate.selectLanguage")}
            >
                <FontAwesomeIcon icon={faLanguage} className="text-3xl text-white dark:text-white "/>
            </button>
            {isDropdownOpen && (
                <div className="absolute left-0 mt-3 py-2 w-48 bg-white rounded shadow-xl border border-gray-200 transition duration-300 ease-in-out z-50">
                    <button
                        onClick={() => changeLanguage("kh")}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        aria-label={t("translate.khmer")}
                    >
                        <img
                            src="https://img.icons8.com/?size=96&id=2ui1n4CYeion&format=png"
                            alt="Khmer icon"
                            className="w-6 h-6 mr-2"
                        />
                        <span className={`${localStorage.getItem('fontClass')} text-sm font-normal`}>
                            {t("translate.khmer")}
                        </span>
                    </button>
                    <button
                        onClick={() => changeLanguage("en")}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        aria-label={t("translate.english")}
                    >
                        <img
                            src="https://img.icons8.com/?size=96&id=xapj7ZzAUZKI&format=png"
                            alt="English icon"
                            className="w-6 h-6 mr-2"
                        />
                        <span className={`${localStorage.getItem('fontClass')} text-sm font-normal`}>
                            {t("translate.english")}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown;
