import { createSlice } from "@reduxjs/toolkit";


const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        currentScore: 0,
    },
    reducers: {
        setScore: (state, action) => {
            state.currentScore = action.payload
            sessionStorage.setItem('score', JSON.stringify(state.currentScore));
        }
    }
})

export default scoreSlice.reducer;
export const { setScore } = scoreSlice.actions;