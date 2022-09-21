import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CABINET_ID } from '@env';
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
  VStack,
  Box,
  useTheme,
  View,
} from 'native-base';

import { AntDesign } from '@expo/vector-icons';
import { skipToken } from '@reduxjs/toolkit/query/react';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';

// custom components
import SearchBar from '../utils/SearchBar';
import Filters from '../filters/Filters';
import { RecipeCard } from '../utils/RecipeCard';
import { HamburgerMenu } from '../utils/HamburgerMenu';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [recipeIds, setRecipeIds] = useState([]);
  const [moreFilteredRecipes, setMoreFilteredRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    diet: '',
    intolerance: '',
    type: '',
    extras: '',
  });
  const { data: items } = useGetCabinetItemsQuery(CABINET_ID);
  const itemNames = items?.map((item) => item.name).join(',');

  const { data: suggestedRecipes, isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(itemNames ? itemNames : skipToken);

  // useEffect for filtering By title
  useEffect(() => {
    const filteredSuggestions = suggestedRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setSearchedRecipes(filteredSuggestions);
    if (!searchInput) setSearchedRecipes([]);
  }, [searchInput]);

  // useEffect for setting recipeIds from searchedList to get Bulk in the next step
  useEffect(() => {
    if (searchedRecipes.length) {
      const ids = searchedRecipes.map((recipe) => recipe.id);
      setRecipeIds(ids);
    }
  }, [searchedRecipes]);

  // useEffect for setting recipeIds from suggestedList to get Bulk in the next step
  useEffect(() => {
    if (!searchedRecipes.length) {
      const ids = suggestedRecipes?.map((recipe) => recipe.id);
      setRecipeIds(ids);
    }
  }, [showFilters]);

  // useEffect for setting filteredList to display them in next step
  useEffect(() => {
    if (moreFilteredRecipes.length && !searchInput) {
      const filtered = suggestedRecipes.filter((item) => {
        return moreFilteredRecipes.includes(item.id);
      });
      setFilteredRecipes(filtered);
    }
  }, [moreFilteredRecipes]);

  //useEffect to reset filtered recipes if no filter is selected
  useEffect(() => {
    if (
      !filterOptions.diet &&
      !filterOptions.intolerance &&
      !filterOptions.type &&
      !filterOptions.diet
    ) {
      setMoreFilteredRecipes([]);
    }
  }, [filterOptions]);

  return (
    <View>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: bgColor, color: !bgColor },
        ]}
      >
        <StatusBar
          barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
        />
        <HStack>
          <VStack>
            <Text style={{ paddingLeft: 18 }}>Welcome</Text>
            <Heading>{user.username && `${user.username}`}</Heading>
          </VStack>
          <Box w={'100%'} justifyContent={'center'} alignItems={'flex-end'}>
            <HamburgerMenu options={['Profile', 'Favorites']} />
          </Box>
          <Divider />
        </HStack>
        <Center>
          <HStack alignItems="center">
            <SearchBar
              placeholder="Search a recipe"
              onChangeText={(newValue) => setSearchInput(newValue)}
              defaultValue={searchInput}
            />
            <AntDesign
              name="filter"
              size={28}
              color="black"
              onPress={() => setShowFilters(!showFilters)}
            />
          </HStack>
          {showFilters && (
            <Filters
              setMoreFilteredRecipes={setMoreFilteredRecipes}
              setShowFilters={setShowFilters}
              recipeIds={recipeIds}
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
            />
          )}
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
            Suggested Recipes:{' '}
            {moreFilteredRecipes?.length
              ? moreFilteredRecipes.length
              : searchInput
              ? searchedRecipes?.length
              : suggestedRecipes?.length}
          </Text>
        </Center>
        <ScrollView horizontal={true} mt={4}>
          {moreFilteredRecipes?.length && !searchInput ? (
            filteredRecipes?.map((filteredRecipe) => {
              return <RecipeCard key={uuidv4()} item={filteredRecipe} />;
            })
          ) : searchInput ? (
            searchedRecipes?.map((searchedRecipe) => {
              return <RecipeCard key={uuidv4()} item={searchedRecipe} />;
            })
          ) : !searchInput && itemNames && !searchedRecipes.length ? (
            suggestedRecipes?.map((suggestedRecipe) => {
              return <RecipeCard key={uuidv4()} item={suggestedRecipe} />;
            })
          ) : (
            <Text>Your cabinet is empty. Add an item.</Text>
          )}

          {isLoadingRecipes && <Spinner text="Loading..." />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Dashboard;
