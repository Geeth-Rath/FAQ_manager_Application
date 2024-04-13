import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/questions/all");

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch questions");
    }
  }
);

export const postQuestion = createAsyncThunk(
  "questions/postQuestion",
  async (requestData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/questions/create",
        requestData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to post question");
    }
  }
);

export const fetchQuestionById = createAsyncThunk(
  "questions/fetchQuestionById",
  async (questionId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/questions/${questionId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch question");
    }
  }
);

export const updateQuestionById = createAsyncThunk(
  "questions/updateQuestionById",
  async ({ questionId, updatedData }) => {
    try {
      // Send a PUT request to the API endpoint to update the question by ID with the provided data
      const response = await axios.put(
        `http://localhost:8080/questions/${questionId}`,
        updatedData
      );
      console.log("updateslice: ", response.data);
      return response.data;
    } catch (error) {
      // Throw an error if the request fails
      throw new Error("Failed to update question");
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId) => {
    try {
      await axios.delete(`http://localhost:8080/questions/${questionId}`);
      return questionId;
    } catch (error) {
      throw new Error("Failed to delete question");
    }
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    text: null,
  },
  reducers: {
    getText: (state, action) => {
      state.text = action.payload;
      console.log("text", state.text);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postQuestion.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(postQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchQuestionById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateQuestionById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateQuestionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateQuestionById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (question) => question.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getText } = questionSlice.actions;
export default questionSlice.reducer;
