import React, { useState } from 'react';
import { Select, VStack, CheckIcon, Button, HStack } from 'native-base';
import { useGetFilteredRecipesQuery } from '../../features/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const Filter = ({
  setMoreFilteredRecipes,
  setShowFilters,
  recipeIds,
  setFilterOptions,
  filterOptions,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const { diet, intolerance, type, extras } = filterOptions;
  const {
    data: recipes,
    isSuccess,
    error,
  } = useGetFilteredRecipesQuery(
    isPressed
      ? { type, diet, intolerance, extras, recipeIds: recipeIds.join() }
      : skipToken
  );

  if (isSuccess) {
    setMoreFilteredRecipes(recipes);
    setIsPressed(false);
    setShowFilters(false);
  }
  if (error) {
    console.log(error);
  }

  return (
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={diet}
        minWidth={200}
        accessibilityLabel="Select Diet"
        placeholder="Diet"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({ ...options, diet: selectedValue }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Vegetarian" value="vegetarian" />
        <Select.Item label="Vegan" value="vegan" />
        <Select.Item label="Gluten free" value="glutenFree" />
        <Select.Item label="Dairy free" value="dairyFree" />
      </Select>

      <Select
        selectedValue={intolerance}
        minWidth={200}
        accessibilityLabel="Select Intolerances"
        placeholder="Intolerances"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({
            ...options,
            intolerance: selectedValue,
          }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Egg" value="Egg" />
        <Select.Item label="Grain" value="grain" />
        <Select.Item label="Peanut" value="peanut" />
        <Select.Item label="Sesame" value="sesame" />
        <Select.Item label="Shellfish" value="shellfish" />
        <Select.Item label="Soy" value="soy" />
        <Select.Item label="Tree Nut" value="tree Nut" />
        <Select.Item label="Wheat" value="wheat" />
      </Select>

      <Select
        selectedValue={type}
        minWidth={200}
        accessibilityLabel="Select Recipe Type"
        placeholder="Recipe Type"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({ ...options, type: selectedValue }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="main course" value="main course" />
        <Select.Item label="side dish" value="side dish" />
        <Select.Item label="dessert" value="dessert" />
        <Select.Item label="appetizer" value="appetizer" />
        <Select.Item label="salad" value="salad" />
        <Select.Item label="bread" value="bread" />
        <Select.Item label="breakfast" value="breakfast" />
        <Select.Item label="beverage" value="beverage" />
        <Select.Item label="sauce" value="sauce" />
        <Select.Item label="marinade" value="marinade" />
        <Select.Item label="fingerfood" value="fingerfood" />
        <Select.Item label="snack" value="snack" />
        <Select.Item label="drink" value="drink" />
      </Select>

      <Select
        selectedValue={extras}
        minWidth={200}
        accessibilityLabel="Select Extras"
        placeholder="Extras"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({ ...options, extras: selectedValue }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Cheap" value="cheap" />
        <Select.Item label="Very Healthy" value="veryHealthy" />
        <Select.Item label="Very Popular" value="veryPopular" />
        <Select.Item label="Sustainable" value="sustainable" />
        <Select.Item label="Under 30 mins" value="readyInMinutes" />
      </Select>
      <HStack space={6}>
        <Button
          onPress={() => {
            setFilterOptions(() => ({
              diet: '',
              intolerance: '',
              type: '',
              extras: '',
            }));
          }}
        >
          Reset
        </Button>
        <Button
          onPress={() => {
            setIsPressed(true);
          }}
        >
          Apply
        </Button>
      </HStack>
    </VStack>
  );
};

export default Filter;
