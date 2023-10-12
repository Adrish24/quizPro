import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleShowResult, toggleCorrectAnswer } from "../store/questionSlice";

const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const Answers = () => {
  const [suffle, setSuffle] = useState([]);
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.questions
  );

  const dispatch = useDispatch();

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const handleCorrectAnswer = (answer) => {
    const selectedQuestion = questions[currentQuestionIndex];
    dispatch(handleShowResult(true));
    if (answer === selectedQuestion.correct_answer) {
      console.log("Correct answer");
      dispatch(toggleCorrectAnswer(true));
    } else {
      dispatch(toggleCorrectAnswer(false));
    }
  };

  useEffect(() => {
    if (questions && questions.length > 0) {
      const selectedQuestion = questions[currentQuestionIndex];
      const combinedAnswers = selectedQuestion
        ? [
            selectedQuestion.correct_answer,
            ...selectedQuestion.incorrect_answers,
          ]
        : [];
      setSuffle(shuffleArray(combinedAnswers));
    }
  }, [currentQuestionIndex, questions]);

  return (
    <Box className="w-full flex flex-col sm:grid sm:grid-cols-2 rounded-lg text-white  gap-2 mb-4">
      {suffle.map((ans, i) => (
        <span
          className="border-[3px] 
          border-[#093147] 
          text-[#093147] 
          font-semibold w-full 
          rounded-lg p-2 
          bg-[#bae3e3] 
          hover:bg-[#FFB500] 
          hover:border-[#803409] 
          cursor-pointer 
          whitespace-normal 
          text-[10px] sm:text-[14px]"
          key={ans}
          onClick={() => handleCorrectAnswer(ans)}
        >
          {String.fromCharCode(65 + i)}. {decodeHTML(ans)}
        </span>
      ))}
    </Box>
  );
};

export default Answers;
