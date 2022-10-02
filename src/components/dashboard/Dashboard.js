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
  HStack,
  VStack,
  Box,
  View,
  Slide,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
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

          <Ionicons
            name="options"
            size={34}
            color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
            onPress={() => setIsOpen(!isOpen)}
          />
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
            {isLoadingRecipes ? <LoadingCards /> : null}
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
      </ScrollView>
    </View>
  );
};

export default Dashboard;
