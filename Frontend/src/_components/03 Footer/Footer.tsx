import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-5 flex flex-col items-center justify-center gap-16 px-10 md:flex-row max-w-[900px] mx-auto mt-20">
        <div className="flex flex-col gap-5 items-center justify-center md:w-[30%]">
          <h1 className="text-2xl font-bold">Subscribe Via Email</h1>
          <hr className="border-[2px] w-10 border-black" />
          <div className=" flex gap-1 text-2xl">
            <BsFacebook className="hover:text-blue-600 cursor-pointer transition-all ease-in-out duration-200" />
            <FaPinterest className="hover:text-red-600 cursor-pointer transition-all ease-in-out duration-200" />
            <FaTwitter className="hover:text-blue-500 cursor-pointer transition-all ease-in-out duration-200" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all ease-in-out duration-200" />
          </div>
        </div>
        <form className="w-full flex flex-col gap-3 md:w-[70%]">
          <p>Enter your email here *</p>
          <input
            type="email"
            placeholder="Email"
            className="border border-black py-2 w-full px-3"
          />
          <div className="flex items-center gap-2">
            <input className="w-5 h-5" type="checkbox" />
            <p>Yes, subscribe me to your newsletter.</p>
          </div>
          <button className="w-full py-2 bg-black text-white">
            Subscribe Now
          </button>
        </form>
      </footer>
    </>
  );
};

export default Footer;
