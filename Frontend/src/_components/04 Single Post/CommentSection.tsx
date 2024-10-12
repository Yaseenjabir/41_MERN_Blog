import React, { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

interface Comments {
  _id: string;
  comment: string;
  post_id: string;
  user_id: string;
  username: string;
  created_at: Date;
}

interface CommentInterface {
  id: string | undefined;
  parsedToken: string;
  fetchData: (_id: string | undefined) => Promise<void>;
}

const CommentSection: React.FC<CommentInterface> = ({
  id,
  parsedToken,
  fetchData,
}) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comments[]>();

  const commentRef = useRef<any>(null);

  async function handleComments() {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/comments/addComment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beared ${parsedToken}`,
        },
        body: JSON.stringify({
          post_id: id,
          comment: commentRef.current?.value,
        }),
      }
    );
    const data = await res.json();
    if (data.message === "Token has expired") {
      navigate("/auth");
      return;
    }
    commentRef.current.value = "";
    fetchData(id);
    checkComments(id);
  }

  const checkComments = async (_id: string | undefined) => {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/comments/getComments/${_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      setComments(data.result);
      fetchData(_id);
    }
  };

  useEffect(() => {
    fetchData(id);
    checkComments(id);
  }, [id]);

  return (
    <>
      <section className="border mt-16 flex flex-col p-5 justify-center gap-5">
        <h1 className="font-semibold text-2xl">Comments</h1>
        <hr />
        <input
          ref={commentRef}
          type="text"
          placeholder="Enter your comment..."
          className="outline-none border py-3 px-5"
        />
        <button
          onClick={handleComments}
          className="bg-black max-w-[400px] self-center py-3 w-full text-white"
        >
          Add Comment
        </button>
        {comments?.map((item) => {
          return (
            <>
              <div className="flex items-start p-4 border-b border-gray-200">
                <FaUserAlt className="mr-3 w-6 h-6 mt-2 bg-gray-300 rounded-full p-1" />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {item.username}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(item.created_at).toLocaleDateString()}{" "}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{item.comment}</p>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default CommentSection;
