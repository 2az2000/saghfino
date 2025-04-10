import React, { useState } from "react";

const TextAccessExample = () => {
  const [selectedText, setSelectedText] = useState("");

  // دسترسی به متن با textContent
  const handleTextContent = (e) => {
    // متن مستقیم المان
    const directText = e.target.textContent;
    // متن اولین child
    const firstChildText = e.target.firstElementChild?.textContent;
    // متن آخرین child
    const lastChildText = e.target.lastElementChild?.textContent;

    console.log("Direct Text:", directText);
    console.log("First Child Text:", firstChildText);
    console.log("Last Child Text:", lastChildText);
  };

  // دسترسی به متن با innerText
  const handleInnerText = (e) => {
    // متن قابل مشاهده
    const visibleText = e.target.innerText;
    console.log("Visible Text:", visibleText);
  };

  // دسترسی به متن با innerHTML
  const handleInnerHTML = (e) => {
    // متن با HTML
    const htmlContent = e.target.innerHTML;
    console.log("HTML Content:", htmlContent);
  };

  // دسترسی به متن با value (برای input ها)
  const handleInputValue = (e) => {
    const inputValue = e.target.value;
    console.log("Input Value:", inputValue);
  };

  // دسترسی به متن با dataset
  const handleDataAttribute = (e) => {
    const dataText = e.target.dataset.text;
    console.log("Data Text:", dataText);
  };

  return (
    <div className="p-4 space-y-4">
      {/* مثال textContent */}
      <div
        onClick={handleTextContent}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>متن اول</span>
        <span>متن دوم</span>
        <span>متن سوم</span>
      </div>

      {/* مثال innerText */}
      <div
        onClick={handleInnerText}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>متن قابل مشاهده</span>
        <span style={{ display: "none" }}>متن مخفی</span>
      </div>

      {/* مثال innerHTML */}
      <div
        onClick={handleInnerHTML}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>
          متن با <strong>HTML</strong>
        </span>
      </div>

      {/* مثال value برای input */}
      <input
        type="text"
        onChange={handleInputValue}
        className="w-full p-2 border rounded-md"
        placeholder="متن را وارد کنید"
      />

      {/* مثال data attribute */}
      <div
        onClick={handleDataAttribute}
        data-text="متن در data attribute"
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        کلیک کنید تا متن data attribute را ببینید
      </div>

      {/* نمایش نتیجه انتخاب */}
      {selectedText && (
        <div className="mt-4 p-2 bg-blue-100 rounded">
          متن انتخاب شده: {selectedText}
        </div>
      )}
    </div>
  );
};

export default TextAccessExample;
