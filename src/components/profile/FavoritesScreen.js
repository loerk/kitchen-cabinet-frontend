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

import { useState, useEffect } from 'react';
import { AuthContext } from '../../authNavigation/AuthProvider';
import {
  useGetCabinetItemsQuery,
  useGetFavoritesQuery,
} from '../../features/api/apiSlice';
import SearchBar from '../utils/SearchBar';
import { RecipeCard } from '../utils/RecipeCard';

const Favorites = () => {
  const { cabinetId } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState('');
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { data: favoriteRecipes, isLoading } = useGetFavoritesQuery(cabinetId);
  const { data: cabinetItems } = useGetCabinetItemsQuery(cabinetId);

  useEffect(() => {
    const filteredFavorites = favoriteRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setSearchedRecipes(filteredFavorites);
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);
  const ids = cabinetItems?.map((item) => Number(item.spoonId));

  if (isLoading) return <Spinner />;
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <StatusBar
            barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={colorMode === 'dark' ? '#515050' : '#FCF5EA'}
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
                  <RecipeCard
                    key={uuidv4()}
                    recipe={recipe}
                    ingredientIds={ids}
                  />
                ))
              : favoriteRecipes?.map((recipe) => (
                  <RecipeCard
                    key={uuidv4()}
                    recipe={recipe}
                    ingredientIds={ids}
                  />
                ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Favorites;
