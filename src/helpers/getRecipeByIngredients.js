import React from 'react';
import { useGetRecipeByIngredientsQuery } from '../features/api/apiSlice';
import { Text, Spinner } from 'native-base';
import { v4 as uuidv4 } from 'uuid';

/**
 * @param {Array} ingredients
 * @desc A function to get recipes based on a list of ingredients
 * @return list of recipes
 */
const getRecipeByIngredients = (ingredients) => {
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipeByIngredientsQuery(ingredients);

  if (isLoading) {
    return <Spinner text="Loading..." />;
  } else if (isSuccess) {
    return recipes.map((recipe) => {
      return (
        <Text key={uuidv4()}>
          {recipe.title} ( Used Ingredients: {recipe.usedIngredientCount} ){' '}
          {/* {recipe.missedIngredients.map((item) => (<Text key={}>{item}</Text>))*/}
        </Text>
      );
    });
  } else if (isError) {
    return <Text>{error.toString()}</Text>;
  }
};

export default getRecipeByIngredients;
