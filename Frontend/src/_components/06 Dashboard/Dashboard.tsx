import { useEffect, useState } from "react";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./Sidebar/Sidebar";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState("Add Post");

  const navigate = useNavigate();

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="w-full flex flex-col md:flex-row">
        <Sidebar setTab={setTab} />
        <MainContent tab={tab} />
      </section>
    </>
  );
};

export default Dashboard;
