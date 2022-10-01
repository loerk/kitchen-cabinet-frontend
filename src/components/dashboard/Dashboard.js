import 'react-native-get-random-values';
import React, { useState, useEffect, useContext } from 'react';
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
import LoadingCards from '../utils/LoadingCards';

const Dashboard = () => {
  const navigation = useNavigation();
  const { cabinetId, user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  const { data: cabinetItems } = useGetCabinetItemsQuery(cabinetId);

  const cabinetItemNames = cabinetItems?.map((item) => item.name).join(',');
  const payload = { cabinetId, ingredients: cabinetItemNames };
  const { data: suggestedRecipes, isLoading: isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(cabinetItemNames ? payload : skipToken);

  useEffect(() => {
    if (suggestedRecipes && !displayedRecipes?.length)
      setDisplayedRecipes(suggestedRecipes);
  }, [suggestedRecipes]);

  // useEffect for filtering By title
  useEffect(() => {
    const filteredSuggestions = displayedRecipes?.filter((recipe) => {
      if (recipe.title.toLowerCase().includes(searchInput)) return true;
      return false;
    });
    if (searchInput) setDisplayedRecipes(filteredSuggestions);
    if (!searchInput) setDisplayedRecipes(suggestedRecipes);
  }, [searchInput]);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
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
                suggestedRecipes={suggestedRecipes}
                setShowFilters={setShowFilters}
                displayedRecipes={displayedRecipes}
                setDisplayedRecipes={setDisplayedRecipes}
              />
            )}
            <Text
              fontSize="2xl"
              style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}
              textAlign={'center'}
            >
              Suggested Recipes: {displayedRecipes?.length || 0}
            </Text>

            <ScrollView horizontal={true}>
              {isLoadingRecipes ? <Spinner size="large" /> : null}
              {displayedRecipes?.length ? (
                displayedRecipes?.map((recipe) => {
                  return <RecipeCard key={uuidv4()} item={recipe} />;
                })
              ) : isLoadingRecipes ? null : !cabinetItemNames?.length ? (
                <Text textAlign={'center'}>
                  Your cabinet is empty. Add an item.
                </Text>
              ) : null}
            </ScrollView>
          </Center>
          <ExpirySuggestions items={cabinetItems} />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
