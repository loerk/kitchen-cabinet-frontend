import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://192.168.178.26:8002";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCabinetItems: builder.query({
      query: (id) => `/cabinet/${id}`,
    }),
    getCabinetItem: builder.query({
      query: (id) => `/cabinet/items/${id}`,
    }),
    getFilteredRecipes: builder.query({
      query: ({ query, type, diet, cuisine, intolerances }) =>
        `/recipes/filter?query=${query}&type=${type}&cuisine=${cuisine}&intolerances=d${intolerances}&diet=${diet}`,
    }),
    getRecipeById: builder.query({
      query: (id) => `/recipes/id/${id}`,
    }),
    getRecipeByIngredients: builder.query({
      query: (...ingredients) =>
        `/recipes/byIngredients?ingredients=${ingredients}`,
    }),
    getIngredientsList: builder.query({
      query: (ingredient) => `/recipes/ingredient?ingredient=${ingredient}`,
    }),
    getRecipeInstructions: builder.query({
      query: (id) => `/recipes/instructions/${id}`,
    }),
  }),
});

export const {
  useGetCabinetItemsQuery,
  useGetCabinetItemQuery,
  useGetFilteredRecipesQuery,
  useGetRecipeByIdQuery,
  useGetRecipeByIngredientsQuery,
  useIngredientsListQuery,
  useRecipeInstructionsQuery,
} = apiSlice;

// export const getRecipe = createAsyncThunk(
//   "getRecipes",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `${BASE_URL}/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=${API_KEY}`
//       );
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.log(error);
//       rejectWithValue(error.response);
//     }
//   }
// );

// const initialState = {
//   list: [],
//   isLoading: false,
//   error: null,
// };

// const recipesSlize = createSlice({
//   name: "recipes",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getRecipes.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getRecipes.fulfilled]: (state, { payload }) => {
//       state.isLoading = false;
//       state.list = payload;
//     },
//     [getRecipes.rejected]: (state) => {
//       state.isLoading = false;
//       state.error = true;
//       state.message = "failed";
//     },
//   },
// });
