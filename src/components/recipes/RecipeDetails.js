import {
  Box,
  Button,
  Divider,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useGetRecipeByIdQuery } from '../../features/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IngredientsList } from './IngredientsList';

export const RecipeDetails = ({ id, isOpen }) => {
  const { width } = useWindowDimensions();
  const {
    data: recipeDetails,
    isLoading,
    isSuccess,
  } = useGetRecipeByIdQuery(isOpen ? id : skipToken);
  console.log(recipeDetails);
  // const { title, summary, image, instructions, steps } = recipeDetails;
  const source = {
    html: recipeDetails?.summary,
  };

  const handlePress = () => {
    console.log('pressed');
  };
  return (
    recipeDetails && (
      <>
        <Button
          onPress={handlePress}
          style={{
            zIndex: 999,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}
          position={'absolute'}
          right={5}
          mt={4}
          p={3}
          borderRadius={60 / 2}
          w={'60'}
          h={'60'}
        >
          GO
        </Button>
        <ScrollView>
          <Box flex={1}>
            <Text textAlign={'center'} bold fontSize="xl" mt={5} mb={5}>
              {recipeDetails.title}
            </Text>
            <VStack>
              <Divider mb={5}></Divider>
              <Image
                source={{
                  uri: `${recipeDetails.image}`,
                }}
                alt="Alternate Text"
                size="sm"
                w={400}
                h={200}
                mb={5}
              />
              <View h={'70%'} w={'90%'}>
                {recipeDetails && (
                  <IngredientsList
                    ingredients={recipeDetails.extendedIngredients}
                  />
                )}
                <Box ml={5}>
                  <RenderHtml
                    tagsStyles={tagsStyles}
                    contentWidth={width}
                    source={source}
                    enableExperimentalMarginCollapsing={true}
                  />
                </Box>
              </View>
            </VStack>
          </Box>
        </ScrollView>
      </>
    )
  );
};

const tagsStyles = {
  body: {
    fontSize: '1.2em',
    lineHeight: '2rem',
    width: '100%',
    padding: '8%',
  },
};
