import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

// import RenderHtml from 'react-native-render-html';
import {
  useAddFavouriteRecipeMutation,
  useGetRecipeByIdQuery,
} from '../../features/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IngredientsList } from './IngredientsList';
import { OpenURLButton } from '../utils/ExternalLinking';
import { CABINET_ID } from '@env';

export const RecipeDetails = ({
  missingIngredientsNames,
  usedIngredientsNames,
  id,
  isOpen,
}) => {
  const { width } = useWindowDimensions();
  const { data: recipeDetails, isLoading } = useGetRecipeByIdQuery(
    isOpen ? id : skipToken
  );
  const [addFavouriteRecipe, { isSuccess, isLoading: isSaving }] =
    useAddFavouriteRecipeMutation();

  const saveFavourite = (id) => {
    addFavouriteRecipe({ CABINET_ID, recipeId: id }).unwrap();
  };

  const steps = recipeDetails?.analyzedInstructions[0]?.steps;
  if (isLoading) return <Spinner text="Loading..." />;
  return (
    recipeDetails && (
      // <Center pt={20}>
      <View w={width}>
        <ScrollView mb={35}>
          <Box flex={1}>
            <Box>
              <Text bold fontSize="xl" textAlign={'center'} m={5}>
                {recipeDetails.title}
              </Text>
            </Box>
            <VStack>
              <Divider mb={5}></Divider>
              <Box w={'100%'}>
                <Box
                  alignItems={'center'}
                  bg={'amber.200'}
                  position={'absolute'}
                  top={20}
                  left={5}
                  p={3}
                  style={{
                    zIndex: 999,
                  }}
                >
                  <Text bold>ready in</Text>
                  <Text pt={5} bold style={{ fontSize: '35%' }}>
                    {recipeDetails.readyInMinutes}
                  </Text>
                </Box>

                <Image
                  source={{
                    uri: `${recipeDetails.image}`,
                  }}
                  style={{ resizeMode: 'contain' }}
                  alt="Alternate Text"
                  size="sm"
                  w={'100%'}
                  h={300}
                  mb={5}
                />
              </Box>
              <View h={'70%'} w={'100%'}>
                {recipeDetails && (
                  <IngredientsList
                    missingIngredientsNames={missingIngredientsNames}
                    usedIngredientsNames={usedIngredientsNames}
                    ingredients={recipeDetails.extendedIngredients}
                  />
                )}
                <Box
                  mb={40}
                  mt={10}
                  w={'100%'}
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'space-around'}
                >
                  {steps ? (
                    steps.map((step) => (
                      <HStack w={'80%'} space={4} key={uuidv4()}>
                        <Text size={'lg'} bold>
                          {step.number}/
                        </Text>
                        <VStack>
                          <HStack>
                            <Text mb={2} bold>
                              You need:{' '}
                            </Text>
                            <VStack mb={3}>
                              {step.ingredients.length ? (
                                step.ingredients?.map((ingredient) => (
                                  <Text key={uuidv4()}>{ingredient.name}</Text>
                                ))
                              ) : (
                                <Text>all Ingredients</Text>
                              )}
                            </VStack>
                          </HStack>
                          <Text
                            maxW={'90%'}
                            mb={10}
                            style={{ fontSize: '19rem' }}
                          >
                            {step.step}
                          </Text>
                        </VStack>
                      </HStack>
                    ))
                  ) : (
                    <View>
                      <Text textAlign={'center'} w={300}>
                        We are sorry, there is no further Information provided.
                        But you may find something similar{' '}
                      </Text>
                      <OpenURLButton url={recipeDetails.sourceUrl}>
                        here
                      </OpenURLButton>
                    </View>
                  )}
                  <Button
                    mb={4}
                    onPress={() => saveFavourite(recipeDetails.id)}
                  >
                    Add to favourites
                  </Button>
                  {isSaving && <Spinner text="Loading..." />}
                  {isSuccess && (
                    <Text textAlign={'center'}>
                      This recipe is now one of your favourites
                    </Text>
                  )}
                </Box>
              </View>
            </VStack>
          </Box>
        </ScrollView>
      </View>
    )
  );
};

const tagsStyles = {
  body: {
    fontSize: '1.2em',
    lineHeight: '2rem',
    width: '100%',
    padding: '8%',
    listStyleType: 'none',
  },
};
