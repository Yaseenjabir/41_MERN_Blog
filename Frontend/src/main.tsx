import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./_components/02 Main/Main.tsx";
import SinglePost from "./_components/04 Single Post/SinglePost.tsx";
import AllPosts from "./_components/05 All Posts/AllPosts.tsx";
import Dashboard from "./_components/06 Dashboard/Dashboard.tsx";
import Authentication from "./_components/07 Authetication/Authentication.tsx";
import Cookies from "js-cookie";
import About from "./_components/08 About Page/About.tsx";
import LoginForm from "./_components/06 Dashboard/Login/Login.tsx";

const token = Cookies.get("token");
const parsedToken = token && JSON.parse(token);

const ProtectRoute = () => {
  return parsedToken ? <Navigate to="/" /> : <Authentication />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/blog", element: <AllPosts /> },
      { path: "/blog/:id", element: <SinglePost /> },
      { path: "/about", element: <About /> },
    ],
  },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashLogin", element: <LoginForm /> },
  { path: "/auth", element: <ProtectRoute /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
