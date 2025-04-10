import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * کامپوننت محافظت از مسیر
 * این کامپوننت برای محافظت از مسیرهایی استفاده می‌شود که نیاز به احراز هویت دارند
 * @param {Object} props - پراپس‌های کامپوننت
 * @param {ReactNode} props.children - کامپوننت‌های فرزند که باید محافظت شوند
 * @returns {ReactNode} - کامپوننت فرزند یا ریدایرکت به صفحه مناسب
 */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * تابع دریافت مقدار کوکی با نام مشخص
   * @param {string} name - نام کوکی مورد نظر
   * @returns {string|undefined} - مقدار کوکی یا undefined اگر کوکی وجود نداشته باشد
   */
  const getCookie = (name) => {
    // دریافت تمام کوکی‌های موجود
    const value = `; ${document.cookie}`;
    /* 
    مثال: document.cookie می‌تواند چنین مقداری داشته باشد:
    "accessToken=1234567; userInfo=john; theme=dark"
    با اضافه کردن ; در ابتدا، به این شکل می‌شود:
    "; accessToken=1234567; userInfo=john; theme=dark"
    این کار برای یکسان‌سازی فرمت و راحتی جداسازی است
    */

    // جدا کردن کوکی مورد نظر
    const parts = value.split(`; ${name}=`);
    /* 
    اگر به دنبال accessToken باشیم:
    split("; accessToken=") نتیجه را به دو بخش تقسیم می‌کند:
    parts[0] = ""  (بخش قبل از accessToken)
    parts[1] = "1234567; userInfo=john; theme=dark" (بخش بعد از accessToken)
    
    اگر کوکی مورد نظر پیدا نشود:
    parts.length === 1 خواهد بود
    */

    // اگر کوکی پیدا شد، مقدار آن را برمی‌گرداند

    if (parts.length === 2) return parts.pop().split(";").shift();
    /*
    1. parts.pop(): آخرین بخش را برمی‌گرداند
       "1234567; userInfo=john; theme=dark"
    
    2. split(";"): با ; جدا می‌کند
       ["1234567", " userInfo=john", " theme=dark"]
    
    3. shift(): اولین مقدار را برمی‌گرداند
       "1234567"
    */
  };

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (accessToken) {
        // اگر کاربر لاگین کرده است
        if (location.pathname === "/") {
          navigate("/home-pro-user");
        }
      } else {
        // اگر کاربر لاگین نکرده است
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return children;
};

export default ProtectedRoute;
