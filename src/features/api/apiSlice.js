import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@env';

// Defines the single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    // id: cabinet ID
    getCabinetById: builder.query({
      query: (id) => `/cabinet/${id}`,
    }),
    getCabinetByUid: builder.query({
      // uid: user ID
      query: (uid) => `/cabinet/uid/${uid}`,
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
      query: ({ cabinetId, id, expiryDate }) => ({
        url: 'cabinet/items/',
        method: 'POST',
        body: { cabinetId, id, expiryDate },
      }),
      invalidatesTags: ['Items'],
    }),
    addFavouriteRecipe: builder.mutation({
      query: ({ cabinetId, recipeId }) => ({
        url: `/cabinet/favourite/${cabinetId}`,
        method: 'PUT',
        body: { recipeId },
      }),
    }),
    addShoppinglist: builder.mutation({
      query: ({ cabinetId, shoppinglist }) => ({
        url: `/cabinet/shoppinglist/${cabinetId}`,
        method: 'PUT',
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
  useGetCabinetByUidQuery,
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
