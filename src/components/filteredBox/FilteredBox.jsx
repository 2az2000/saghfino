import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

export default function FilteredBox() {
  return (
    <div className="w-full flex flex-col gap-4 bg-white mt-16 px-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 py-4 px-3 lg:px-6">
        <div className="filter-options w-full lg:w-3/5 flex flex-wrap lg:flex-nowrap items-center gap-2">
          <select className="filter-option w-[calc(50%-0.5rem)] lg:w-[120px] cursor-pointer px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 outline-none text-right pr-8 appearance-none bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50">
            <option value="" disabled selected>
              منطقه
            </option>
            <option value="tehranpars">تهرانپارس</option>
            <option value="narmak">نارمک</option>
            <option value="resalat">رسالت</option>
          </select>

          <select className="filter-option w-[calc(50%-0.5rem)] lg:w-[120px] cursor-pointer px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 outline-none text-right pr-8 appearance-none bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50">
            <option value="" disabled selected>
              قیمت
            </option>
            <option value="0-500">0 تا 500 میلیون</option>
            <option value="500-1000">500 تا 1000 میلیون</option>
            <option value="1000+">بالای 1000 میلیون</option>
          </select>

          <select className="filter-option w-[calc(50%-0.5rem)] lg:w-[120px] cursor-pointer px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 outline-none text-right pr-8 appearance-none bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50">
            <option value="" disabled selected>
              نوع ملک
            </option>
            <option value="apartment">آپارتمان</option>
            <option value="villa">ویلا</option>
            <option value="store">مغازه</option>
          </select>

          <select className="filter-option w-[calc(50%-0.5rem)] lg:w-[120px] cursor-pointer px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 outline-none text-right pr-8 appearance-none bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50">
            <option value="" disabled selected>
              متراژ
            </option>
            <option value="0-50">0 تا 50 متر</option>
            <option value="50-100">50 تا 100 متر</option>
            <option value="100+">بالای 100 متر</option>
          </select>

          <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-2 lg:px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-gray-600 text-sm transition-all duration-200 hover:bg-gray-50 whitespace-nowrap">
            <IoFilterSharp className="text-gray-500 text-lg" />
            <span>فیلترهای بیشتر</span>
          </button>
        </div>

        <div className="relative w-full lg:w-2/5">
          <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="شهر مورد نظر را وارد کنید"
            className="w-full py-2.5 pr-12 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-500 outline-none text-sm text-gray-600 placeholder-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      <style jsx>{`
        .filter-option {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
          background-position: left 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }

        .filter-option option {
          padding: 8px;
          background-color: white;
        }

        @media (max-width: 1024px) {
          .filter-options {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
