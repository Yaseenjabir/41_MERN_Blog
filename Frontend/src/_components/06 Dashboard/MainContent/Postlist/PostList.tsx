import { useEffect, useState } from "react";
import { FaDirections } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

const PostList = () => {
  const [data, setData] = useState<PostsData[]>([]);

  const navigateTo = useNavigate();

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_HOST_URL}/post/getPosts`);
    const data = await res.json();
    if (data.success) {
      setData(data.result);
    }
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDelete = async (_id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/post/deletePost`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }
    );

    const data = await res.json();
    if (data.success) {
      fetchData();
    }
  };

  return (
    <>
      <section className="w-full px-5 min-h-screen flex items-center justify-center">
        <div
          className={`w-full bg-white border border-black p-3 flex-col gap-3
             flex max-w-[640px]
            `}
        >
          <h1 className="mb-2 text-gray-800">Blog Posts</h1>
          {data.length > 0 &&
            data.map((item) => {
              return (
                <>
                  <div className="flex hover:bg-gray-100 cursor-pointer w-full gap-2 items-center justify-start relative">
                    <img src={item.image} className="w-[68px] h-16" />
                    <div>
                      <h1 className="font-bold leading-5 mb-1">
                        {truncateText(item.title, 35)}
                      </h1>
                      <p className="text-sm leading-4 text-gray-700">
                        {item.content
                          ? truncateText(extractTextFromHTML(item.content), 80)
                          : "No content available"}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 bg-white flex gap-2 h-full items-center justify-center text-2xl">
                      <MdDelete
                        className=" text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                      <FaDirections
                        onClick={() => {
                          navigateTo(`/blog/${item._id}`);
                        }}
                      />
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

export default PostList;
