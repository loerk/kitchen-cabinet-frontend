import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://192.168.178.123:8002';

// Defines the single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getCabinetById: builder.query({
      query: (id) => `/cabinet/${id}`,
    }),
    getCabinetItems: builder.query({
      query: (id) => `/cabinet/items/all/${id}`,
      providesTags: ['Items'],
    }),
    getCabinetItem: builder.query({
      query: (id) => `/cabinet/items/${id}`,
    }),
    getFilteredRecipes: builder.query({
      query: ({ type, diet, intolerances }) =>
        `/recipes/filter?type=${type}&intolerances=d${intolerances}&diet=${diet}`,
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
      query: ({ cabinetId, id, expiryDate }) => ({
        url: 'cabinet/items/',
        method: 'POST',
        body: { cabinetId, id, expiryDate },
      }),
      invalidatesTags: ['Items'],
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
      invalidatesTags: ['Items'],
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: `/cabinet/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
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
