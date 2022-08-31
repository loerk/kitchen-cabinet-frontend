import { configureStore } from "@reduxjs/toolkit";
import recipesSlize from "./recipesSlize";

const store = configureStore({
  reducer: {
    recipes: recipesSlize.reducer,
  },
});

export default store;
