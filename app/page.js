"use client";
import Pagination from "./Component/Pagination";
import ProductDesign from "./Component/ProductDesign";
import ProductLayout from "./Component/ProductLayout";
import SideCart from "./Component/SideCart";
import { useState } from "react";


export default function Home() {
  const [layout, setLayout] = useState("grid");
  const [allProduct, setAllProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(allProduct.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log(carts);

  return (
    <main className=" mx-auto px-5 py-16">
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 ">
          <div className="col-span-3">
            <div className="flex gap-5 justify-between  items-center">
              <strong className="font-sans font-semibold text-4xl">
                Our All Products
              </strong>
              <ProductLayout layout={layout} setLayout={setLayout} />
            </div>
            <label className="input input-bordered flex items-center gap-2 rounded-full mt-5 border-[#49525A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-6 h-6 text-[#212529] "
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Search An Item"
              />
            </label>
          </div>
        </div>
        <div className="grid-cols-2 lg:grid-cols-4  xl:grid-cols-5 grid gap-5 justify-between  mt-20">
          <ProductDesign
            layout={layout}
            currentProducts={currentProducts}
            setAllProducts={setAllProducts}
            setCarts={setCarts}
            carts={carts}
          />
          <SideCart carts={carts}/>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
