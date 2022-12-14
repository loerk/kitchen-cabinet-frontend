import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  VStack,
  CheckIcon,
  Button,
  HStack,
  View,
  Text,
  useColorMode,
} from 'native-base';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { AntDesign } from '@expo/vector-icons';

import { useGetFilteredRecipesQuery } from '../../features/api/apiSlice';

import { AuthContext } from '../../authNavigation/AuthProvider';
import { Pressable } from 'react-native';

const initialFilterOptions = {
  diet: '',
  intolerance: '',
  type: '',
  extras: '',
};

const Filters = ({
  setIsOpen,
  suggestedRecipes,
  displayedRecipes,
  setDisplayedRecipes,
}) => {
  const { colorMode } = useColorMode();
  const [isPressed, setIsPressed] = useState(false);
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const recipeIds = displayedRecipes?.map((recipe) => recipe.id);

  const { diet: presetDiet, intolerance: presetIntolerance } =
    useContext(AuthContext);
  const { diet, intolerance, type, extras } = filterOptions;
  const {
    data: filteredIds,
    isLoading,
    isSuccess,
    error,
  } = useGetFilteredRecipesQuery(
    isPressed && recipeIds?.length
      ? { type, diet, intolerance, extras, recipeIds: recipeIds.join() }
      : skipToken
  );

  if (isSuccess) {
    const filtered = displayedRecipes.filter((item) => {
      return filteredIds.includes(item.id);
    });
    setDisplayedRecipes(filtered);
    setIsPressed(false);
  }

  if (error) {
    setIsPressed(false);
    console.log(error);
  }

  return (
    <View p={'8'} mt={'10'} rounded="md" shadow={9}>
      <Pressable onPressIn={() => setIsOpen(false)}>
        <AntDesign
          name="close"
          size={28}
          color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
        />
      </Pressable>
      <VStack alignItems="center" space={6} mt={10}>
        <Select
          selectedValue={diet}
          minWidth={200}
          size={'md'}
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
          {presetDiet !== 'vegetarian' ? (
            <Select.Item label="Vegetarian" value="vegetarian" />
          ) : null}
          {presetDiet !== 'vegan' ? (
            <Select.Item label="Vegan" value="vegan" />
          ) : null}
          {presetDiet !== 'glutenFree' ? (
            <Select.Item label="Gluten free" value="glutenFree" />
          ) : null}
          {presetDiet !== 'dairyFree' ? (
            <Select.Item label="Dairy free" value="dairyFree" />
          ) : null}
        </Select>

        <Select
          selectedValue={intolerance}
          minWidth={200}
          accessibilityLabel="Select Intolerances"
          placeholder="Intolerances"
          size={'md'}
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
          {presetIntolerance !== 'Egg' ? (
            <Select.Item label="Egg" value="Egg" />
          ) : null}
          {presetIntolerance !== 'grain' ? (
            <Select.Item label="Grain" value="grain" />
          ) : null}
          {presetIntolerance !== 'peanut' ? (
            <Select.Item label="Peanut" value="peanut" />
          ) : null}
          {presetIntolerance !== 'sesame' ? (
            <Select.Item label="Sesame" value="sesame" />
          ) : null}
          {presetIntolerance !== 'shellfish' ? (
            <Select.Item label="Shellfish" value="shellfish" />
          ) : null}
          {presetIntolerance !== 'soy' ? (
            <Select.Item label="Soy" value="soy" />
          ) : null}
          {presetIntolerance !== 'tree Nut' ? (
            <Select.Item label="Tree Nut" value="tree Nut" />
          ) : null}
          {presetIntolerance !== 'wheat' ? (
            <Select.Item label="Wheat" value="wheat" />
          ) : null}
        </Select>

        <Select
          selectedValue={type}
          minWidth={200}
          size={'md'}
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
          size={'md'}
          accessibilityLabel="Select Extras"
          placeholder="Extras"
          onValueChange={(selectedValue) =>
            setFilterOptions((options) => ({
              ...options,
              extras: selectedValue,
            }))
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
            bg="secondary.100"
            onPress={() => {
              setDisplayedRecipes(suggestedRecipes);
              setFilterOptions(initialFilterOptions);
              setIsPressed(false);
            }}
          >
            Reset
          </Button>
          {isLoading ? (
            <Button bg="secondary.100" isLoading></Button>
          ) : (
            <Button
              bg="secondary.100"
              onPress={() => {
                setIsPressed(true);
              }}
            >
              Apply
            </Button>
          )}
        </HStack>
        {displayedRecipes && (
          <VStack alignItems={'center'}>
            <Text mt={10}>We found</Text>
            <Text bold>{displayedRecipes?.length} </Text>
            <Text> matching Recipes </Text>
          </VStack>
        )}
      </VStack>
    </View>
  );
};

Filters.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  suggestedRecipes: PropTypes.array.isRequired,
  displayedRecipes: PropTypes.array.isRequired,
  setDisplayedRecipes: PropTypes.func.isRequired,
};

export default Filters;
