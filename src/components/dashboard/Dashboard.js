import 'react-native-get-random-values';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  View,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

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

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';
import ExpirySuggestions from './ExpirySuggestions';

const Dashboard = () => {
  const { cabinetId, user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const [scrollToBottom, setScrollToBottom] = useState(false);
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
  const { data: items } = useGetCabinetItemsQuery(cabinetId);
  const itemNames = items?.map((item) => item.name).join(',');
  const payload = { cabinetId, ingredients: itemNames };
  const { data: suggestedRecipes, isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(itemNames ? payload : skipToken);

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

  // useEffect to reset filtered recipes if no filter is selected
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
      <ScrollView keyboardShouldPersistTaps="handled" ref={scrollViewRef}>
        <SafeAreaView>
          {
            <StatusBar
              barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
            />
          }
          <HStack>
            <VStack>
              <Text style={{ paddingLeft: 18 }}>Welcome</Text>
              <Heading>{user.displayName && `${user.displayName}`}</Heading>
            </VStack>
            <Box w={'100%'} justifyContent={'center'} alignItems={'center'}>
              <AntDesign
                name="user"
                size={28}
                color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
                style={{ marginLeft: 30 }}
                onPress={() => navigation.navigate('Profile')}
              />
            </Box>
            <Divider />
          </HStack>

          <HStack
            mt={3}
            alignItems="center"
            justifyContent={'center'}
            w={'100%'}
            space={2}
          >
            <SearchBar
              placeholder="Search a recipe"
              onChangeText={(newValue) => setSearchInput(newValue)}
              defaultValue={searchInput}
            />
            <AntDesign
              name="filter"
              size={28}
              color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
              onPress={() => setShowFilters(!showFilters)}
            />
          </HStack>
          <Center mt={3}>
            {showFilters && (
              <Filters
                setMoreFilteredRecipes={setMoreFilteredRecipes}
                setShowFilters={setShowFilters}
                recipeIds={recipeIds}
                setFilterOptions={setFilterOptions}
                filterOptions={filterOptions}
              />
            )}
            <Text
              fontSize="2xl"
              style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}
              textAlign={'center'}
            >
              Suggested Recipes:{' '}
              {moreFilteredRecipes?.length
                ? moreFilteredRecipes.length
                : searchInput
                ? searchedRecipes?.length
                : suggestedRecipes?.length}
            </Text>
          </Center>
          <ScrollView horizontal={true}>
            {isLoadingRecipes && <Spinner />}
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
              <Text textAlign={'center'}>
                Your cabinet is empty. Add an item.
              </Text>
            )}

            {isLoadingRecipes && <Spinner text="Loading..." />}
          </ScrollView>
          <ExpirySuggestions
            items={items}
            setScrollToBottom={setScrollToBottom}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
