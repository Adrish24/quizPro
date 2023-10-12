import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import colors from "../styles/colors";
import CategorySelect from "./CategorySelect";
import DifficultySelect from "./DifficultySelect";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSessionToken } from "../store/sessionSlice";
import { useEffect } from "react";
import { fetchData } from "../store/apiSlice";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";



function Start() {
  const { user } = useAuth();
  const { selectedCategoryValue } = useSelector((state) => state.category);
  const { selectedDifficulty } = useSelector((state) => state.difficulty);
  const { data, status } = useSelector((state) => state.api);
  const { sessionToken } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payload = { name: user.displayName };

  const handleSessionToken = async () => {
    try {
      if (user) {
        const response = await axios.post(
          "https://quizpro.onrender.com/generate",
          payload,
        );
        dispatch(setSessionToken(response.data.accessToken));
        await handleFetchQuestions();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFetchQuestions = async () => {
    dispatch(
      fetchData({
        category: selectedCategoryValue,
        difficulty: selectedDifficulty,
      })
    );
  };

  useEffect(() => {
    if(sessionToken && status === 'idle') {
      console.log(sessionToken, data)
      navigate(`/${user.uid}/quiz`)
    }
  },[sessionToken, status])



  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "failed") {
    return <ErrorScreen />;
  }

  return (
    <Box className="flex flex-col justify-center items-center my-[100px] select-none">
      <Box className="text-center w-full px-4">
        <Typography
          color={colors.lightColor}
          sx={{
            fontSize: { xs: "40px", md: "60px", lg: "80px" },
          }}
        >
          Welcome to QuizPro!
        </Typography>
        <Typography
          color={colors.mainTextColor}
          marginBottom="20px"
          sx={{
            fontSize: { xs: "12px", md: "16px", lg: "24px" },
          }}
        >
          Choose a category and difficulty. Let&apos;s see how much you know!
        </Typography>
      </Box>
      <Box className="flex flex-col">
        {/* Category select */}
        <CategorySelect />
        {/* Difficulty select */}
        <DifficultySelect />
        <Link
          onClick={handleSessionToken}
          className="bg-yellow-500 px-4 py-2 font-semibold rounded-md text-center"
        >
          Begin Quiz
        </Link>
      </Box>
    </Box>
  );
}

export default Start;
