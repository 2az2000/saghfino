import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // فایل CSS برای استایل‌ها و انیمیشن

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // تابعی که بررسی می‌کند آیا کاربر به اندازه کافی اسکرول کرده است یا نه
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // تابعی که صفحه را به بالا اسکرول می‌کند
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} className="scroll-to-top-button">
        ↑
      </button>
    </div>
  );
};

export default ScrollToTopButton;