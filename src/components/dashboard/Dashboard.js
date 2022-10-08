import 'react-native-get-random-values';
import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Divider,
  StatusBar,
  useColorMode,
  Heading,
  Text,
  Center,
  ScrollView,
  HStack,
  VStack,
  Box,
  View,
  Slide,
  Button,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { skipToken } from '@reduxjs/toolkit/query/react';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';

// custom components
import SearchBar from '../utils/SearchBar';
import Filters from '../filters/Filters';
import { RecipeCard } from '../utils/RecipeCard';
import ExpirySuggestions from './ExpirySuggestions';
import LoadingCards from '../utils/LoadingCards';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';
import { Pressable } from 'react-native';

const Dashboard = () => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const { cabinetId, user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState('');
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
        {
          <StatusBar
            barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={colorMode === 'dark' ? '#515050' : '#FCF5EA'}
          />
        }
        <HStack>
          <Box w={'100%'}>
            <HStack justifyContent={'space-between'} alignItems={'flex-end'}>
              <VStack mt={0}>
                <Text style={{ paddingLeft: 18 }}>Welcome</Text>
                <Heading>{user.displayName && `${user.displayName}`}</Heading>
              </VStack>

              <Ionicons
                name="person-circle-outline"
                size={40}
                color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
                style={{ marginRight: 34 }}
                onPress={() => navigation.navigate('Profile')}
              />
            </HStack>
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
          <Pressable onPressIn={() => setIsOpen(!isOpen)}>
            <Ionicons
              name="options"
              size={34}
              color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
              //onPress={() => setIsOpen(!isOpen)}
            />
          </Pressable>
        </HStack>
        <Center mt={3}>
          <Slide in={isOpen} placement={'right'} duration={300}>
            <Filters
              suggestedRecipes={suggestedRecipes}
              displayedRecipes={displayedRecipes}
              setDisplayedRecipes={setDisplayedRecipes}
              setIsOpen={setIsOpen}
            />
          </Slide>
          <Text
            fontSize="2xl"
            style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}
            textAlign={'center'}
          >
            Suggested Recipes: {displayedRecipes?.length || 0}
          </Text>
          <ScrollView horizontal={true}>
            {displayedRecipes?.length ? (
              displayedRecipes?.map((recipe) => {
                return <RecipeCard key={uuidv4()} recipe={recipe} />;
              })
            ) : isLoadingRecipes ? (
              <LoadingCards />
            ) : !cabinetItemNames?.length ? (
              <Center>
                <Text>Your cabinet is empty.</Text>
                <Button
                  onPress={() => navigation.navigate('Add')}
                  w="100%"
                  bg="secondary.100"
                >
                  Add an item
                </Button>
              </Center>
            ) : null}
          </ScrollView>
        </Center>
        <ExpirySuggestions items={cabinetItems} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
