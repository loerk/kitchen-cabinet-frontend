import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://192.168.178.26:8002';

// Defines the single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCabinetById: builder.query({
      query: (id) => `/cabinet/${id}`,
    }),
    getCabinetItems: builder.query({
      query: (id) => `/cabinet/items/all/${id}`,
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
    addCabinet: builder.mutation({
      query: (name) => ({
        url: '/cabinet',
        method: 'POST',
        body: { name },
      }),
    }),
    addItem: builder.mutation({
      query: ({ cabinetId, id, expiryDate, amount }) => ({
        url: 'cabinet/items/',
        method: 'POST',
        body: { cabinetId, id, expiryDate, amount },
      }),
    }),
    editCabinet: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/cabinet/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    editItem: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/cabinet/items/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/cabinet/items/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteCabinet: builder.mutation({
      query: (id) => ({
        url: `/cabinet/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCabinetByIdQuery,
  useGetCabinetItemsQuery,
  useGetCabinetItemQuery,
  useGetFilteredRecipesQuery,
  useGetRecipeByIdQuery,
  useGetRecipeByIngredientsQuery,
  useIngredientsListQuery,
  useRecipeInstructionsQuery,
  useAddCabinetMutation,
  useAddItemMutation,
  useEditCabinetMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useDeleteCabinetMutation,
} = apiSlice;
