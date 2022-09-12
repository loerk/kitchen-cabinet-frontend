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
import { skipToken } from '@reduxjs/toolkit/query/react';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';

// custom components
import SearchBar from '../SearchBar';
import Filters from '../filters/Filters';
import { RecipeCard } from '../utils/RecipeCard';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [recipeIds, setRecipeIds] = useState([]);

  const { data: items } = useGetCabinetItemsQuery('631f0edea3f91c57be508d70');
  const itemNames = items?.map((item) => item.name).join(',');

  const { data: suggestedRecipes, isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(itemNames ? itemNames : skipToken);

  useEffect(() => {
    const filteredSuggestions = suggestedRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) {
      setSearchedRecipes(filteredSuggestions);
    }
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);

  useEffect(() => {
    if (searchedRecipes.length) {
      const ids = searchedRecipes.map((recipe) => recipe.id);
      setRecipeIds(ids);
    }
  }, [searchedRecipes]);

  useEffect(() => {
    if (!searchedRecipes.length) {
      const ids = suggestedRecipes?.map((recipe) => recipe.id);
      setRecipeIds(ids);
    }
  }, [showFilters]);
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
            onChangeText={(newValue) => setSearchInput(newValue.toLowerCase())}
            defaultValue={searchInput}
          />
          <Ionicons
            name="options"
            size={24}
            color="black"
            onPress={() => setShowFilters(!showFilters)}
          />
        </HStack>
        {showFilters && <Filters recipeIds={recipeIds} />}
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
          Suggested Recipes:
        </Text>
      </Center>
      <ScrollView>
        {searchInput ? (
          searchedRecipes?.map((searchedRecipe) => {
            return <RecipeCard key={searchedRecipe.id} item={searchedRecipe} />;
          })
        ) : !searchInput && itemNames ? (
          suggestedRecipes?.map((suggestedRecipe) => {
            return (
              <RecipeCard key={suggestedRecipe.id} item={suggestedRecipe} />
            );
          })
        ) : (
          <Text>Your cabinet is empty. Add an item.</Text>
        )}

        {isLoadingRecipes && <Spinner text="Loading..." />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Dashboard;
