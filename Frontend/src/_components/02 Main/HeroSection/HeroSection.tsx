import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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

const HeroSection = () => {
  const [showList, setShowList] = useState<boolean>(false);

  const [border, setBorder] = useState<boolean>(false);

  const [available, setAvailable] = useState(false);

  const [data, setData] = useState<PostsData[]>([]);

  const [userInput, setUserInput] = useState<string>("");

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
      <section
        id="herosection"
        className="max-w-[900px] mx-auto mt-5 relative flex flex-col items-center justify-cente md:mt-0"
      >
        <div className="border-[3px] py-1 px-2 border-black w-[80%] bg-white font-bold text-center text-2xl tracking-widest absolute -top-6 max-w-[350px] md:text-3xl md:-top-7">
          SALT & PEPPER
        </div>
        <div className="w-[95%] max-w-[700px] absolute -bottom-5">
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
            className={`w-full bg-white absolute border border-black p-3 flex-col gap-3 ${
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
      </section>
    </>
  );
};

export default HeroSection;
