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
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useGetRecipeByIngredientsQuery } from '../../features/api/apiSlice';
import { RecipeCard } from '../utils/RecipeCard';
import { AuthContext } from '../../authNavigation/AuthProvider';

function ExpirySuggestions({ items }) {
  const { cabinetId } = useContext(AuthContext);

  const [ingredients, setIngredients] = useState('');

  const payload = { cabinetId, ingredients };
  const { data: suggestedRecipes, isLoading } = useGetRecipeByIngredientsQuery(
    ingredients.length ? payload : skipToken
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
  console.log(reduced.middle);
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
      <Heading
        fontSize="2xl"
        style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}
        textAlign={'center'}
      >
        Expiration Overview
      </Heading>
      <SafeAreaView>
        <ScrollView mx={3} horizontal={true} pb={5}>
          {reduced?.superUrgent && (
            <Box px={5} pb={7} maxH={500} w={350}>
              <Heading fontSize="xl" p="4" pb="3">
                Expired
              </Heading>
              <FlatList
                pr={3}
                mb={6}
                keyExtractor={() => uuidv4()}
                data={
                  reduced.superUrgent.sort(
                    (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate)
                  ) || null
                }
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
                    py="1"
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
                          w={150}
                          pl={4}
                          isTruncated
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
            <Box px={5} pb={7} pt={2} maxH={500} w={350}>
              <Heading fontSize="xl" p="4" pb="3">
                Expiring soon
              </Heading>
              <FlatList
                pr={3}
                mb={6}
                data={
                  reduced.urgent.sort(
                    (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate)
                  ) || null
                }
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
                    py="1"
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
                          w={150}
                          pl={4}
                          isTruncated
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
            <Box px={5} pb={7} pt={2} maxH={500} w={350}>
              <Heading fontSize="xl" p="4" pb="3">
                Expiring within 2 weeks
              </Heading>
              <FlatList
                pr={3}
                mb={6}
                keyExtractor={() => uuidv4()}
                data={
                  reduced.middle.sort(
                    (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate)
                  ) || null
                }
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
                    py="1"
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
                          w={150}
                          pl={4}
                          isTruncated
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
          <Box>
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
