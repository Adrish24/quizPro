import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleQuestionFinished,
  moveToNextQuestion,
} from "../../store/questionSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setScore } from "../../store/scoreSlice";
import axios from "axios";
import { setSessionToken } from "../../store/sessionSlice";


const Finished = () => {
  const dispatch = useDispatch();
  const { currentScore } = useSelector((state) => state.score);
  const { sessionToken }  = useSelector(state => state.session)
  const { user } = useAuth();
  const navigate = useNavigate();

  const newUser = {
    name: user.displayName,
    uid: user.uid,
    score: currentScore,
    session: sessionToken
  };

  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/post", newUser);

      console.log(response.data);
      dispatch(moveToNextQuestion());
      dispatch(handleQuestionFinished(false));
      dispatch(setScore(0));
      dispatch(setSessionToken(''))
      navigate(`/${user.uid}/dashboard`);
    } catch (error) {
      console.log(error.message);
    } 
  };

  return (
    <Box className="absolute z-10 w-full h-screen bg-[#000000a4] flex justify-center items-center p-2">
      <Box className="bg-[#084566] w-[400px] h-[300px] rounded-lg p-4 flex flex-col justify-center items-center">
        <Box className="text-center mb-20">
          <p className="text-[20px] sm:text-[30px] font-bold text-[#7fd3d3]">
            Quiz Ended!
          </p>
          <p className="text-[#FFB500] font-semibold">
            Your Score: {currentScore}
          </p>
        </Box>
        <Button
          onClick={() => {
            handlePost();
          }}
          variant="contained"
          color="warning"
        >
          Exit
        </Button>
      </Box>
    </Box>
  );
};

export default Finished;
