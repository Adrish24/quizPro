import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'session',
    initialState:{
        sessionToken:''
    },
    reducers: {
        setSessionToken: (state, action) => {
            state.sessionToken = action.payload
        }
    }
})

export default sessionSlice.reducer;
export const { setSessionToken } = sessionSlice.actions;