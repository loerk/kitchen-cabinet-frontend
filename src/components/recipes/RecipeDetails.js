import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  useColorMode,
  View,
  VStack,
} from 'native-base';
import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// import RenderHtml from 'react-native-render-html';
import {
  useAddFavoriteRecipeMutation,
  useDeleteFavoriteRecipeMutation,
  useGetRecipeByIdQuery,
} from '../../features/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IngredientsList } from './IngredientsList';
import { OpenURLButton } from '../utils/ExternalLinking';
// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

export const RecipeDetails = ({
  missingIngredients,
  usedIngredients,
  missingIngredientsIds,
  usedIngredientsIds,
  id,
  isOpen,
}) => {
  const { cabinetId } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { width } = useWindowDimensions();
  const { data: recipeDetails, isLoading } = useGetRecipeByIdQuery(
    isOpen ? id : skipToken
  );

  const [
    addFavoriteRecipe,
    { isSuccess: isSuccessSaving, isLoading: isSaving },
  ] = useAddFavoriteRecipeMutation();
  const [deleteFavoriteRecipe, { isSuccess: isSuccessDeleting }] =
    useDeleteFavoriteRecipeMutation();

  const saveFavorite = (id) => {
    addFavoriteRecipe({ cabinetId, recipeId: id }).unwrap();
  };

  const steps = recipeDetails?.analyzedInstructions[0]?.steps;
  if (isLoading) return <Spinner text="Loading..." />;
  return (
    recipeDetails && (
      <Box w={width} bg={colorMode === 'dark' ? '#515050' : '#FCF5EA'}>
        <ScrollView>
          <Box flex={1}>
            <Box alignItems={'center'}>
              <Text
                bold
                fontSize="xl"
                textAlign={'center'}
                maxWidth={250}
                mt={7}
              >
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
                  <Text color={'black'} bold>
                    ready in
                  </Text>
                  <Text pt={5} bold color={'black'} style={{ fontSize: 35 }}>
                    {recipeDetails.readyInMinutes}
                  </Text>
                </Box>

                <Image
                  source={{
                    uri: `${recipeDetails.image}`,
                  }}
                  style={{ resizeMode: 'contain' }}
                  alt="recipe image"
                  size="sm"
                  w={'100%'}
                  h={300}
                  mb={5}
                />
              </Box>
              <View h={'70%'} pb={20} w={'100%'}>
                {recipeDetails && (
                  <IngredientsList
                    missingIngredients={missingIngredients}
                    usedIngredients={usedIngredients}
                    missingIngredientsIds={missingIngredientsIds}
                    usedIngredientsIds={usedIngredientsIds}
                    ingredients={recipeDetails.extendedIngredients}
                  />
                )}
                <Box mt={10} w={'100%'} flex={1} alignItems={'center'}>
                  {steps ? (
                    steps.map((step) => (
                      <HStack w={'70%'} space={4} key={uuidv4()}>
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
                          <Text maxW={'90%'} mb={10}>
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
                      <OpenURLButton
                        bg="secondary.100"
                        url={recipeDetails.sourceUrl}
                      >
                        here
                      </OpenURLButton>
                    </View>
                  )}
                  {missingIngredientsIds !== undefined ||
                  usedIngredientsIds !== undefined ? (
                    <Button
                      bg="secondary.100"
                      onPress={() => saveFavorite(recipeDetails.id)}
                    >
                      Add to favourites
                    </Button>
                  ) : (
                    <Button
                      bg="secondary.100"
                      onPress={() =>
                        deleteFavoriteRecipe({
                          cabinetId,
                          recipeId: recipeDetails.id,
                        })
                      }
                    >
                      Remove from Favorites
                    </Button>
                  )}
                  {isSaving && <Spinner text="Loading..." />}
                  {isSuccessSaving && (
                    <Text textAlign={'center'}>
                      This recipe is now one of your favourites
                    </Text>
                  )}
                  {isSuccessDeleting && (
                    <Text textAlign={'center'}>
                      This recipe is now removed from your favourites
                    </Text>
                  )}
                </Box>
              </View>
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    )
  );
};
