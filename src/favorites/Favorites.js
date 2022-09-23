import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Center,
  Divider,
  ScrollView,
  Spinner,
  StatusBar,
  useColorMode,
  View,
} from 'native-base';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';
import SearchBar from '../components/utils/SearchBar';
import { useGetFavoritesQuery } from '../features/api/apiSlice';
import { RecipeCard } from '../components/utils/RecipeCard';
import { useEffect } from 'react';
import { AuthContext } from '../authNavigation/AuthProvider';

const Favorites = () => {
  const { cabinetId } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState('');
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { data: favoriteRecipes, isLoading } = useGetFavoritesQuery(cabinetId);
  console.log({ favoriteRecipes });
  // useEffect for filtering By title
  useEffect(() => {
    const filteredFavorites = favoriteRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setSearchedRecipes(filteredFavorites);
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);
  if (isLoading) return <Spinner />;
  return (
    <View>
      <ScrollView
        backgroundColor={colorMode === 'dark' ? '#515050' : '#FCF5EA'}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView>
          <StatusBar
            barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
          />

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
                  <RecipeCard key={uuidv4()} item={recipe} />
                ))
              : favoriteRecipes?.map((recipe) => (
                  <RecipeCard key={uuidv4()} item={recipe} />
                ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Favorites;
