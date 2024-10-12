import React from "react";
import HeroSection from "../02 Main/HeroSection/HeroSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const About: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Your form has been submitted");
    setTimeout(() => {
      location.reload();
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <HeroSection />
      <section className="w-full py-10 px-5 max-w-[900px] mx-auto">
        <h1 className="text-xl font-semibold text-center">ABOUT</h1>
        <div className="w-full flex flex-col mt-5 md:mt-12 gap-16 md:flex-row">
          <div className="flex flex-col gap-5 md:w-[50%]">
            <h1 className="text-2xl font-semibold">About Me</h1>
            <hr className="border-2 w-[50px] border-black" />
            <div>
              <h1>Yaseen J</h1>
              <p>Blogger, Journalist, Taste-maker</p>
            </div>
            <img src="https://static.wixstatic.com/media/5a6a58201a2e97b6b7c39b880738af97.jpg/v1/fill/w_280,h_205,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5a6a58201a2e97b6b7c39b880738af97.jpg" />
            <p>
              Sofie H. Blogger, Journalist, Taste-maker I'm a paragraph. Click
              here to add your own text and edit me. It’s easy. Just click “Edit
              Text” or double click me to add your own content and make changes
              to the font. Feel free to drag and drop me anywhere you like on
              your page. I’m a great place for you to tell a story and let your
              users know a little more about you.
            </p>
          </div>
          <div className="flex flex-col gap-5 md:w-[50%]">
            <h1 className="text-2xl font-semibold">CONTACT ME</h1>
            <hr className="border-2 border-black w-[50px]" />
            <p className="text-gray-700">example@gmail.com</p>
            <p className="text-gray-700">123,456,7890</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  placeholder="First name"
                  type="text"
                  className="w-full outline-none border p-2 mt-2 focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  placeholder="First name"
                  type="text"
                  className="w-full outline-none border p-2 mt-2 focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  placeholder="First name"
                  type="text"
                  className="w-full outline-none border p-2 mt-2 focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="Message">Message *</label>
                <textarea
                  id="Message"
                  placeholder="First name"
                  rows={7}
                  className="w-full outline-none border p-2 mt-2 focus:border-black"
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-3 bg-black text-white font-semibold border border-transparent hover:border-black hover:bg-transparent hover:text-black transition-all ease-in-out duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
