import React, { useRef, useState, useEffect, useContext } from "react";
import "./header.css";
import MobileItems from "./MobileItems";
import MobileMenu from "./MobileMenu";
import Login from "../Login/Login";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


export default function Header({className}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [userData, setUserData] = useState();
  const header = useRef(null);

  const authContext = useContext(AuthContext);
  // console.log(authContext);

  const navigate = useNavigate();
  const menuItems = [
    {
      name: "اجاره",
      path: "/rentPage",
    },
    {
      name: "خرید",
      path: "/",
    },
    {
      name: "املاک و مستغلات",
      path: "/",
    },
    {
      name: "مشاورین املاک",
      path: "/",
    },
    {
      name: "اخبار روز",
      path: "/",
    },

  ];

  useEffect(() => {
    if (localStorage.getItem("userInfos")) {
      const mydata = JSON.parse(localStorage.getItem("userInfos"));
      setUserData(mydata[0].name);
    }
    // else {
    //   return null
    // }
  }, [authContext.login, authContext.logout]);

  // افزودن Event Listener برای اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        header.current.classList.toggle("sticky1", window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // حذف Event Listener در cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <MobileMenu onClose={setIsMobile} isMobile={isMobile} />
      <div
        ref={header}
        className={`header w-5/6 h-24 flex justify-between items-center bg-white rounded-2xl z-10 px-6 ${className}`}
      >
        <img
          className="ham-menu"
          onClick={() => setIsMobile(true)}
          src="src/assets/images/hamberger-menu.png"
          alt=""
        />
        <div className="header-logo-nav flex items-center gap-16">
          <div className="header-logo">
            <img src="src/assets/images/Logo-1.png" alt="" />
          </div>
          <div className="header-navbar hidden lg:block">
            <ul className="flex gap-3 lg:gap-8">
              {menuItems.map((item) => (
                <Link
                  to={item.path}
                  key={item}
                  className="text-[--Neutral-gray10] hover:text-[--perimary-color] transition-all duration-300 cursor-pointer text-base lg:text-lg font-shabnam relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[--perimary-color-tint3] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="header-btns flex items-center gap-4 lg:gap-6">
          {authContext.isLoggedIn ? (
            <>
              <button
                onClick={() => setIsLoginModal(true)}
                className="px-4 py-2 text-[--Neutral-gray10] hover:text-[--perimary-color] transition-all duration-300 font-shabnam relative group"
              >
                <span>{authContext.currentUser.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[--perimary-color-tint3] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </button>
              <button
                onClick={authContext.logout}
                className="px-4 py-2 text-[--State--error] hover:text-[--State--ELight-1] transition-all duration-300 font-shabnam relative group"
              >
                <span>خروج</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[--State--ELight-2] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModal(true)}
              className="px-4 py-2 text-[--Neutral-gray10] hover:text-[--perimary-color] transition-all duration-300 font-shabnam relative group"
            >
              <span>ورود</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[--perimary-color-tint3] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </button>
          )}
          <button className="bg-[--perimary-color] hover:bg-[--perimary-color-shade2] text-white px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[--perimary-color-tint3] active:scale-95 font-shabnam">
            ثبت آگهی
          </button>
        </div>
      </div>
      {isLoginModal && <Login onClose={() => setIsLoginModal(false)} />}
    </>
  );
}
