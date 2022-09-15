import { Box, Center, HStack, Text, VStack } from 'native-base';
import React from 'react';

export const IngredientsList = ({ ingredients }) => {
  if (!ingredients) return;
  return (
    <>
      {ingredients &&
        ingredients.map((ingredient) => {
          return (
            <VStack ml={20} key={ingredient.id}>
              <HStack flex={1} justifyContent={'space-between'}>
                <Text bold>{ingredient.name}</Text>
                <Box w={'40%'}>
                  <HStack>
                    <Text mr={2}>
                      {Math.round(ingredient.measures.metric.amount)}
                    </Text>
                    <Text>{ingredient.measures.metric.unitShort}</Text>
                  </HStack>
                </Box>
              </HStack>
            </VStack>
          );
        })}
    </>
  );
};
