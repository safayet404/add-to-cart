"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Page = () => {
  const [showProducts, setShowProducts] = useState([]);

  useEffect(() => {
    const savedCarts = JSON.parse(localStorage.getItem("carts")) || [];
    setShowProducts(savedCarts);
  }, []);

  const splitTitle = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + " ...";
  };

  const calRating = (rate) => {
    const filledStars = Math.round(rate);
    const maxRating = 5;
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-7"
          className={`mask mask-star-2 ${
            i < filledStars ? "bg-orange-400" : "bg-gray-400"
          }`}
        />
      );
    }

    return stars;
  };

  const totalPrice = showProducts
    ?.reduce((total, product) => total + product.price, 0)
    .toFixed(2);

  return (
    <div className="px-5">
      <div className="max-w-xl mx-auto border rounded-md p-2 my-12 h-fit border-gray-600">
        <button className="w-full btn uppercase tracking-widest inter-font bg-black py-[6px] px-3 text-white text-xs font-bold">
          Selected Products
        </button>

        <div className="my-5 flex flex-col gap-5">
          {showProducts?.length > 0 &&
            showProducts?.map((product) => (
              <div
                key={product.id}
                className="card card-side border rounded-md bg-[#F7F8F8] items-center grid grid-cols-3"
              >
                <figure className="bg-white p-3 h-full">
                  <Image
                    width={200}
                    height={200}
                    className={`flex justify-center items-center h-[100px] w-full rounded-lg rounded-b-none`}
                    src={product.image}
                    alt="card navigate ui"
                  />
                </figure>
                <div className="card-body py-3 px-4 col-span-2">
                  <h2 className="card-title font-normal inter-font text-bg">
                    {splitTitle(product.title, 36)}
                  </h2>
                  <div className="flex justify-between gap-2 xl:gap-5 items-start">
                    <div className="card-actions flex-col gap-0 ">
                      <div className="rating rating-sm">
                        {calRating(product.rating.rate)}
                      </div>
                      <h1 className="text-[#ADB0B7] mt-1 font-normal text-sm inter-font">
                        ({product.rating.count} Review)
                      </h1>
                      <h1 className="font-bold text-[#F2415A] inter-font text-lg mt-3">
                        ${product.price}
                      </h1>
                    </div>
                    <button className="bg-transparent text-[#F2415A] border-0 font-normal p-0 text-2xl">
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h1 className="tracking-widest text-sm inter-font font-bold text-center ">
          Total: ${totalPrice}
        </h1>
        <div className="flex gap-5 items-center justify-start mt-6">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs rounded-none "
          />
          <h1 className="tracking-widest text-xs ">
            I&apos;ve read and agree to the{" "}
            <span className="underline">terms and conditions</span>,
            <span className="underline">refund policy</span> &{" "}
            <span className="underline">privacy policy</span>
          </h1>
        </div>
        <div className="flex justify-center">
          <button className="mt-5 btn uppercase tracking-widest inter-font bg-black py-[6px] px-3 text-white text-xs font-bold">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
