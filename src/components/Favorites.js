import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Center,
  Divider,
  ScrollView,
  Spinner,
  StatusBar,
  Text,
  useColorMode,
} from 'native-base';
import { CABINET_ID } from '@env';

import { useState } from 'react';
import SearchBar from './utils/SearchBar';
import { useGetFavoritesQuery } from '../features/api/apiSlice';
import { RecipeCard } from './utils/RecipeCard';
import { useEffect } from 'react';

const Favorites = () => {
  const { colorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState('');
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { data: favouriteRecipes, isLoading } =
    useGetFavoritesQuery(CABINET_ID);

  // useEffect for filtering By title
  useEffect(() => {
    const filteredFavorites = favouriteRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setSearchedRecipes(filteredFavorites);
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);
  if (isLoading) return <Spinner />;
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {/* <Text size={'lg'} bold textAlign={'center'}>
        Your Favorites
      </Text> */}
      <Divider />

      <Center>
        <SearchBar
          placeholder="Search a recipe"
          onChangeText={(newValue) => setSearchInput(newValue)}
          defaultValue={searchInput}
        />
      </Center>
      <ScrollView mt={4}>
        {searchInput
          ? searchedRecipes?.map((recipe) => (
              <RecipeCard key={recipe.id} item={recipe} />
            ))
          : favouriteRecipes?.map((recipe) => (
              <RecipeCard key={recipe.id} item={recipe} />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;
