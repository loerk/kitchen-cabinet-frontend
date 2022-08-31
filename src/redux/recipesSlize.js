import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "";
const API_BASE_URL = "https://api.spoonacular.com/recipes";

export const getRecipes = createAsyncThunk(
  "getRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=${API_KEY}`
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const recipesSlize = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipes.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.list = payload;
    },
    [getRecipes.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
      state.message = "failed";
    },
  },
});

export default recipesSlize;
