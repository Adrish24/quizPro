import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer } from "../store/countdownSlice";
import { handleQuestionPassed } from "../store/questionSlice";

const Countdown = () => {
  const { seconds, progress } = useSelector((state) => state.countdown);
  const {  showResult } = useSelector(
    (state) => state.questions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
        if (!showResult) {
          dispatch(handleQuestionPassed(true));
          console.log("Countdown complete!");
        }
    }
  }, [dispatch, seconds, showResult]);

  const formattedTime = `${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="text-white w-[100px]">
      Time: {formattedTime}
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default Countdown;
