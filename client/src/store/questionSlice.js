import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    showResult: false,
    correctAnswer: false,
    questionFinished: false,
    questionPassed: false,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    moveToNextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.currentQuestionIndex = 0;
      }
    },
    moveToPreviousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    exitQuestion: (state) => {
      state.currentQuestionIndex = 0
    },
    handleShowResult: (state, action) => {
      state.showResult = action.payload;
    },
    toggleCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    handleQuestionFinished: (state, action) => {
      state.questionFinished = action.payload;
    },
    handleQuestionPassed: (state, action) => {
      state.questionPassed = action.payload;
    },
  },
});

export default questionSlice.reducer;
export const {
  setQuestions,
  moveToNextQuestion,
  moveToPreviousQuestion,
  exitQuestion,
  toggleCorrectAnswer,
  handleShowResult,
  handleQuestionFinished,
  handleQuestionPassed
} = questionSlice.actions;
