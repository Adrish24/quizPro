import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";


export default function LoadingScreen() {

  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center bg-[#051c29]">
      <div className="flex justify-center items-center">
        <p className="text-[60px] text-teal-200 font-semibold">Quiz</p>
        <p className="text-[70px] text-yellow-500 font-bold">Pro</p>
      </div>
      <CircularProgress size={40} thickness={2}/>
    </Box>
  );
}
