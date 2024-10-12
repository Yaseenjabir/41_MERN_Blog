import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const Authentication: React.FC = () => {
  const [isLogin, setIslogin] = useState<boolean>(true);

  return (
    <>
      {isLogin ? (
        <Login setIslogin={setIslogin} />
      ) : (
        <Signup setIslogin={setIslogin} />
      )}
    </>
  );
};

export default Authentication;
