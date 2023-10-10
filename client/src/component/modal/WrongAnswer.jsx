import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQuestionFinished,
  handleShowResult,
  moveToNextQuestion,
} from "../../store/questionSlice";
import { resetTimer } from "../../store/countdownSlice";

const WrongAnswer = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.questions
  );
  const selectedQuestion = questions[currentQuestionIndex];

  return (
    <Box className="flex flex-col justify-center items-center">
      <Box className="text-center mb-4">
        <CancelTwoToneIcon
          sx={{
            fontSize: {
              xs: 40,
              md: 60,
              lg: 80,
            },
            color: "#d40202",
          }}
        />
        <p className="text-[20px] sm:text-[30px] font-bold text-[#7fd3d3]">
          Wrong Answer!
        </p>
        <p className="text-[#33d410]">
          Right Answer: {selectedQuestion.correct_answer}
        </p>
      </Box>
      <Button
        onClick={() => {
          if(currentQuestionIndex !== questions.length- 1){
            dispatch(moveToNextQuestion()),
            dispatch(handleShowResult(false)),
            dispatch(resetTimer());
          } else{
            dispatch(handleShowResult(false));
            dispatch(handleQuestionFinished(true))
          }
        }}
        variant="contained"
        color="error"
      >
        move on
      </Button>
    </Box>
  );
};

export default WrongAnswer;
