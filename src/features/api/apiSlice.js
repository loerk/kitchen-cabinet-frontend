import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const REACT_APP_BASE_URL = 'https://ill-pink-lobster-kit.cyclic.app/';
// Defines the single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  tagTypes: ['Items', 'Shoppinglist', 'Favorites', 'Preferences'],
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
      query: ({ ingredients, cabinetId }) =>
        `/recipes/byIngredients?cabinetId=${cabinetId}&ingredients=${ingredients}`,
    }),
    getIngredientsList: builder.query({
      query: (ingredient) => `/recipes/ingredient?ingredient=${ingredient}`,
    }),
    getRecipeInstructions: builder.query({
      query: (id) => `/recipes/instructions/${id}`,
    }),
    getFavorites: builder.query({
      query: (cabinetId) => `/cabinet/favorites/${cabinetId}`,
      providesTags: ['Favorites'],
    }),
    getShoppinglist: builder.query({
      query: (id) => `/cabinet/shoppinglist/${id}`,
      providesTags: ['Shoppinglist'],
    }),
    getPreferences: builder.query({
      query: (id) => `/cabinet/preferences/${id}`,
      providesTags: ['Preferences'],
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
    addFavoriteRecipe: builder.mutation({
      query: ({ cabinetId, recipeId }) => ({
        url: `/cabinet/favorites/${cabinetId}`,
        method: 'POST',
        body: { recipeId },
      }),
      invalidatesTags: ['Favorites'],
    }),
    addShoppinglist: builder.mutation({
      query: ({ cabinetId, shoppinglist }) => ({
        url: `/cabinet/shoppinglist/${cabinetId}`,
        method: 'POST',
        body: { shoppinglist },
      }),
      invalidatesTags: ['Shoppinglist'],
    }),
    addPreferences: builder.mutation({
      query: ({ cabinetId, preferences }) => ({
        url: `/cabinet/preferences/${cabinetId}`,
        method: 'POST',
        body: preferences,
      }),
      invalidatesTags: ['Preferences'],
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
    deleteShoppinglistItems: builder.mutation({
      query: ({ cabinetId, toDelete }) => ({
        url: `/cabinet/shoppinglist/${cabinetId}?toDelete=${toDelete}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shoppinglist'],
    }),
    deleteFavoriteRecipe: builder.mutation({
      query: ({ cabinetId, recipeId }) => ({
        url: `/cabinet/favorites/${cabinetId}?recipeId=${recipeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
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
  useGetPreferencesQuery,
  useAddPreferencesMutation,
  useIngredientsListQuery,
  useRecipeInstructionsQuery,
  useAddShoppinglistMutation,
  useAddCabinetMutation,
  useAddItemMutation,
  useAddFavoriteRecipeMutation,
  useEditCabinetMutation,
  useEditItemMutation,
  useDeleteShoppinglistItemsMutation,
  useDeleteItemMutation,
  useDeleteCabinetMutation,
  useDeleteFavoriteRecipeMutation,
} = apiSlice;
