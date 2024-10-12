import { CiHeart } from "react-icons/ci";
import { LuUserCircle } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import HeroSection from "../02 Main/HeroSection/HeroSection";
import { useEffect, useState } from "react";
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

const AllPosts = () => {
  const [data, setData] = useState<PostsData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const postsPerPage = 5;

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_HOST_URL}/post/getPosts`);
    const data = await res.json();
    if (data.success) {
      setData(data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const extractTextFromHTML = (html: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent;
  };

  const calculateReadingTime = (text: any) => {
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingSpeed = 200;
    const time = Math.ceil(wordCount / readingSpeed);
    return time;
  };

  const truncateText = (text: any, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const uniqueCategories = [
    "All Posts",
    ...new Set(data.map((item) => item.category)),
  ];

  const filteredPosts =
    selectedCategory === "All Posts"
      ? data
      : data.filter((post) => post.category === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeroSection />
      <section className="w-full px-5 max-w-[900px] mx-auto mt-20">
        <ul className="w-full flex gap-3 border py-3 px-5">
          {uniqueCategories.map((item) => (
            <li
              key={item}
              onClick={() => {
                setSelectedCategory(item);
                setCurrentPage(1);
              }}
              className={`cursor-pointer hover:text-orange-600 font-semibold ${
                selectedCategory === item && "underline text-orange-600"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center justify-center w-full gap-10">
          {currentPosts.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/blog/${item._id}`)}
              className="w-full max-w-[400px] flex flex-col md:flex-row md:max-w-full cursor-pointer"
            >
              <img
                loading="lazy"
                className="w-full"
                src={item.image}
                alt={item.title}
              />
              <div className="p-6 border">
                <div className="flex items-center gap-2">
                  <LuUserCircle className="text-3xl text-gray-600" />
                  <div className="text-[12px] text-start flex flex-col">
                    <h1 className="font-bold">Admin</h1>
                    <span className="flex gap-3">
                      {new Date(item.date).toLocaleDateString()} <span>.</span>
                      <span>
                        {item.content
                          ? calculateReadingTime(
                              extractTextFromHTML(item.content)
                            )
                          : 0}{" "}
                        <span className="text-green-700">min</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="text-start mt-8 flex flex-col gap-2 cursor-pointer">
                  <h1 className="font-bold text-2xl">{item.title}</h1>
                  <p className="text-xl mt-5 text-gray-700">
                    {item.content
                      ? truncateText(extractTextFromHTML(item.content), 100)
                      : "No content available"}
                  </p>
                </div>
                <div className="border-t border-gray-300 py-4 mt-16 md:mt-5 flex items-center justify-between">
                  <div className="flex items-center w-min gap-2">
                    <MdOutlineRemoveRedEye className="text-xl text-gray-800" />
                    {item.views}
                  </div>
                  <div className="flex items-center w-min gap-2">
                    {item.likes}
                    <CiHeart className="text-xl text-gray-800" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllPosts;
