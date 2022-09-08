import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Divider,
  StatusBar,
  useColorMode,
  Heading,
  Text,
  Center,
  ScrollView,
  Spinner,
  HStack,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query/react';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';

// custom components
import SearchBar from '../SearchBar';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    /* suggestedRecipes && suggestedRecipes.filter(recipe => recipe.includes(searchInput)); */
    /* console.log(suggestedRecipes.map(obj => obj.props.children)); */
    console.log(suggestedRecipes.map((obj) => obj.props.children[0]));
  }, [searchInput]);

  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery('6315f1e0801fa7692c1bb736'); // empty cabinet id: 6317109d801fa7692c1bb75a, filled cabinet id: 6315f1e0801fa7692c1bb736

  let cabinetItems;
  let suggestedRecipes;

  if (isLoading) {
    cabinetItems = null;
  } else if (isSuccess) {
    cabinetItems = items.map((item) => item.name).join(',');
  } else if (isError) {
    console.log(error);
  }

  const {
    data: recipes,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    isError: isError2,
    error: error2,
  } = useGetRecipeByIngredientsQuery(
    isSuccess && cabinetItems.length !== 0 ? cabinetItems : skipToken
  );

  if (isLoading2) {
    suggestedRecipes = <Spinner text="Loading..." />;
  } else if (isSuccess2) {
    suggestedRecipes = recipes.map((recipe) => {
      return (
        <Text key={recipe.id}>
          {recipe.title} ( Used Ingredients: {recipe.usedIngredientCount} ){' '}
          {/* {recipe.missedIngredients.map((item) => (<Text key={}>{item}</Text>))*/}
        </Text>
      );
    });
  } else if (isError2) {
    suggestedRecipes = <Text>{error2.toString()}</Text>;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor, color: !bgColor }]}
    >
      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text>Welcome</Text>
      <Heading>{user.username && `${user.username}`}</Heading>
      <Divider />

      <Center>
        <HStack alignItems="center">
          <SearchBar
            placeholder="Search a recipe"
            onChangeText={(newValue) => setSearchInput(newValue)}
            defaultValue={searchInput}
          />
          <Ionicons
            name="options"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Filters')}
          />
        </HStack>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
          Suggested Recipes:{' '}
        </Text>
        <ScrollView>
          {suggestedRecipes ? (
            suggestedRecipes
          ) : (
            <Text>Your cabinet is empty. Add an item.</Text>
          )}
        </ScrollView>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Dashboard;
