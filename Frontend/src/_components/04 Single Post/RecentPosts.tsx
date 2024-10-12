import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
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

const RecentPosts: React.FC = () => {
  const [data, setData] = useState<Data[]>();

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

  const truncateText = (text: any, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="flex items-center justify-between mt-7">
          <h1>Recent Posts</h1>
          <a href="/blog" className="underline text-gray-600">
            See All
          </a>
        </div>
        <div className="mt-7 w-full flex flex-col gap-8 md:flex-row md:gap-3">
          {data &&
            data.map((item) => {
              return (
                <>
                  <div
                    className="border cursor-pointer md:w-[33%]"
                    onClick={() => {
                      navigate(`/blog/${item._id}`);
                      location.reload();
                    }}
                  >
                    <img className="w-full h-[250px]" src={item.image} />
                    <div className="p-5">
                      <h1 className="font-bold text-xl">
                        {truncateText(item.title, 40)}
                      </h1>
                      <div className="border-t border-gray-300 py-4 mt-8 flex items-center justify-between">
                        <div className="flex  items-center w-min gap-2">
                          <MdOutlineRemoveRedEye className="text-xl text-gray-800" />
                          {item.views}
                        </div>
                        <div className="flex  items-center w-min gap-2">
                          {item.likes}
                          <CiHeart className="text-xl text-gray-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};
export default RecentPosts;
