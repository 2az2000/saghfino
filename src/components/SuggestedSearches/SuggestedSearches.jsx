import React from 'react'

export default function SuggestedSearches() {
    const suggestedSearches = [
        "نارمک",
        "دروس",
        "پونک",
        "ولنجک",
        "فرمانیه",
        "نیاوران",
        "امانیه",
        "الهیه",
        "قیطریه",
        "دولت",
        "قلهک",
        "ظفر",
    ]
  return (
    <div className='w-full px-4 lg:px-32 pb-5 mt-12'>
        <h1 className='text-start text-2xl font-bold'>جست‌وجوهای پیشنهادی</h1>
        <div className='flex flex-wrap gap-4 mt-7 justify-center'>
            {suggestedSearches.map((search) => (
                <div className='w-48  bg-gray-200 p-2 rounded-md text-2xl font-medium cursor-pointer text-center' key={search}>املاک در{" "} {search}</div>
            ))}
        </div>
    </div>
  )
}
