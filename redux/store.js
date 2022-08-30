import { configureStore } from "@reduxjs/toolkit";
import themeSlize from "./themeSlize";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    theme: themeSlize,
  },
});

export default store;
