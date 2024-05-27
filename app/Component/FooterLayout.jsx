import React from "react";
import logo from "../../public/Group 37623.png";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const FooterLayout = () => {
  return (
    <footer className="bg-[#212529] text-white  footer py-10 px-5 inter-font grid grid-cols-2 lg:grid-cols-5 gap-10 justify-between">
      <aside className="lg:col-span-2">
        <Image src={logo} alt="logo" />
        <div className="mt-4 flex flex-col gap-2">
          <p>Got Question? Call us 24/7</p>
          <h1 className="font-bold text-lg">+02 055 4156 </h1>
          <p>Register now & get you 10% offer from first order! </p>
          <h1 className=" text-xl poppins-medium ">Join US</h1>
          <div className="flex gap-8 mt-2 ">
            <FaFacebookF className="text-2xl text-white" />
            <FaTwitter className="text-2xl text-white" />
            <FaLinkedinIn className="text-2xl text-white" />
            <FaInstagram className="text-2xl text-white" />
          </div>
        </div>
      </aside>

      <nav className="flex flex-col gap-4">
        <h6 className=" font-bold text-xl text-white inter-font mb-4">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Career</a>
        <a className="link link-hover">Contact us</a>
        <a className="link link-hover">Start Selling</a>
        <a className="link link-hover">Order History</a>
      </nav>
      <nav className="flex flex-col gap-4">
        <h6 className=" font-bold text-xl text-white inter-font mb-4">My Account</h6>
        <a className="link link-hover">Track My Order</a>
        <a className="link link-hover">View Cart</a>
        <a className="link link-hover">Sign In</a>
        <a className="link link-hover">Help</a>
        <a className="link link-hover">Wishlist</a>
      </nav>
      <nav className="flex flex-col gap-4">
        <h6 className=" font-bold text-xl text-white inter-font mb-4">Customer Service</h6>
        <a className="link link-hover">Payment Methods</a>
        <a className="link link-hover">Money Return Policy</a>
        <a className="link link-hover">Product Return</a>
        <a className="link link-hover">Contact Seller</a>
        <a className="link link-hover">Terms & Conditions</a>
      </nav>
    </footer>
  );
};

export default FooterLayout;
