import { Box, Button } from "@mui/material";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQuestionFinished,
  handleShowResult,
  moveToNextQuestion,
} from "../../store/questionSlice";
import { resetTimer } from "../../store/countdownSlice";
import { setScore } from "../../store/scoreSlice";

const CorrectAnswer = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.questions
  );
  const { currentScore } = useSelector((state) => state.score);
  return (
    <Box className="flex flex-col justify-center items-center">
      <Box className="text-[30px] sm:text-[40px] font-bold text-[#7fd3d3] text-center mb-8">
        <CheckCircleTwoToneIcon
          sx={{
            fontSize: {
              xs: 40,
              md: 60,
              lg: 80,
            },
            color: "#33d410",
          }}
        />
        <p>Correct Answer!</p>
      </Box>
      <Button
        onClick={() => {
          if(currentQuestionIndex !== questions.length-1){
            dispatch(moveToNextQuestion()),
            dispatch(handleShowResult(false)),
            dispatch(resetTimer());
            dispatch(setScore(currentScore + 1))
          } else{
            dispatch(setScore(currentScore + 1))
            dispatch(handleShowResult(false));
            dispatch(handleQuestionFinished(true))
          }
        }}
        variant="contained"
        color="success"
      >
        Next
      </Button>
    </Box>
  );
};

export default CorrectAnswer;
