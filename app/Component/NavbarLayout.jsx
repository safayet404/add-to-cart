"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Group 37623.png";
import bar from "../../public/Vector.png";

const NavbarLayout = () => {
  const [pathname, setPathname] = useState("/"); 

  const handleLinkClick = (path) => {
    setPathname(path);
  };

  // console.log(pathname);
  return (
    <div className="bg-[#212529] text-white inter-font py-1">
      <div className="navbar px-5 mx-auto">
        <div className="navbar-start">
          <Image src={logo} alt="logo" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-white flex gap-6 menu-horizontal px-1 tracking-widest font-semibold uppercase text-[12px]">
            <li className="text-white">
              <Link href="/" onClick={() => handleLinkClick("/")}>
                Products
                {pathname === "/" && (
                  <div className="mt-2 w-5 h-[2px] bg-white rounded-full"></div>
                )}
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => handleLinkClick("/cart")}>
                Carts
                {pathname === "/cart" && (
                  <div className="mt-2 w-5 h-[2px] bg-white rounded-full"></div>
                )}
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="h-[42px] w-[104px] lg:flex justify-center items-center text-sm font-semibold tracking-widest hover:border-[#525CEB] hover:border hover:bg-white hover:text-[#525CEB] transition-all ease-in-out duration-300 rounded bg-[#525CEB] border-[#525CEB] outline-none text-white uppercase hidden">
            Login
          </a>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Image src={bar} alt="menu-bar" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow -translate-x-44 w-60 rounded bg-[#212529] tracking-widest font-semibold uppercase text-[12px] justify-center items-center"
            >
              <li className="py-1">
                <Link href="/" onClick={() => handleLinkClick("/")}>
                  Products
                  
                </Link>
              </li>
              <li className="py-1">
                <Link href="/cart" onClick={() => handleLinkClick("/cart")}>
                  Carts
                  
                </Link>
              </li>
              <li className="w-full">
                <a className="h-[42px] flex justify-center items-center text-sm font-semibold tracking-widest hover:border-[#525CEB] hover:border hover:bg-white hover:text-[#525CEB] transition-all ease-in-out duration-300 rounded bg-[#525CEB] border-[#525CEB] outline-none text-white uppercase w-full">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarLayout;
