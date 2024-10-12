import React, { FormEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../../../../_firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

interface Categories {
  category: string;
}

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File | null>();

  const [categories, setCategories] = useState<Categories[]>();

  const [selectedCategory, setSelectedCategory] = useState<
    undefined | string
  >();

  const dialogRef = useRef<any>(null);

  const singleCategoryRef = useRef<any>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !title || !content || !selectedCategory) {
      alert("Fields cannot be empty");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${title}`);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    const res = await fetch(`${import.meta.env.VITE_HOST_URL}/post/addPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        image: downloadURL,
        category: selectedCategory,
      }),
    });
    const data = await res.json();
    if (data.success) {
      location.reload();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!validImageTypes.includes(selectedFile.type)) {
        alert("Please select a valid image file (jpeg, png, webp)");
        e.target.value = "";
      } else {
        setFile(selectedFile);
      }
    } else {
      alert("No file selected");
    }
  };

  const getCategories = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/post/getCategories`
    );
    const data = await res.json();
    if (data.success) {
      setCategories(data.result);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  async function handleAddCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_HOST_URL}/post/addCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: singleCategoryRef.current?.value }),
      }
    );
    const data = await res.json();
    if (data.success) {
      dialogRef.current.close();
      getCategories();
    }
  }

  return (
    <div className="w-full flex px-10 flex-col items-center justify-center border min-h-screen py-10">
      <h1 className="font-bold text-2xl text-center">Add Post</h1>
      <form onSubmit={handleSubmit} className="mt-10 w-full flex flex-col">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-400 rounded mb-4"
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your blog content here..."
          className="mb-4"
        />
        <input type="file" className="mb-5" onChange={handleChange} />
        <select
          className="mb-5 py-2 px-3 rounded-full"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option defaultChecked disabled>
            Select Category
          </option>
          {categories?.map((item) => {
            return (
              <>
                <option key={item.category} value={item.category}>
                  {item.category}
                </option>
              </>
            );
          })}
          <option onClick={() => dialogRef.current?.showModal()}>
            Add Category
          </option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Post
        </button>
      </form>

      <dialog ref={dialogRef} className="w-full p-5">
        <form onSubmit={handleAddCategory}>
          <label className="font-bold text-sm" htmlFor="Category">
            Category
          </label>
          <input
            ref={singleCategoryRef}
            id="Category"
            type="text"
            placeholder="Enter Category Name"
            className="w-full outline-none border border-gray-700 py-2 px-3 mt-3"
          />
          <button className="w-full bg-blue-500 py-2 mt-4 font-bold text-white text-sm">
            Add Category
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default AddPost;
