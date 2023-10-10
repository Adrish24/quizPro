import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../component/LoadingScreen";
import ErrorScreen from "../component/ErrorScreen";
import Result from "../component/modal/Result";
import { Box, Button } from "@mui/material";
import {
  exitQuestion,
  handleQuestionPassed,
  handleShowResult,
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
  const { data, status } = useSelector((state) => state.api);
  const { sessionToken} = useSelector(state => state.session)
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
  }

  useEffect(() => {
    const storedQuestions = JSON.parse(
      sessionStorage.getItem("fetchQuestions")
    );

    const token = JSON.parse(sessionStorage.getItem("sessionToken"));

    dispatch(setQuestions(storedQuestions));
    dispatch(setSessionToken(token));
    dispatch(handleShowResult(false));
    dispatch(handleQuestionPassed(false));
    dispatch(resetTimer());
  }, []);

  useEffect(() => {
    if (data.length === 0) return ;
    if(sessionToken === '') return ;
    
    dispatch(setQuestions(data));
    sessionStorage.setItem("fetchQuestions", JSON.stringify(data));
    sessionStorage.setItem("sessionToken", JSON.stringify(sessionToken));

  }, [data,sessionToken]);

  
  const navigateToDashboard = () => {
    navigate(`/${user.uid}/dashboard`);
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "failed") {
    return <ErrorScreen />;
  }

  return (
    <Box className="bg-[#051c29] flex justify-center items-center min-h-screen p-4 relative">
      <Box className="md:w-[800px] rounded-xl bg-[#051b30] p-8 flex flex-col justify-center item">
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
            dispatch(setSessionToken(''))
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
  );
};

export default Questions;
