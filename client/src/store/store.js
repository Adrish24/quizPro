import { configureStore } from "@reduxjs/toolkit";
import navMenuSlice from "./navMenuSlice";
import profileMenuSlice from "./profileMenuSlice";
import apiSlice from "./apiSlice";
import categorySlice from "./categorySlice";
import difficultySlice from "./difficultySlice";
import questionSlice from "./questionSlice";
import countdownSlice from "./countdownSlice";
import scoreSlice from "./scoreSlice";
import sessionSlice from "./sessionSlice";
import postApiSlice from "./postApiSlice";
import leaderBoardSlice from "./leaderBoardSlice";


const store = configureStore({
    reducer:{
        navMenu: navMenuSlice,
        profileMenu: profileMenuSlice,
        api: apiSlice,
        category: categorySlice,
        difficulty: difficultySlice,
        questions: questionSlice,
        countdown: countdownSlice,
        score: scoreSlice,
        session: sessionSlice,
        apiPost: postApiSlice,
        leaderboard: leaderBoardSlice,
    }
})


export default store;