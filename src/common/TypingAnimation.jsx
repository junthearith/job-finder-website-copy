import React, { useEffect, useState } from 'react';

const TypingAnimation = ({ texts, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setDisplayedText(
        isDeleting ? fullText.substring(0, displayedText.length - 1) : fullText.substring(0, displayedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, typingSpeed, texts]);

  return (
    <span className={className}>
      {displayedText}
      <span className="ml-1 text-black font-bold animate-blink">|</span>
    </span>
  );
};

export default TypingAnimation;
