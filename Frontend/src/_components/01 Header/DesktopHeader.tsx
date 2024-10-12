import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const DeskTopHeader: React.FC = () => {
  return (
    <>
      <header className="hidden md:flex w-full h-[60px] px-7 items-center justify-center">
        <div className="w-full flex items-center justify-between max-w-[900px]">
          <ul className="flex gap-3">
            <a href="/">HOME</a>
            <a href="/blog">BLOG</a>
            <a href="/about">ABOUT</a>
          </ul>
          <div className=" flex gap-1 text-2xl">
            <BsFacebook className="hover:text-blue-600 cursor-pointer transition-all ease-in-out duration-200" />
            <FaPinterest className="hover:text-red-600 cursor-pointer transition-all ease-in-out duration-200" />
            <FaTwitter className="hover:text-blue-500 cursor-pointer transition-all ease-in-out duration-200" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all ease-in-out duration-200" />
          </div>
        </div>
      </header>
    </>
  );
};

export default DeskTopHeader;
