import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram, FaPinterest, FaSearch } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";

interface PostsData {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  date: Date;
}

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [showList, setShowList] = useState<boolean>(false);

  const [border, setBorder] = useState<boolean>(false);

  const [data, setData] = useState<PostsData[]>([]);

  const [userInput, setUserInput] = useState<string>("");

  const [available, setAvailable] = useState(false);

  const navigateTo = useNavigate();

  async function handleSearch(query: string) {
    setUserInput(query);
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/search/searchPost?query=${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    if (result.length === 0) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
    setData(result);
  }

  function truncateText(
    text: string,
    maxLength: number,
    appendEllipsis = true
  ) {
    if (text.length <= maxLength) {
      return text;
    }

    return appendEllipsis
      ? text.slice(0, maxLength) + "..."
      : text.slice(0, maxLength);
  }

  const extractTextFromHTML = (html: any): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
  };

  return (
    <>
      <header className="w-full h-[60px] flex items-center justify-between px-5 py-3 md:hidden mb-10">
        <div className=" flex gap-1 text-lg">
          <BsFacebook className="hover:text-blue-600 cursor-pointer transition-all ease-in-out duration-200" />
          <FaPinterest className="hover:text-red-600 cursor-pointer transition-all ease-in-out duration-200" />
          <FaTwitter className="hover:text-blue-500 cursor-pointer transition-all ease-in-out duration-200" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all ease-in-out duration-200" />
        </div>
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </header>
      <section
        className={`w-full h-screen bg-white z-10 fixed top-0 left-0 flex flex-col items-center justify-center px-5 gap-14 ${
          isOpen ? "translate-x-0 opacity-1" : "translate-x-full opacity-0"
        } transition-all ease-in-out duration-500 md:hidden`}
      >
        <div className="w-[95%] max-w-[700px] relative">
          <form
            className={`flex w-full border-black ${
              border ? "border-2" : "border"
            }`}
          >
            <input
              value={userInput}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => {
                setBorder(true);
                setShowList(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowList(false);
                  setBorder(false);
                }, 100);
              }}
              type="text"
              placeholder="Search..."
              className="flex-1 py-1 px-3 outline-none"
            />
            <FaSearch className="bg-black text-white w-12 h-10 p-2 cursor-pointer" />
          </form>
          <div
            className={`w-full bg-white border absolute border-black p-3 flex-col gap-3 ${
              showList ? "flex" : "hidden"
            }`}
          >
            <h1 className="mb-2 font-semi text-gray-800">Blog Posts</h1>

            {userInput.length === 0 ? (
              <p>Please search for post</p>
            ) : !available ? (
              <p>No search result found</p>
            ) : data.length > 0 ? (
              data.map((item) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        navigateTo(`/blog/${item._id}`);
                        setShowList(false);
                        setUserInput("");
                      }}
                      className="flex hover:bg-gray-100 cursor-pointer w-full gap-2 items-center justify-start"
                    >
                      <img src={item.image} className="w-[68px] h-16" />
                      <div>
                        <h1 className="font-bold leading-5 mb-1">
                          {truncateText(item.title, 35)}
                        </h1>
                        <p className="text-sm leading-4 text-gray-700">
                          {item.content
                            ? truncateText(
                                extractTextFromHTML(item.content),
                                80
                              )
                            : "No content available"}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="text-center">Please search for post</p>
            )}
          </div>
        </div>
        <ul className="flex flex-col gap-7 text-center">
          <a href="/" className="text-lg cursor-pointer">
            HOME
          </a>
          <a href="/blog" className="text-lg cursor-pointer">
            BLOG
          </a>
          <a href="/about" className="text-lg cursor-pointer">
            ABOUT
          </a>
        </ul>
        <div className=" flex gap-1 text-lg">
          <BsFacebook className="hover:text-blue-600 cursor-pointer transition-all ease-in-out duration-200" />
          <FaPinterest className="hover:text-red-600 cursor-pointer transition-all ease-in-out duration-200" />
          <FaTwitter className="hover:text-blue-500 cursor-pointer transition-all ease-in-out duration-200" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all ease-in-out duration-200" />
        </div>
        <RxCross1
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-2xl cursor-pointer"
        />
      </section>
    </>
  );
};

export default MobileHeader;
