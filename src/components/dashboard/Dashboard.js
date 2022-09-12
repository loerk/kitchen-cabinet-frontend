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

// custom components
import SearchBar from '../SearchBar';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';
import { RecipeCard } from '../utils/RecipeCard';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { data: items } = useGetCabinetItemsQuery('631b2436b274cf976cc4bfe9');
  const itemNames = items?.map((item) => item.name).join(',');

  const { data: suggestedRecipes, isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(itemNames ? itemNames : skipToken);

  useEffect(() => {
    const filteredSuggestions = suggestedRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setSearchedRecipes(filteredSuggestions);
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);

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
            onPress={() => navigation.navigate('Filters')}
          />
        </HStack>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
          Suggested Recipes:
        </Text>
      </Center>
      <ScrollView>
        {searchInput ? (
          searchedRecipes?.map((searchedRecipe) => {
            return <RecipeCard key={searchedRecipe.id} item={searchedRecipe} />;
          })
        ) : !searchInput ? (
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
