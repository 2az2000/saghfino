import React, { useRef, useEffect, useState } from "react";

const FocusExample = () => {
  // ایجاد ref برای input
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // فوکوس خودکار هنگام بارگذاری کامپوننت
  useEffect(() => {
    // فوکوس روی input
    inputRef.current?.focus();
  }, []);

  // تابع فوکوس دستی
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // تابع فوکوس با تاخیر
  const handleDelayedFocus = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
  };

  // تابع فوکوس شرطی
  const handleConditionalFocus = () => {
    if (!isFocused) {
      inputRef.current?.focus();
      setIsFocused(true);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Input با ref */}
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="این input فوکوس می‌شود"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* دکمه‌های کنترل فوکوس */}
      <div className="flex gap-2">
        <button
          onClick={handleFocus}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          فوکوس مستقیم
        </button>

        <button
          onClick={handleDelayedFocus}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          فوکوس با تاخیر
        </button>

        <button
          onClick={handleConditionalFocus}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          فوکوس شرطی
        </button>
      </div>

      {/* نمایش وضعیت فوکوس */}
      <div className="text-sm text-gray-600">
        وضعیت فوکوس: {isFocused ? "فعال" : "غیرفعال"}
      </div>
    </div>
  );
};

export default FocusExample;
