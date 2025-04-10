import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FilteredBox from "../../components/filteredBox/FilteredBox";
import RealEstatePage from "../../components/RealEstatePage/RealEstatePage";
import Pagination from "../../components/Pagination/Pagination";

export default function RentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleTotalPagesChange = (pages) => {
    setTotalPages(pages);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <Header className={"m-auto mt-10 bg-[--Neutral-gray3]"} />
      </div>
      <FilteredBox />
      <RealEstatePage
        currentPage={currentPage}
        onTotalPagesChange={handleTotalPagesChange}
      />
      <div className="w-full flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <Footer />
    </>
  );
}
