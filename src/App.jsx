import { Navigate, useRoutes, useNavigate } from "react-router-dom";
import routes from "./router/routes";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { useCallback, useEffect, useState } from "react";
import AuthService, { AuthError } from "./services/authService";

/**
 * توابع
           مدیریت 
        کوکی‌ها
 * این توابع برای ذخیره‌سازی امن اطلاعات احراز هویت در کوکی‌ها استفاده می‌شوند
 */

/**
 * تنظیم یک کوکی با نام، مقدار و مدت زمان اعتبار
 * @param {string} name - نام کوکی
 * @param {any} value - مقدار کوکی
 * @param {number} days - تعداد روزهای اعتبار کوکی
 */
const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  // تنظیم کوکی با ویژگی‌های امنیتی
  document.cookie = `${name}=${JSON.stringify(
    value
  )};${expires};path=/;Secure;SameSite=Strict`;
};

/**
 * دریافت مقدار یک کوکی با نام مشخص
 * @param {string} name - نام کوکی
 * @returns {any|null} مقدار کوکی یا null در صورت عدم وجود
 */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(parts.pop().split(";").shift());
    } catch (e) {
      return null;
    }
  }
  return null;
};

/**
 * حذف یک کوکی با نام مشخص
 * @param {string} name - نام کوکی
 */
const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict`;
};

function App() {
  // استفاده از هوک useRoutes برای مدیریت مسیریابی
  const router = useRoutes(routes);
  const navigate = useNavigate();

  // تعریف state های مورد نیاز برای مدیریت احراز هویت
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  /**
   * تابع ورود کاربر
   * این تابع اطلاعات کاربر و توکن را در state و کوکی‌ها ذخیره می‌کند
   * @param {Object} userInfos - اطلاعات کاربر
   * @param {string} currentToken - توکن احراز هویت
   */
  const login = useCallback((userInfos, currentToken) => {
    try {
      let currentUserInfos = [userInfos, currentToken];
      // به‌روزرسانی state ها به صورت همزمان
      setToken(currentToken);
      setIsLoggedIn(true);
      setUserInfos(userInfos);
      setCurrentUser(userInfos); // تنظیم مستقیم currentUser با اطلاعات کاربر
      setError(null);

      // ذخیره‌سازی در کوکی‌ها با ویژگی‌های امنیتی
      setCookie("accessToken", { currentToken });
      setCookie("userInfos", currentUserInfos);
    } catch (error) {
      setError("خطا در ورود به سیستم");
      console.error("Login error:", error);
    }
  }, []);

  /**
   * تابع خروج کاربر از سیستم
   * این تابع وظایف زیر را انجام می‌دهد:
   * 1. پاک‌سازی اطلاعات کاربر از state های برنامه
   * 2. حذف داده‌های ذخیره شده در کوکی‌ها
   * 3. هدایت کاربر به صفحه Landing
   * 4. مدیریت خطاهای احتمالی در فرآیند خروج
   */
  const logout = useCallback(() => {
    try {
      // مرحله 1: پاک‌سازی state های مربوط به احراز هویت
      // - حذف توکن از state
      setToken(null);
      // - غیرفعال کردن وضعیت ورود
      setIsLoggedIn(false);
      // - پاک کردن اطلاعات کاربر
      setUserInfos({});
      // - حذف اطلاعات کاربر فعلی
      setCurrentUser(null);
      // - پاک کردن پیام‌های خطای قبلی
      setError(null);

      // مرحله 2: حذف کوکی‌های احراز هویت
      // - حذف توکن دسترسی از کوکی
      deleteCookie("accessToken");
      // - حذف اطلاعات کاربر از کوکی
      deleteCookie("userInfos");
      deleteCookie("userInfo");

      // مرحله 3: هدایت کاربر به صفحه Landing
      // - استفاده از navigate برای تغییر مسیر
      // - این کار باعث می‌شود کاربر به صفحه اصلی هدایت شود
      navigate("/");
    } catch (error) {
      // مرحله 4: مدیریت خطاهای احتمالی
      // - ثبت خطا در کنسول برای دیباگ
      console.error("Logout error:", error);
    }
  }, [navigate]); // وابستگی به تابع navigate برای مسیریابی

  /**
   * تابع اعتبارسنجی و تازه‌سازی خودکار توکن
   * این تابع وظایف زیر را انجام می‌دهد:
   * 1. بررسی وجود توکن در کوکی‌ها
   * 2. اعتبارسنجی توکن با سرور
   * 3. تازه‌سازی خودکار توکن در صورت منقضی شدن
   * 4. به‌روزرسانی وضعیت احراز هویت در برنامه
   * 5. مدیریت خطاها و نمایش پیام‌های مناسب
   */
  const validateAndRefreshAuth = useCallback(async () => {
    try {
      // مرحله 1: بررسی وجود توکن در کوکی‌ها
      // - خواندن توکن و اطلاعات کاربر از کوکی
      // - اگر توکن وجود نداشته باشد، تابع خاتمه می‌یابد
      const cookieData = getCookie("accessToken");
      const currentUserInfos = getCookie("userInfos");

      if (!cookieData?.currentToken) {
        return;
      }

      // مرحله 2: اعتبارسنجی توکن با سرور
      // - ارسال توکن به سرور برای بررسی اعتبار
      // - دریافت پاسخ از سرور
      const result = await AuthService.validateToken(cookieData.currentToken);

      if (result.success) {
        // مرحله 3: به‌روزرسانی وضعیت در صورت معتبر بودن توکن
        // - فعال کردن وضعیت ورود
        // - ذخیره اطلاعات کاربر
        // - تنظیم کاربر فعلی
        // - پاک کردن خطاهای قبلی
        setIsLoggedIn(true);
        setUserInfos(result.data);
        setCurrentUser(currentUserInfos?.[0]);
        setError(null);
      }
    } catch (error) {
      // مرحله 4: مدیریت خطاها
      if (error instanceof AuthError) {
        switch (error.statusCode) {
          case 401:
            // مرحله 5: تلاش برای تازه‌سازی توکن در صورت منقضی شدن
            try {
              // 5.1: دریافت توکن فعلی از کوکی
              const cookieData = getCookie("accessToken");

              // 5.2: درخواست توکن جدید از سرور
              const refreshResult = await AuthService.refreshToken(
                cookieData.currentToken
              );

              if (refreshResult.success) {
                // 5.3: ذخیره توکن جدید و تلاش مجدد برای اعتبارسنجی
                // - ذخیره توکن جدید در کوکی
                // - اجرای مجدد فرآیند اعتبارسنجی
                setCookie("accessToken", { currentToken: refreshResult.data });
                await validateAndRefreshAuth();
                return;
              }
            } catch (refreshError) {
              // 5.4: خروج در صورت شکست در تازه‌سازی توکن
              // - خروج کاربر
              // - نمایش پیام خطای مناسب
              logout();
              setError("نشست شما منقضی شده است. لطفا دوباره وارد شوید.");
            }
            break;

          case 503:
            // خطای شبکه: عدم دسترسی به سرور
            setError(
              "خطا در اتصال به سرور. لطفا اتصال اینترنت خود را بررسی کنید."
            );
            break;

          default:
            // سایر خطاهای سیستمی
            // - خروج کاربر
            // - نمایش پیام خطای عمومی
            setError("خطایی در سیستم رخ داده است. لطفا دوباره تلاش کنید.");
            logout();
        }
      } else {
        // خطاهای غیرمنتظره
        // - خروج کاربر
        // - نمایش پیام خطای عمومی
        setError("خطای غیرمنتظره‌ای رخ داده است.");
        logout();
      }
      // ثبت خطا در کنسول برای دیباگ
      console.error("Auth validation error:", error);
    }
  }, [logout]);

  /**
   * اجرای اعتبارسنجی در زمان بارگذاری برنامه
   * این useEffect در موارد زیر اجرا می‌شود:
   * 1. هنگام بارگذاری اولیه برنامه
   * 2. هر زمان که تابع logout تغییر کند
   */
  useEffect(() => {
    validateAndRefreshAuth();
  }, [validateAndRefreshAuth]);

  // ارائه context احراز هویت و جستجو به تمام کامپوننت‌های فرزند
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        currentUser,
        error,
      }}
    >
      <SearchProvider>{router}</SearchProvider>
    </AuthContext.Provider>
  );
}

export default App;
