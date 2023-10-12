import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../component/LoadingScreen";
import Result from "../component/modal/Result";
import { Box, Button } from "@mui/material";
import {
  exitQuestion,
  handleQuestionPassed,
  handleShowResult,
  setCurrentQuestionIndex,
  setQuestions,
} from "../store/questionSlice";
import Answers from "../component/Answers";
import Countdown from "../component/Countdown";
import CurrentScore from "../component/CurrentScore";
import Finished from "../component/modal/Finished";
import Passed from "../component/modal/Passed";
import { resetTimer } from "../store/countdownSlice";
import { setScore } from "../store/scoreSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setSessionToken } from "../store/sessionSlice";

const Questions = () => {
  const [loading, setLoading] = useState(false);

  const { sessionToken } = useSelector((state) => state.session);

  const {
    questions,
    currentQuestionIndex,
    showResult,
    questionFinished,
    questionPassed,
  } = useSelector((state) => state.questions);
  const { user } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    const storedQuestions = JSON.parse(
      sessionStorage.getItem("fetchQuestions")
    );
    const token = JSON.parse(sessionStorage.getItem("sessionToken"));
    const questionIndex = JSON.parse(sessionStorage.getItem("currentQuestion"));
    const scoreCount = JSON.parse(sessionStorage.getItem("score"));

    if(token)dispatch(setSessionToken(token))
    if(storedQuestions) dispatch(setQuestions(storedQuestions));
    if(questionIndex) dispatch(setCurrentQuestionIndex(questionIndex));
    if(scoreCount) dispatch(setScore(scoreCount))
    dispatch(handleShowResult(false));
    dispatch(handleQuestionPassed(false));
    dispatch(resetTimer());

  }, []);

  const navigateToDashboard = () => {
    setLoading(true);
    dispatch(setSessionToken(""));
    dispatch(setQuestions([]));
    navigate(`/${user.uid}/dashboard`);
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("fetchQuestions");
    setLoading(false);
  };

  useEffect(() => {
    if(!sessionToken){
      navigate(`/${user.uid}/dashboard`)
    }
  },[sessionToken])

  useEffect(() => {
    if(questions.length !== 0)console.log(questions);
  }, [questions]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : questions && (
        <Box className="bg-[#051c29] flex justify-center items-center min-h-screen p-2 sm:p-4 relative">
          <Box className="md:w-[800px] rounded-xl bg-[#051b30] p-8 flex flex-col justify-center item">
            <Box className="flex flex-col sm:flex-row justify-between mb-2 text-[#bae3e3] px-4 text-[10px] sm:text-[16px]">
              <span>
                CATEGORY: {questions?.[currentQuestionIndex]?.category}
              </span>
              <span>
                DIFFICULTY: {questions?.[currentQuestionIndex]?.difficulty}
              </span>
            </Box>
            <Box className="border border-[#7fd3d3] rounded-lg mb-4 p-4 text-[#7fd3d3] bg-[#093147]">
              {currentQuestionIndex + 1}.{" "}
              {decodeHTML(questions?.[currentQuestionIndex]?.question)}
            </Box>
            <Box className="flex justify-between mb-4">
              <Countdown />
              <CurrentScore />
            </Box>
            <Answers />
            <Button
              onClick={() => {
                dispatch(exitQuestion());
                dispatch(setScore(0));
                dispatch(setSessionToken(""));
                navigateToDashboard();
              }}
              variant="contained"
              color="warning"
            >
              Exit
            </Button>
          </Box>
          {showResult ? <Result /> : questionPassed ? <Passed /> : null}
          {questionFinished ? <Finished /> : null}
        </Box>
      ) }
    </>
  );
};

export default Questions;
