import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { useNavigate } from "react-router";

interface CompsInterface {
  views: number;
  id: string | undefined;
  likes: number;
  parsedToken: string;
  fetchData: (_id: string | undefined) => Promise<void>;
}

const ViewsAndLikes: React.FC<CompsInterface> = ({
  views,
  id,
  likes,
  parsedToken,
  fetchData,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkLike = async (_id: string | undefined) => {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/likes/checkLike/${_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );
    const data = await res.json();
    if (data.liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const handleLike: (input: string | undefined) => any = async (input) => {
    if (!parsedToken) {
      navigate("/auth");
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/likes/handleLikes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify({ postId: input }),
      }
    );
    const data = await res.json();
    if (data.message === "Token has expired") {
      navigate("/auth");
      return;
    }
    fetchData(id);
    checkLike(id);
  };

  useEffect(() => {
    fetchData(id);
    checkLike(id);
  }, [id]);

  useEffect(() => {
    const addView = async () => {
      await fetch(`${import.meta.env.VITE_HOST_URL}/view/viewPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
    };
    const timeoutId = setTimeout(() => {
      addView();
    }, 120000);

    return () => clearTimeout(timeoutId);
  }, [id]);
  return (
    <>
      <div className="w-full py-5 border-t border-gray-400 flex items-center gap-3 justify-between">
        <span className="flex items-center justify-center">{views} views</span>
        <span className="flex items-center justify-center gap-1">
          {likes}{" "}
          {isLiked ? (
            <IoIosHeart
              onClick={() => handleLike(id)}
              className="text-red-600 text-xl mt-1 cursor-pointer"
            />
          ) : (
            <CiHeart
              onClick={() => handleLike(id)}
              className="text-xl mt-1 cursor-pointer"
            />
          )}
        </span>
      </div>
    </>
  );
};

export default ViewsAndLikes;
