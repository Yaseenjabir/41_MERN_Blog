import DeskTopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header: React.FC = () => {
  return (
    <>
      <MobileHeader />
      <DeskTopHeader />
    </>
  );
};

export default Header;
