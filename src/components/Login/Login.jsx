/**
 * کامپوننت ورود کاربران به سیستم
 * این کامپوننت یک مودال ورود را نمایش می‌دهد که شامل فرم ورود با فیلدهای نام کاربری و رمز عبور است.
 * مسئولیت‌های اصلی:
 * 1. نمایش فرم ورود در قالب یک مودال
 * 2. اعتبارسنجی داده‌های ورودی کاربر
 * 3. ارسال درخواست به سرور و پردازش پاسخ
 * 4. مدیریت توکن و اطلاعات کاربر
 * 5. مسیریابی پس از ورود موفق
 *
 * @component
 * @param {Object} props - پراپرتی‌های کامپوننت
 * @param {Function} props.onClose - تابعی که هنگام بستن مودال فراخوانی می‌شود
 *
 * @example
 * // نحوه استفاده از کامپوننت
 * <Login onClose={() => setShowLoginModal(false)} />
 */

import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import Input from "../form/Input";
import { generateAccessToken } from "../../hooks/AccessToken";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";

export default function Login({ onClose }) {
  /**
   * هوک navigate برای مسیریابی پس از ورود موفق
   * این هوک از react-router-dom برای هدایت کاربر به صفحات مختلف استفاده می‌شود
   * در این کامپوننت برای هدایت کاربر به صفحه اصلی پس از ورود موفق استفاده می‌شود
   */
  const navigate = useNavigate();

  /**
   * دسترسی به context احراز هویت برای مدیریت وضعیت ورود کاربر
   * این context شامل توابع و state‌های مربوط به احراز هویت است
   * از جمله:
   * - تابع login برای ذخیره اطلاعات کاربر
   * - وضعیت isLoggedIn
   * - اطلاعات کاربر جاری
   */
  const authContext = useContext(AuthContext);

  /**
   * مدیریت state فرم با استفاده از هوک useForm
   * این هوک سفارشی برای مدیریت state و اعتبارسنجی فرم استفاده می‌شود
   *
   * @property {Object} formState - وضعیت فعلی فرم
   * @property {Object} formState.inputs - مقادیر و وضعیت اعتبارسنجی فیلدهای ورودی
   * @property {boolean} formState.isFormValid - وضعیت کلی اعتبارسنجی فرم
   * @property {Function} onInputHandler - تابع به‌روزرسانی مقادیر فیلدها
   */
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  /**
   * پردازش ورود کاربر
   * این تابع مسئول:
   * 1. اعتبارسنجی داده‌های فرم
   * 2. ارسال درخواست به سرور
   * 3. پردازش پاسخ سرور
   * 4. ذخیره توکن و اطلاعات کاربر
   * 5. به‌روزرسانی وضعیت احراز هویت
   * 6. هدایت کاربر به صفحه اصلی
   *
   * @async
   * @param {Event} e - رویداد submit فرم
   * @throws {Error} در صورت بروز خطا در ارتباط با سرور
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // بررسی اعتبارسنجی فرم قبل از ارسال درخواست
    if (!formState.isFormValid) {
      alert("لطفاً تمام فیلدها را به درستی پر کنید");
      return;
    }

    // آماده‌سازی داده‌های کاربر برای ارسال به سرور
    const userData = {
      name: formState.inputs.name.value,
      password: formState.inputs.password.value,
    };

    try {
      // ارسال درخواست به API برای بررسی اعتبار کاربر
      // TODO: استفاده از HTTPS در محیط production
      const response = await fetch(
        `http://localhost:3004/users?name=${userData.name}&password=${userData.password}`
      );

      const users = await response.json();

      if (users.length > 0) {
        // تولید توکن دسترسی جدید با استفاده از هوک سفارشی
        const accessToken = generateAccessToken();
        const user = users[0];

        // ذخیره توکن و اطلاعات کاربر در کوکی‌ها با تنظیمات امنیتی
        // Secure: فقط در HTTPS
        // SameSite: محافظت در برابر حملات CSRF
        document.cookie = `accessToken=${accessToken}; path=/; Secure; SameSite=Strict`;
        document.cookie = `userInfo=${JSON.stringify(
          user
        )}; path=/; Secure; SameSite=Strict`;

        // به‌روزرسانی وضعیت احراز هویت در context با ارسال کامل اطلاعات کاربر
        authContext.login(user, accessToken);

        // بستن مودال و هدایت کاربر به صفحه اصلی
        onClose();
        navigate("/home-pro-user");
      } else {
        alert("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      console.error("خطا در ورود:", error);
      alert("خطا در ارتباط با سرور");
    }
  };

  /**
   * ref برای مدیریت کلیک خارج از مودال
   * این ref به المان اصلی مودال متصل می‌شود
   * و برای تشخیص کلیک خارج از محدوده مودال استفاده می‌شود
   */
  const loginRef = useRef();

  /**
   * تابع مدیریت کلیک خارج از مودال
   * این تابع با useCallback بهینه‌سازی شده تا از ایجاد نمونه‌های غیرضروری جلوگیری شود
   * و فقط زمانی که onClose تغییر کند، دوباره ساخته می‌شود
   *
   * @param {MouseEvent} event - رویداد کلیک
   */
  const handleClickOutside = useCallback(
    (event) => {
      // بررسی می‌کند آیا کلیک خارج از محدوده مودال بوده است
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  /**
   * افزودن و حذف event listener برای کلیک خارج از مودال
   * این useEffect:
   * 1. event listener را در زمان mount اضافه می‌کند
   * 2. در زمان unmount آن را حذف می‌کند
   * 3. در صورت تغییر handleClickOutside مجدداً اجرا می‌شود
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    // کانتینر اصلی مودال با پس‌زمینه نیمه‌شفاف
    <div className="login-container w-full h-screen fixed bg-black bg-opacity-70 flex justify-center items-center z-20">
      {/* مودال ورود - کادر سفید مرکزی */}
      <div
        ref={loginRef}
        className="login-modal w-3/5 h-3/5 bg-white rounded-3xl flex flex-col justify-between"
      >
        {/* بخش بالایی مودال شامل عنوان و فیلدهای ورودی */}
        <div className="top-login-modal flex flex-col items-center gap-2 mt-5">
          <h2 className="text-black">ورود</h2>
          <p>به سقفینو خوش آمدید</p>
          <p>لطفا برای ورود شماره موبایل خود را وارد کنید</p>

          {/* فیلد نام کاربری با اعتبارسنجی
              - حداقل 6 کاراکتر
              - حداکثر 20 کاراکتر
              - اجباری
           */}
          <Input
            onInputHandler={onInputHandler}
            element="input"
            id="name"
            className="border border-black w-2/3 px-5 py-2 rounded mt-2"
            type="text"
            placeholder="نام کاربری"
            validations={[
              requiredValidator(),
              minValidator(6),
              maxValidator(20),
            ]}
          />

          {/* فیلد رمز عبور با اعتبارسنجی
              - حداقل 8 کاراکتر
              - حداکثر 18 کاراکتر
              - اجباری
           */}
          <Input
            onInputHandler={onInputHandler}
            element="input"
            id="password"
            className="border border-black w-2/3 px-5 py-2 rounded mt-2"
            type="password"
            placeholder="گذرواژه"
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(18),
            ]}
          />

          {/* بخش قوانین و مقررات - چک‌باکس پذیرش قوانین */}
          <div className="rule-input flex gap-3">
            <input type="radio" />
            <p className="text-black">
              با{" "}
              <a className="text-red-500" href="#">
                قوانین سقفینو
              </a>{" "}
              موافق هستم
            </p>
          </div>
        </div>

        {/* بخش پایینی مودال شامل دکمه‌های ورود و ثبت‌نام */}
        <div className="botton-login-modal mb-5 flex flex-col items-center">
          {/* دکمه ورود - غیرفعال در صورت نامعتبر بودن فرم */}
          <button
            onClick={handleLogin}
            className="login-btn w-2/3 bg-red-500 mb-2 py-2 px-5 rounded text-white"
            disabled={!formState.isFormValid}
          >
            ورود
          </button>
          {/* لینک ثبت‌نام - هدایت به صفحه ثبت‌نام */}
          <Link
            onClick={() => onClose()}
            to="/register"
            className="register-btn w-2/3 bg-gray-100 py-2 px-5 rounded text-center"
          >
            ثبتنام
          </Link>
        </div>
      </div>
    </div>
  );
}
