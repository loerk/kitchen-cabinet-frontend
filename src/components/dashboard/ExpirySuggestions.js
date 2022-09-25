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

function ExpirySuggestions({ items }) {
  const [ingredients, setIngredients] = useState('');

  const { data: suggestedRecipes, isLoadingRecipes } =
    useGetRecipeByIngredientsQuery(
      ingredients.length ? ingredients : skipToken
    );

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
  return (
    <Box>
      <Heading my={9} textAlign={'center'}>
        Better be fast
      </Heading>
      <SafeAreaView>
        <ScrollView mx={3} horizontal={true}>
          {reduced?.superUrgent && (
            <Box>
              <Heading fontSize="xl" p="4" pb="3">
                Already over expiry Date
              </Heading>
              <FlatList
                data={reduced.superUrgent || null}
                renderItem={({ item }) => (
                  <Box
                    key={uuidv4()}
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
                keyExtractor={(item) => item.id}
              />
              <Button onPress={getSuperUrgentRecipes}>Get Recipes</Button>
            </Box>
          )}
          {reduced?.urgent && (
            <Box px={7}>
              <Heading fontSize="xl" p="4" pb="3">
                Close to expiration
              </Heading>
              <FlatList
                data={reduced.urgent || null}
                renderItem={({ item }) => (
                  <Box
                    key={uuidv4()}
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
                keyExtractor={(item) => item.id}
              />
              <Button onPress={getUrgentRecipes}>Get Recipes</Button>
            </Box>
          )}
          {reduced?.middle && (
            <Box px={5}>
              <Heading fontSize="xl" p="4" pb="3">
                Might be next
              </Heading>
              <FlatList
                data={reduced.middle || null}
                renderItem={({ item }) => (
                  <Box
                    key={uuidv4()}
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
                keyExtractor={(item) => item.id}
              />
              <Button onPress={getSoonRecipes}>Get Recipes</Button>
            </Box>
          )}
        </ScrollView>
        {ingredients && (
          <Box>
            <Heading textAlign={'center'} my={10}>
              Try these
            </Heading>
            <ScrollView horizontal={true}>
              {suggestedRecipes?.map((recipe) => {
                return <RecipeCard item={recipe} />;
              })}
            </ScrollView>
          </Box>
        )}
      </SafeAreaView>
    </Box>
  );
}
export default ExpirySuggestions;
