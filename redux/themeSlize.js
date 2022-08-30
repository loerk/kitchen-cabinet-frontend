import { THEME_CHANGE } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlize = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Handle our action of changing the theme
// const themeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case THEME_CHANGE:
//       return {
//         ...state,
//         mode: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export const { toggleTheme } = themeSlize.actions;

export default themeSlize.reducer;
