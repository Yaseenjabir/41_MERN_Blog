import React from "react";

const Sidebar: React.FC<{ setTab: (val: string) => void }> = ({ setTab }) => {
  return (
    <>
      <header className="md:hidden flex items-center justify-center py-5 gap-3">
        <button
          onClick={() => setTab("Add Post")}
          className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-black hover:border-black border border-transparent"
        >
          Add Post
        </button>
        <button
          onClick={() => setTab("Post List")}
          className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-black hover:border-black border border-transparent"
        >
          Posts
        </button>
      </header>
      <aside className="w-[20%] border-r border-gray-500 min-h-[100vh] flex-col items-center justify-center hidden md:flex">
        <ul>
          <li
            className="cursor-pointer font-semibold underline"
            onClick={() => setTab("Add Post")}
          >
            Add Post
          </li>
          <li
            className="cursor-pointer font-semibold underline"
            onClick={() => setTab("Post List")}
          >
            Post List
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
