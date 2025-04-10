import React, { useContext, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Input from "../form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import AuthContext from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import {
  registerUser,
  checkUsernameUnique,
  checkEmailUnique,
} from "../../services/api"; // توابع جدید برای بررسی یکتا بودن
import { generateAccessToken } from "../../hooks/AccessToken";

export default function Register() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(""); // حالت برای خطای نام کاربری
  const [emailError, setEmailError] = useState(""); // حالت برای خطای ایمیل

  // استفاده از هوک useForm برای مدیریت وضعیت فرم
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
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

  // بررسی اعتبار فرم با useMemo
  const isFormValid = useMemo(() => {
    return (
      formState.inputs.name.isValid &&
      formState.inputs.email.isValid &&
      formState.inputs.password.isValid
    );
  }, [formState]);

  // تابع بررسی یکتا بودن نام کاربری
  const validateUsernameUnique = useCallback(async () => {
    const username = formState.inputs.name.value;
    if (username) {
      const isUnique = await checkUsernameUnique(username);
      if (!isUnique) {
        setUsernameError("نام کاربری از قبل وجود دارد.");
      } else {
        setUsernameError("");
      }
    }
  }, [formState.inputs.name.value]);

  // تابع بررسی یکتا بودن ایمیل
  const validateEmailUnique = useCallback(async () => {
    const email = formState.inputs.email.value;
    if (email) {
      const isUnique = await checkEmailUnique(email);
      if (!isUnique) {
        setEmailError("ایمیل از قبل وجود دارد.");
      } else {
        setEmailError("");
      }
    }
  }, [formState.inputs.email.value]);

  // تابع ثبت‌نام کاربر
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();

      // بررسی یکتا بودن نام کاربری و ایمیل قبل از ثبت‌نام
      await validateUsernameUnique();
      await validateEmailUnique();

      // اگر خطایی وجود داشت، ثبت‌نام انجام نشود
      if (usernameError || emailError) {
        alert("لطفا خطاهای فرم را برطرف کنید.");
        return;
      }

      const newUser = {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };

      try {
        const response = await registerUser(newUser);
        if (response.ok) {
          const userData = await response.json();
          
          const accessToken = generateAccessToken(); // تولید توکن
          localStorage.setItem("accessToken", accessToken); // ذخیره توکن
          authContext.login(userData , accessToken);
          navigate('/');
          alert("ثبت‌نام موفقیت‌آمیز بود!");
        } else {
          alert("خطا در ثبت‌نام");
        }
      } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
        alert("خطا در ارتباط با سرور");
      }
    },
    [
      formState,
      authContext,
      usernameError,
      emailError,
      validateUsernameUnique,
      validateEmailUnique,
    ]
  );

  return (
    <div className="register-container w-full h-screen fixed flex justify-center items-center z-30">
      <div className="register-modal w-3/5 h-3/5 bg-white rounded-3xl flex flex-col justify-between">
        <div className="top-register-modal flex flex-col items-center gap-2 mt-5">
          <h2 className="text-black">ثبت نام</h2>
          <p>به سقفینو خوش آمدید</p>
          <p>لطفا برای ثبت نام شماره موبایل خود را وارد کنید</p>
          <Input
            element="input"
            id="name"
            className="border border-black w-2/3 px-5 py-2 rounded mt-2"
            type="text"
            placeholder="نام کاربری"
            onInputHandler={onInputHandler}
            onBlur={validateUsernameUnique} // بررسی یکتا بودن نام کاربری هنگام خروج از فیلد
            validations={[
              requiredValidator(),
              minValidator(6),
              maxValidator(20),
            ]}
          />
          {usernameError && <p className="text-red-500">{usernameError}</p>}{" "}
          {/* نمایش خطای نام کاربری */}
          <Input
            element="input"
            id="email"
            className="border border-black w-2/3 px-5 py-2 rounded mt-2"
            type="email"
            placeholder="ایمیل"
            onInputHandler={onInputHandler}
            onBlur={validateEmailUnique} // بررسی یکتا بودن ایمیل هنگام خروج از فیلد
            validations={[
              requiredValidator(),
              maxValidator(25),
              emailValidator(),
            ]}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}{" "}
          {/* نمایش خطای ایمیل */}
          <Input
            element="input"
            id="password"
            className="border border-black w-2/3 px-5 py-2 rounded mt-2"
            type="password"
            placeholder="گذرواژه"
            onInputHandler={onInputHandler}
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(18),
            ]}
          />
          <div className="rule-input flex gap-3 justify-self-start">
            <input type="checkbox" />
            <p className="text-black">
              با{" "}
              <Link to="/" className="text-red-500">
                قوانین سقفینو
              </Link>{" "}
              موافق هستم
            </p>
          </div>
        </div>
        <div className="botton-register-modal mb-5 flex flex-col items-center">
          <button
            onClick={handleRegister}
            className="register-btn w-2/3 bg-red-500 mb-2 py-2 px-5 rounded text-white"
            disabled={!isFormValid || usernameError || emailError} // غیرفعال کردن دکمه اگر فرم معتبر نباشد یا خطایی وجود داشته باشد
          >
            ثبت‌نام
          </button>
          <Link
            to="/login"
            className="register-btn w-2/3 bg-gray-100 py-2 px-5 rounded text-center"
          >
            ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
