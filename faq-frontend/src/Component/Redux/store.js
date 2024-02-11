import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./Slice/questionSlice";
import userReducer from "./Slice/userSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
  },
});
