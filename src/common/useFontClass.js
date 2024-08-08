import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const useFontClass = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [fontClass, setFontClass] = useState(localStorage.getItem('fontClass') || "font-kantumruy");

  useEffect(() => {
    const newFontClass = currentLang === "kh" ? "font-suwannaphum" : "font-kantumruy";
    setFontClass(newFontClass);
    localStorage.setItem('fontClass', newFontClass);
  }, [currentLang]);

  return { currentLang, fontClass };
}

export default useFontClass;
