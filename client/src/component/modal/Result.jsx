import { Box } from "@mui/material";
import CorrectAnswer from "./CorrectAnswer";
import WrongAnswer from "./WrongAnswer";
import { useSelector } from "react-redux";

const Result = () => {

    const { correctAnswer } = useSelector(state => state.questions)
  return (
    <Box className='absolute z-10 w-full h-screen bg-[#000000a4] flex justify-center items-center p-2'>
      <Box className="bg-[#084566] w-[400px] h-[300px] rounded-lg p-4 flex justify-center">
        {correctAnswer? <CorrectAnswer/> : <WrongAnswer/>}
      </Box>
    </Box>
  );
};

export default Result;
