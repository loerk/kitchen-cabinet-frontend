import React, { useState } from 'react';
import { Select, VStack, CheckIcon, Button } from 'native-base';
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
  const [filterOptions, setFilterOptions] = useState({
    diet: '',
    intolerances: '',
    type: '',
  });
  const { diet, intolerances, type } = filterOptions;
  const {
    data: recipes,
    isSuccess,
    error,
  } = useGetFilteredRecipesQuery(
    isPressed
      ? { type, diet, intolerances, recipeIds: recipeIds.join() }
      : skipToken
  );

  if (isSuccess) {
    setMoreFilteredRecipes(recipes);
    setShowFilters(false);
  }
  return (
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={filterOptions.diet}
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
        <Select.Item label="Lacto-Vegetarian" value="Lacto-Vegetarian" />
        <Select.Item label="Ovo-Vegetarian" value="Ovo-Vegetarian" />
        <Select.Item label="Vegan" value="Vegan" />
        <Select.Item label="Pescetarian" value="Pescetarian" />
        <Select.Item label="Paleo" value="Paleo" />
        <Select.Item label="Primal" value="Primal" />
        <Select.Item label="Low FODMAP" value="Low FODMAP" />
        <Select.Item label="Whole30" value="Whole30" />
      </Select>

      <Select
        selectedValue={filterOptions.intolerances}
        minWidth={200}
        accessibilityLabel="Select Intolerances"
        placeholder="Intolerances"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({
            ...options,
            intolerances: selectedValue,
          }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Dairy" value="Dairy" />
        <Select.Item label="Egg" value="Egg" />
        <Select.Item label="Gluten" value="Gluten" />
        <Select.Item label="Grain" value="Grain" />
        <Select.Item label="Peanut" value="Peanut" />
        <Select.Item label="Seafood" value="Seafood" />
        <Select.Item label="Sesame" value="Sesame" />
        <Select.Item label="Shellfish" value="Shellfish" />
        <Select.Item label="Soy" value="Soy" />
        <Select.Item label="Sulfite" value="Sulfite" />
        <Select.Item label="Tree Nut" value="Tree Nut" />
        <Select.Item label="Wheat" value="Wheat" />
      </Select>

      <Select
        selectedValue={filterOptions.type}
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
      <Button
        onPress={() => {
          setIsPressed(true);
        }}
      >
        Apply Filters
      </Button>
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
