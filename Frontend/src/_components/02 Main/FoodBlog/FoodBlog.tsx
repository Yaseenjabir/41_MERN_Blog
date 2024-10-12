import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router";
interface Data {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  views: number;
  date: Date;
}

const FoodBlog = () => {
  const [data, setData] = useState<Data[]>();
  const navigate = useNavigate();

  async function getPosts() {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/post/getHomePost`
    );
    const data = await res.json();
    if (data.success) {
      setData(data.result);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const extractTextFromHTML = (html: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent;
  };

  const calculateReadingTime = (text: any) => {
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingSpeed = 200; // Average reading speed
    const time = Math.ceil(wordCount / readingSpeed);
    return time;
  };

  const truncateText = (text: any, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <section
        className="w-full py-10
      text-center max-w-[900px] mx-auto"
      >
        <h1 className="text-2xl font-semibold">FOOD BLOG</h1>
        <div className="w-full px-5 mt-10 flex flex-col items-center justify-center gap-10">
          {data &&
            data.map((item) => {
              return (
                <>
                  <div
                    onClick={() => navigate(`/blog/${item._id}`)}
                    className="w-full cursor-pointer max-w-[400px] flex flex-col md:flex-row md:max-w-full"
                  >
                    <img className="w-full cursor-pointer" src={item.image} />
                    <div className="p-6 border">
                      <div className="flex items-center gap-2">
                        <LuUserCircle className="text-3xl text-gray-600" />
                        <div className="text-[12px] text-start flex flex-col">
                          <h1 className="font-bold">Admin</h1>
                          <text className="flex gap-3">
                            {new Date(item.date).toLocaleDateString()}{" "}
                            <span>.</span>
                            <span>
                              {item.content
                                ? calculateReadingTime(
                                    extractTextFromHTML(item.content)
                                  )
                                : 0}{" "}
                              <span className="text-green-700">min</span>
                            </span>
                          </text>
                        </div>
                      </div>
                      <div
                        onClick={() => navigate(`/blog/${item._id}`)}
                        className="text-start mt-8 flex flex-col gap-2 cursor-pointer"
                      >
                        <h1 className="font-bold text-2xl">{item.title}</h1>
                        <p className="text-xl mt-5 text-gray-700">
                          {item.content
                            ? truncateText(
                                extractTextFromHTML(item.content),
                                100
                              )
                            : "No content available"}
                        </p>
                      </div>
                      <div className="border-t border-gray-300 py-4 mt-16 flex items-center justify-between">
                        <div className="flex relative items-center w-min gap-2">
                          <MdOutlineRemoveRedEye className="text-xl text-gray-800" />
                          {item.views}
                        </div>
                        <div className="flex relative items-center w-min gap-2 pr-6">
                          {item.likes}
                          <CiHeart className="text-xl absolute top-[3px] right-0 z-10 cursor-pointer text-gray-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <a href="/blog">
          <button className="py-4 w-[95%] border border-transparent bg-black text-white mt-10  hover:border-black hover:bg-transparent hover:text-black transition-all ease-in-out duration-300 max-w-[400px] self-center">
            All Posts
          </button>
        </a>
      </section>
    </>
  );
};

export default FoodBlog;
