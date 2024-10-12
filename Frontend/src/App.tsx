import { Outlet } from "react-router";
import Header from "./_components/01 Header/Header";
import Footer from "./_components/03 Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
