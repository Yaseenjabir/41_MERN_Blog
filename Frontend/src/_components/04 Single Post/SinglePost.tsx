import React, { useEffect, useState } from "react";
import { FaFacebookF, FaUser } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import HeroSection from "../02 Main/HeroSection/HeroSection";
import { useLocation, useParams } from "react-router";
import RecentPosts from "./RecentPosts";
import Cookies from "js-cookie";
import CommentSection from "./CommentSection";
import ViewsAndLikes from "./ViewsAndLikes";

interface Data {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  likes: number;
  views: number;
  date: Date;
}

const SinglePost: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);

  const location = useLocation();
  const postUrl = `${import.meta.env.VITE_HOST_URL}${location.pathname}`;

  const token = Cookies.get("token");
  const parsedToken = token && JSON.parse(token);
  const { id } = useParams();

  const fetchData = async (_id: string | undefined) => {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/post/getSinglePost/${_id}`
    );
    const data = await res.json();
    setData(data.result);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

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

  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          postUrl
        )}`;
        break;

      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <HeroSection />
      <section className="w-full px-5 max-w-[900px] mx-auto mt-16">
        <section className="w-full p-7 border">
          <div className="flex gap-2 items-center text-gray-700">
            <FaUser className="bg-gray-300 w-8 h-8 p-2 rounded-full" />
            <span>Admin</span>
            <span className="mb-2">.</span>
            <span>{new Date(data.date).toLocaleDateString()}</span>
            <span className="mb-2">.</span>
            <span>
              {data.content
                ? calculateReadingTime(extractTextFromHTML(data.content))
                : 0}{" "}
              min
            </span>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-16">
              {data.title && data.title}
            </h1>
            <img src={data.image} />
            <div id="text" className="mt-10 flex flex-col gap-8">
              {data.content && (
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              )}
            </div>
            <div className="w-full py-5 border-t border-gray-400 flex items-center gap-3 mt-10">
              <FaFacebookF onClick={() => handleShare("facebook")} />
              <FaXTwitter onClick={() => handleShare("twitter")} />
            </div>
            <ViewsAndLikes
              views={data?.views}
              id={id}
              likes={data?.likes}
              parsedToken={parsedToken}
              fetchData={fetchData}
            />
          </div>
        </section>
        <RecentPosts />

        <CommentSection
          id={id}
          parsedToken={parsedToken}
          fetchData={fetchData}
        />
      </section>
    </>
  );
};

export default SinglePost;
