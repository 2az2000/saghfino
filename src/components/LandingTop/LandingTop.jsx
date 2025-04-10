import React, { useRef, useState, useEffect, useCallback } from "react";
import "./landingTop.css";
import { useSearch } from "../../context/SearchContext";

export default function LandingTop({ children }) {
  // استفاده از SearchContext
  const { searchType, searchQuery, selectedCity, updateSearch } = useSearch();

  // State for managing text animation
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [citys, setCitys] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3004/realEstate")
      .then((result) => result.json())
      .then((data) => {
        // //* حذف تکرارها با استفاده از Set
        // const uniqueCities = [...new Set(cities)];
        // console.log(uniqueCities);

        // حذف تکرارها با استفاده از filter و indexOf
        const cities = data.map((item) => item.city);
        const uniqueCities = cities.filter(
          (city, index) => cities.indexOf(city) === index
        );
        setCitys(uniqueCities);
        setFilteredCities(uniqueCities);
      });
  }, []);

  // یک ref برای input فعال
  const activeInputRef = useRef(null);
  // یک ref برای dropdown
  const dropdownRef = useRef(null);

  // Array of texts to display
  const texts = [
    "سقفینو؛ سقفی برای همه",
    "سقفینو؛ سقفی برای تو",
    "سقفینو؛ همراه شما در خانه‌دار شدن",
    "سقفینو؛ مشاور املاک آنلاین شما",
  ];

  // Typing speed configuration
  const typingConfig = {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    initialDelay: 500,
  };

  const handleTyping = useCallback(() => {
    const currentText = texts[currentIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          setFadeClass("fade-in");
        }, typingConfig.typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setFadeClass("fade-out");
        }, typingConfig.pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          setFadeClass("fade-out");
        }, typingConfig.deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setFadeClass("fade-in");
        }, typingConfig.initialDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts]);

  useEffect(() => {
    const cleanup = handleTyping();
    return cleanup;
  }, [handleTyping]);

  // تابع تغییر نوع جستجو
  const handleSearchTypeChange = (type) => {
    updateSearch(type, localSearchQuery, selectedCity);
    setSelectedIndex(0);
  };

  // تابع فیلتر شهرها
  const handleSearch = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setShowDropdown(query.length > 0);
    setSelectedIndex(0);

    const filtered = citys.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // تابع انتخاب شهر
  const handleCitySelect = (city) => {
    setLocalSearchQuery(city);
    setShowDropdown(false);
    updateSearch(searchType, city, city);
  };

  // تابع اسکرول به آیتم انتخاب شده
  const scrollToSelectedItem = (index) => {
    if (dropdownRef.current) {
      const items = dropdownRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  };

  // تابع مدیریت کلیدهای کیبورد
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!localSearchQuery.trim()) {
        // اگر input خالی است، حالت فیلتر نشده را نمایش می‌دهیم
        updateSearch(searchType, "", "");
        setShowDropdown(false);
        return;
      }

      if (showDropdown && filteredCities.length > 0) {
        // اگر dropdown باز است و آیتمی انتخاب شده، آن را انتخاب می‌کنیم
        if (filteredCities[selectedIndex]) {
          handleCitySelect(filteredCities[selectedIndex]);
        }
      }
      return;
    }

    if (!showDropdown || filteredCities.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev < filteredCities.length - 1 ? prev + 1 : 0;
          scrollToSelectedItem(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : filteredCities.length - 1;
          scrollToSelectedItem(newIndex);
          return newIndex;
        });
        break;
      case "Escape":
        e.preventDefault();
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  // اضافه کردن useEffect برای مدیریت نمایش dropdown
  useEffect(() => {
    if (!localSearchQuery.trim()) {
      setShowDropdown(false);
      setSelectedIndex(0);
    }
  }, [localSearchQuery]);

  // استفاده از useEffect برای فوکوس بعد از تغییر searchType
  useEffect(() => {
    activeInputRef.current?.focus();
  }, [searchType]);

  return (
    <div className="landing-main w-full">
      {children}
      <div className="landing-content">
        <div className="typewriter-container">
          <h1
            className={`typewriter-text inline-block relative ${fadeClass}`}
            dir="rtl"
          >
            {displayText}
            <span className={`cursor ${!isDeleting ? "blink" : ""}`}>|</span>
          </h1>
        </div>
        <h2 className="text-center text-white" dir="rtl">
          آسانی و سرعت در پیدا کردن یک سقف تازه را در سقفینو تجربه کنید
        </h2>

        <div className="landing-search-box mt-3">
          <div
            className={`loan transition-all relative ${
              searchType === "rent" ? "active" : ""
            }`}
            onClick={() => handleSearchTypeChange("rent")}
          >
            <h3 className="text-center cursor-pointer transition-colors hover:text-blue-600">
              اجاره
            </h3>
            <input
              type="text"
              ref={searchType === "rent" ? activeInputRef : null}
              className="w-full mt-2 p-2 border-b-2 border-transparent focus:outline-none focus:border-blue-500 transition-all"
              placeholder="شهر مورد نظر را جست‌وجو کنید"
              value={searchType === "rent" ? localSearchQuery : ""}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              dir="rtl"
              onClick={(e) => {
                e.stopPropagation();
                handleSearchTypeChange("rent");
                setShowDropdown(localSearchQuery.length > 0);
              }}
            />
            {showDropdown &&
              searchType === "rent" &&
              filteredCities.length > 0 &&
              localSearchQuery.trim() && (
                <div
                  ref={dropdownRef}
                  className="absolute w-full bg-white shadow-lg rounded-b-lg mt-1 max-h-60 overflow-y-auto z-50 scrollbar-hide"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className={`p-2 hover:bg-gray-100 cursor-pointer text-right ${
                        index === selectedIndex ? "bg-gray-100" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCitySelect(city);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
          </div>
          <div
            className={`buy transition-all relative ${
              searchType === "buy" ? "active" : ""
            }`}
            onClick={() => handleSearchTypeChange("buy")}
          >
            <h3 className="text-center cursor-pointer transition-colors hover:text-blue-600">
              خرید
            </h3>
            <input
              type="text"
              ref={searchType === "buy" ? activeInputRef : null}
              className="w-full mt-2 p-2 border-b-2 border-transparent focus:outline-none focus:border-blue-500 transition-all"
              placeholder="شهر مورد نظر را جست‌وجو کنید"
              value={searchType === "buy" ? localSearchQuery : ""}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              dir="rtl"
              onClick={(e) => {
                e.stopPropagation();
                handleSearchTypeChange("buy");
                setShowDropdown(localSearchQuery.length > 0);
              }}
            />
            {showDropdown &&
              searchType === "buy" &&
              filteredCities.length > 0 &&
              localSearchQuery.trim() && (
                <div
                  ref={dropdownRef}
                  className="absolute w-full bg-white shadow-lg rounded-b-lg mt-1 max-h-60 overflow-y-auto z-50 scrollbar-hide"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className={`p-2 hover:bg-gray-100 cursor-pointer text-right ${
                        index === selectedIndex ? "bg-gray-100" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCitySelect(city);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
