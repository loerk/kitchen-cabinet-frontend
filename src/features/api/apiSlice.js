import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@env';

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
      query: ({ type, diet, intolerance, extras, recipeIds }) =>
        `/recipes/filter?type=${type}&intolerance=${intolerance}&extras=${extras}&diet=${diet}&ids=${recipeIds}`,
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
    getFavorites: builder.query({
      query: (id) => `/cabinet/favorites/${id}`,
    }),
    getShoppinglist: builder.query({
      query: (id) => `/cabinet/shoppinglist/${id}`,
    }),
    addCabinet: builder.mutation({
      query: ({ name, uid }) => ({
        url: '/cabinet',
        method: 'POST',
        body: { name, uid },
      }),
    }),
    addItem: builder.mutation({
      query: ({ CABINET_ID, id, expiryDate }) => ({
        url: 'cabinet/items/',
        method: 'POST',
        body: { CABINET_ID, id, expiryDate },
      }),
      invalidatesTags: ['Items'],
    }),
    addFavouriteRecipe: builder.mutation({
      query: ({ CABINET_ID, recipeId }) => ({
        url: `/cabinet/favourite/${CABINET_ID}`,
        method: 'POST',
        body: { recipeId },
      }),
    }),
    addShoppinglist: builder.mutation({
      query: ({ CABINET_ID, shoppinglist }) => ({
        url: `/cabinet/shoppinglist/${CABINET_ID}`,
        method: 'POST',
        body: { shoppinglist },
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
  useGetFavoritesQuery,
  useGetShoppinglistQuery,
  useIngredientsListQuery,
  useRecipeInstructionsQuery,
  useAddShoppinglistMutation,
  useAddCabinetMutation,
  useAddItemMutation,
  useAddFavouriteRecipeMutation,
  useEditCabinetMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useDeleteCabinetMutation,
} = apiSlice;
