/**
 * SearchContext
 * این کانتکست مسئول مدیریت وضعیت جستجو در برنامه است.
 * شامل فیلترهای جستجو مانند نوع جستجو، متن جستجو و شهر انتخاب شده می‌باشد.
 */

import { createContext, useContext, useState } from "react";

// تعریف کانتکست با مقادیر پیش‌فرض
const SearchContext = createContext(null);

/**
 * SearchProvider
 * کامپوننت اصلی که وضعیت جستجو را مدیریت می‌کند
 * @param {Object} props - پراپ‌های کامپوننت
 * @param {React.ReactNode} props.children - کامپوننت‌های فرزند
 */
export const SearchProvider = ({ children }) => {
  // تعریف state‌های مورد نیاز
  const [searchType, setSearchType] = useState("rent"); // نوع جستجو: 'rent' یا 'buy'
  const [searchQuery, setSearchQuery] = useState(""); // متن جستجو
  const [selectedCity, setSelectedCity] = useState(""); // شهر انتخاب شده

  /**
   * به‌روزرسانی پارامترهای جستجو
   * @param {string} type - نوع جستجو
   * @param {string} query - متن جستجو
   * @param {string} city - شهر انتخاب شده
   */
  const updateSearch = (type, query, city) => {
    setSearchType(type);
    setSearchQuery(query);
    setSelectedCity(city);
  };

  /**
   * پاک کردن تمام پارامترهای جستجو
   * بازگرداندن مقادیر به حالت پیش‌فرض
   */
  const clearSearch = () => {
    setSearchType("rent");
    setSearchQuery("");
    setSelectedCity("");
  };

  // تعریف مقادیر کانتکست
  const value = {
    searchType,
    searchQuery,
    selectedCity,
    updateSearch,
    clearSearch,
  };

  // ارائه مقادیر کانتکست به کامپوننت‌های فرزند
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

/**
 * Hook سفارشی برای دسترسی به کانتکست جستجو
 * @returns {Object} مقادیر و توابع کانتکست جستجو
 * @throws {Error} در صورت استفاده خارج از SearchProvider
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};