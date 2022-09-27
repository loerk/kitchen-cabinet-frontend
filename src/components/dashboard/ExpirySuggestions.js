import 'react-native-get-random-values';
import { uuidv4 } from '@firebase/util';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useGetRecipeByIngredientsQuery } from '../../features/api/apiSlice';
import { RecipeCard } from '../utils/RecipeCard';

function ExpirySuggestions({ items, setScrollToBottom }) {
  const [ingredients, setIngredients] = useState('');

  const {
    data: suggestedRecipes,
    isLoading,
    isSuccess,
  } = useGetRecipeByIngredientsQuery(
    ingredients.length ? ingredients : skipToken
  );
  if (isSuccess) setScrollToBottom(true);
  const reduced = items?.reduce((acc, curr) => {
    const date = new Date();
    const timeDifference = Math.round(
      (+new Date(curr.expiryDate) - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    let key = '';
    if (timeDifference < 0) {
      key = 'superUrgent';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (timeDifference < 10) {
      key = 'urgent';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (timeDifference < 30) {
      key = 'middle';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    }

    return acc;
  }, {});

  const getSoonRecipes = () => {
    setIngredients(reduced.middle.map((item) => item.name).join());
  };
  const getUrgentRecipes = () => {
    setIngredients(reduced.urgent.map((item) => item.name).join());
  };
  const getSuperUrgentRecipes = () => {
    setIngredients(reduced.superUrgent.map((item) => item.name).join());
  };
  if (!items) return;
  return (
    <Box>
      <Heading my={9} textAlign={'center'}>
        Cabinet Overview
      </Heading>
      <SafeAreaView>
        <ScrollView mx={3} horizontal={true}>
          {reduced?.superUrgent && (
            <Box px={5} py={7} maxH={500}>
              <Heading fontSize="xl" p="4" pb="3">
                Expired
              </Heading>
              <FlatList
                keyExtractor={() => uuidv4()}
                data={reduced.superUrgent || null}
                renderItem={({ item }) => (
                  <Box
                    id={uuidv4()}
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2"
                  >
                    <HStack
                      space={[2, 3]}
                      justifyContent="space-between"
                      alignItems={'center'}
                    >
                      <Avatar
                        size="48px"
                        source={{
                          uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.name}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="center"
                      >
                        {item.expiryDate.split('-').reverse().join('/')}
                      </Text>
                    </HStack>
                  </Box>
                )}
              />
              {isLoading ? (
                <Button
                  bg="secondary.100"
                  isLoading
                  spinnerPlacement="end"
                ></Button>
              ) : (
                <Button bg="secondary.100" onPress={getSuperUrgentRecipes}>
                  Get Recipes
                </Button>
              )}
            </Box>
          )}
          {reduced?.urgent && (
            <Box px={5} py={7} maxH={500}>
              <Heading fontSize="xl" p="4" pb="3">
                Expiring soon
              </Heading>
              <FlatList
                data={reduced.urgent || null}
                keyExtractor={() => uuidv4()}
                renderItem={({ item }) => (
                  <Box
                    id={uuidv4()}
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2"
                  >
                    <HStack
                      space={[2, 3]}
                      justifyContent="space-between"
                      alignItems={'center'}
                    >
                      <Avatar
                        size="48px"
                        source={{
                          uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.name}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="center"
                      >
                        {item.expiryDate.split('-').reverse().join('/')}
                      </Text>
                    </HStack>
                  </Box>
                )}
              />
              {isLoading ? (
                <Button
                  bg="secondary.100"
                  isLoading
                  spinnerPlacement="end"
                ></Button>
              ) : (
                <Button bg="secondary.100" onPress={getUrgentRecipes}>
                  Get Recipes
                </Button>
              )}
            </Box>
          )}
          {reduced?.middle && (
            <Box px={5} py={7} maxH={500}>
              <Heading fontSize="xl" p="4" pb="3">
                Expiring within 2 weeks
              </Heading>
              <FlatList
                keyExtractor={() => uuidv4()}
                data={reduced.middle || null}
                renderItem={({ item }) => (
                  <Box
                    id={uuidv4()}
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2"
                  >
                    <HStack
                      space={[2, 3]}
                      justifyContent="space-between"
                      alignItems={'center'}
                    >
                      <Avatar
                        size="48px"
                        source={{
                          uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.name}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf="center"
                      >
                        {item.expiryDate.split('-').reverse().join('/')}
                      </Text>
                    </HStack>
                  </Box>
                )}
              />
              {isLoading ? (
                <Button
                  bg="secondary.100"
                  isLoading
                  spinnerPlacement="end"
                ></Button>
              ) : (
                <Button bg="secondary.100" onPress={getSoonRecipes}>
                  Get Recipes
                </Button>
              )}
            </Box>
          )}
        </ScrollView>
        {ingredients && (
          <Box my={10}>
            <ScrollView horizontal={true}>
              {suggestedRecipes?.map((recipe) => {
                return <RecipeCard key={uuidv4()} item={recipe} />;
              })}
            </ScrollView>
          </Box>
        )}
      </SafeAreaView>
    </Box>
  );
}
export default ExpirySuggestions;
