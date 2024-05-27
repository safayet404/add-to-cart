"use client";
import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const ProductDesign = ({
  layout,
  setAllProducts,
  currentProducts,
  setCarts,
  carts,
}) => {
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
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
        <input key={i}
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

  const HandleCarts =(product)=>{
    setCarts([...carts, product])
    localStorage.setItem("carts", JSON.stringify([...carts,product ]));
  }

  useEffect(() => {
    const savedCarts = JSON.parse(localStorage.getItem("carts")) || [];
    setCarts(savedCarts);
  }, []);


  return (
    <div className="col-span-3">
      <div
        className={` ${
          layout === "grid" ? "grid grid-cols-2 lg:grid-cols-3" : "flex flex-col w-full"
        } gap-3 justify-between`}
      >
        {currentProducts?.map((product) => (
          <div key={product.id}
            className={` ${
              layout === "grid" ? "card" : "grid grid-cols-8 "
            }   border rounded-md`}
          >
            <figure className={`bg-white p-5 w-full ${layout==='list' && 'col-span-3'}`}>
              {" "}
              <Image
                width={200}
                height={200}
                className={` ${
                  layout === "grid"
                    ? "h-[180px] w-[236px]"
                    : " h-[161px]"
                }  rounded-lg rounded-b-none mx-auto`}
                src={product.image}
                alt="card navigate ui"
              />
            </figure>
            <div className={`card-body bg-[#F7F8F8] justify-between p-5 ${
                  layout === "grid"
                    ? ""
                    : "col-span-5"} `}>
              <h2 className="card-title font-normal inter-font text-bg">
                {splitTitle(product.title, 36)}
              </h2>
              <div className="mt-3">
                <div className="rating rating-sm">
                  {calRating(product.rating.rate)}
                </div>
                <h1 className="text-[#ADB0B7] mt-1 font-normal text-sm inter-font">
                  ({product.rating.count} Review)
                </h1> 
                <div className="card-actions  justify-between  item-start sm:items-center mt-2 flex-col sm:flex-row flex-nowrap">
                  <h1 className="font-bold text-[#F2415A] inter-font text-lg">
                    ${product.price}
                  </h1>
                  <button
                    onClick={() => HandleCarts(product)}
                    className="btn bg-black py-[6px] px-3 font-normal text-white text-base h-fit"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDesign;
