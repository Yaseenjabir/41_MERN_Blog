import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowRotateRight } from "react-icons/fa6";

type FormData = {
  name: string;
  email: string;
  password: string;
};

interface LoginState {
  setIslogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<LoginState> = ({ setIslogin }) => {
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (input) => {
    setLoader(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_HOST_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <section className="w-full px-10 min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-semibold mb-5">Signup</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5 max-w-[400px]"
        >
          <div>
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              className="outline-none border border-black px-2 py-2 w-full"
              type="text"
              placeholder="Enter name"
            />
            {errors.name && (
              <span className="text-sm font-bold text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              className="outline-none border border-black px-2 py-2 w-full"
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-sm font-bold text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              id="password"
              className="outline-none border border-black px-2 py-2 w-full"
              type="password"
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="text-sm font-bold text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          {loader ? (
            <button
              type="submit"
              className="w-full py-3 bg-black text-white border border-transparent hover:bg-white hover:text-black hover:border-black transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
            >
              <FaArrowRotateRight className="mt-[2px] animate-spin" /> Signing
              In
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-black text-white border border-transparent hover:bg-white hover:text-black hover:border-black transition-all ease-in-out duration-300"
            >
              Signup
            </button>
          )}

          <h1 className="text-center">
            Already having account?{" "}
            <span
              onClick={() => setIslogin((prev: boolean) => !prev)}
              className="text-blue-500 underline cursor-pointer"
            >
              Login
            </span>
          </h1>
        </form>
      </section>
    </>
  );
};

export default Signup;
