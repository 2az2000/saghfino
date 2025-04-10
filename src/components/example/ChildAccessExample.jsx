import React, { useState } from "react";

const ChildAccessExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // دسترسی به child مستقیم
  const handleDirectChild = (e) => {
    // دسترسی به اولین child
    const firstChild = e.target.firstElementChild;
    // دسترسی به آخرین child
    const lastChild = e.target.lastElementChild;
    // دسترسی به تمام children
    const allChildren = e.target.children;

    console.log("First Child:", firstChild?.textContent);
    console.log("Last Child:", lastChild?.textContent);
    console.log(
      "All Children:",
      Array.from(allChildren).map((child) => child.textContent)
    );
  };

  // دسترسی به child با کلاس خاص
  const handleClassChild = (e) => {
    // پیدا کردن child با کلاس خاص
    const childWithClass = e.target.querySelector(".special-child");
    console.log("Child with class:", childWithClass?.textContent);
  };

  // دسترسی به child با id خاص
  const handleIdChild = (e) => {
    // پیدا کردن child با id خاص
    const childWithId = e.target.querySelector("#specific-child");
    console.log("Child with ID:", childWithId?.textContent);
  };

  // دسترسی به parent
  const handleParent = (e) => {
    // دسترسی به parent مستقیم
    const parent = e.target.parentElement;
    // دسترسی به parent با کلاس خاص
    const parentWithClass = e.target.closest(".parent-class");

    console.log("Parent:", parent?.textContent);
    console.log("Parent with class:", parentWithClass?.textContent);
  };

  // دسترسی به sibling ها
  const handleSiblings = (e) => {
    // دسترسی به sibling قبلی
    const previousSibling = e.target.previousElementSibling;
    // دسترسی به sibling بعدی
    const nextSibling = e.target.nextElementSibling;

    console.log("Previous Sibling:", previousSibling?.textContent);
    console.log("Next Sibling:", nextSibling?.textContent);
  };

  return (
    <div className="p-4 space-y-4">
      {/* مثال دسترسی به child مستقیم */}
      <div
        onClick={handleDirectChild}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
      </div>

      {/* مثال دسترسی به child با کلاس */}
      <div
        onClick={handleClassChild}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>Normal Child</span>
        <span className="special-child">Special Child</span>
      </div>

      {/* مثال دسترسی به child با id */}
      <div
        onClick={handleIdChild}
        className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>Regular Child</span>
        <span id="specific-child">Specific Child</span>
      </div>

      {/* مثال دسترسی به parent */}
      <div className="parent-class p-4 border rounded-md">
        <div
          onClick={handleParent}
          className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        >
          Click to get parent
        </div>
      </div>

      {/* مثال دسترسی به sibling ها */}
      <div className="p-4 border rounded-md">
        <span
          onClick={handleSiblings}
          className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        >
          Click me
        </span>
        <span className="ml-2">Next Sibling</span>
      </div>

      {/* نمایش نتیجه انتخاب */}
      {selectedItem && (
        <div className="mt-4 p-2 bg-blue-100 rounded">
          Selected: {selectedItem}
        </div>
      )}
    </div>
  );
};

export default ChildAccessExample;
