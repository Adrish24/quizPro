import { Box } from "@mui/material";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
import { useState } from "react";

function Auth() {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };
  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center bg-[#051c29]">
      <Box className="flex justify-center items-center">
        <p className="text-[60px] text-teal-200 font-semibold">Quiz</p>
        <p className="text-[70px] text-yellow-500 font-bold">Pro</p>
      </Box>
      {toggle ? (
        <Login handleToggle={handleToggle} />
      ) : (
        <SignUp handleToggle={handleToggle} />
      )}
    </Box>
  );
}

export default Auth;
