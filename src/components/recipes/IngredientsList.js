import { Box, HStack, Text, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';

export const IngredientsList = ({
  missingIngredientsNames,
  usedIngredientsNames,
  ingredients,
}) => {
  console.log({ missingIngredientsNames });
  console.log({ usedIngredientsNames });
  if (!ingredients) return;
  return (
    <>
      {ingredients &&
        ingredients.map((ingredient) => {
          return (
            <VStack
              flex={1}
              key={ingredient.id}
              w={'100%'}
              alignItems={'center'}
            >
              <HStack
                ml={20}
                w={'80%'}
                flex={1}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                {usedIngredientsNames.includes(ingredient.name) ? (
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle-outline"
                    size={24}
                    color="black"
                  />
                )}
                <Text w={'40%'} bold>
                  {ingredient.name}
                </Text>
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
