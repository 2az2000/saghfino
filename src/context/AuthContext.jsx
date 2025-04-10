/**
 * AuthContext
 * این کانتکست مسئول مدیریت وضعیت احراز هویت کاربر در برنامه است.
 * شامل توابع ورود، خروج و مدیریت خطاها می‌باشد.
 */

import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// تعریف کانتکست با مقادیر پیش‌فرض
const AuthContext = createContext({
  isLoggedIn: false, // وضعیت ورود کاربر
  token: null, // توکن احراز هویت
  userInfos: null, // اطلاعات کاربر
  error: null, // پیام خطا
  login: () => {}, // تابع ورود
  logout: () => {}, // تابع خروج
  clearError: () => {}, // تابع پاک کردن خطا
});

/**
 * AuthProvider
 * کامپوننت اصلی که وضعیت احراز هویت را مدیریت می‌کند
 * @param {Object} props - پراپ‌های کامپوننت
 * @param {React.ReactNode} props.children - کامپوننت‌های فرزند
 */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // تعریف state‌های مورد نیاز
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [error, setError] = useState(null);

  /**
   * پاک کردن پیام خطا
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * تابع ورود کاربر
   * @param {Object} userInfos - اطلاعات کاربر
   * @param {string} currentToken - توکن احراز هویت
   * @throws {Error} در صورت نامعتبر بودن داده‌ها
   */
  const login = useCallback(
    (userInfos, currentToken) => {
      try {
        // اعتبارسنجی داده‌های ورودی
        if (!userInfos || !currentToken) {
          throw new Error("اطلاعات ورودی نامعتبر است");
        }

        // ذخیره اطلاعات در state
        setToken(currentToken);
        setIsLoggedIn(true);
        setUserInfos(userInfos);
        setError(null);

        // تنظیمات امنیتی کوکی‌ها
        const cookieOptions = "path=/; Secure; SameSite=Strict";

        // ذخیره‌سازی در کوکی‌ها
        document.cookie = `accessToken=${currentToken}; ${cookieOptions}`;
        document.cookie = `userInfo=${JSON.stringify(
          userInfos
        )}; ${cookieOptions}`;

        // هدایت به صفحه اصلی پس از ورود موفق
        navigate("/");
      } catch (err) {
        setError(err.message || "خطا در ورود به سیستم");
        console.error("Login error:", err);
        throw err;
      }
    },
    [navigate]
  );

  /**
   * تابع خروج کاربر
   * پاک کردن اطلاعات احراز هویت و هدایت به صفحه اصلی
   * @throws {Error} در صورت بروز خطا در فرآیند خروج
   */
  const logout = useCallback(() => {
    try {
      // تنظیمات کوکی برای حذف
      const cookieOptions =
        "path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict";

      // حذف کوکی‌ها
      document.cookie = `accessToken=; ${cookieOptions}`;
      document.cookie = `userInfo=; ${cookieOptions}`;

      // پاک کردن اطلاعات از state
      setToken(null);
      setIsLoggedIn(false);
      setUserInfos(null);
      setError(null);

      // هدایت به صفحه اصلی
      navigate("/");
    } catch (err) {
      setError("خطا در خروج از سیستم");
      console.error("Logout error:", err);
      throw err;
    }
  }, [navigate]);

  /**
   * بررسی وضعیت احراز هویت کاربر
   * بررسی وجود توکن معتبر در کوکی‌ها و بازیابی اطلاعات کاربر
   */
  const checkAuthStatus = useCallback(() => {
    try {
      // استخراج توکن از کوکی‌ها
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      // استخراج اطلاعات کاربر از کوکی‌ها
      const userInfo = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userInfo="))
        ?.split("=")[1];

      // اگر توکن و اطلاعات کاربر موجود باشند
      if (accessToken && userInfo) {
        setToken(accessToken);
        setUserInfos(JSON.parse(userInfo));
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Auth status check error:", err);
      logout(); // پاک کردن اطلاعات نامعتبر
    }
  }, [logout]);

  // بررسی وضعیت احراز هویت در زمان بارگذاری برنامه
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // ارائه مقادیر کانتکست به کامپوننت‌های فرزند
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
