import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQuestionFinished,
  handleQuestionPassed,
  moveToNextQuestion,
} from "../../store/questionSlice";
import { resetTimer } from "../../store/countdownSlice";

const Passed = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.questions
  );

  if (
    currentQuestionIndex < 0 ||
    currentQuestionIndex >= questions.length ||
    questions.length === 0
  ) {
    return <p>No valid question found.</p>;
  }

  const selectedQuestion = questions[currentQuestionIndex];
  return (
    <Box className="absolute z-10 w-full h-screen bg-[#000000a4] flex justify-center items-center p-2">
      <Box className="bg-[#084566] w-[400px] h-[300px] rounded-lg p-4 flex flex-col justify-center items-center">
        <Box className="text-center mb-20">
          <p className="text-[20px] sm:text-[30px] font-bold text-[#7fd3d3]">
            Question Passed!
          </p>
          <p className="text-[#33d410] font-semibold">
            Correct Answer: {selectedQuestion.correct_answer}
          </p>
        </Box>
        <Button
          onClick={() => {
            if (currentQuestionIndex !== questions.length - 1) {
              dispatch(moveToNextQuestion()),
                dispatch(handleQuestionPassed(false)),
                dispatch(resetTimer());
            } else {
              dispatch(handleQuestionPassed(false));
              dispatch(handleQuestionFinished(true));
            }
          }}
          variant="contained"
        >
          move on
        </Button>
      </Box>
    </Box>
  );
};

export default Passed;
