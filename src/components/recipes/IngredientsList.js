import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';

import { useAddShoppinglistMutation } from '../../features/api/apiSlice';
import { CABINET_ID } from '@env';

export const IngredientsList = ({
  missingIngredientsNames,
  usedIngredientsNames,
  ingredients,
}) => {
  const [shoppinglist, setShoppinglist] = useState();
  const [addShoppinglist, { isSuccess, isLoading }] =
    useAddShoppinglistMutation();
  useEffect(() => {
    setShoppinglist(
      ingredients
        .map((ingredient) => {
          if (missingIngredientsNames.includes(ingredient.name)) {
            return {
              name: ingredient.name,
              id: ingredient.id,
              amount:
                Math.round(ingredient.measures.metric.amount) +
                ingredient.measures.metric.unitShort,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
    );
  }, []);

  const addToShoppinglist = () => {
    addShoppinglist({ CABINET_ID, shoppinglist });
  };
  if (!ingredients) return;
  return (
    <Center>
      {ingredients &&
        ingredients.map((ingredient) => {
          return (
            <VStack flex={1} mb={3} key={ingredient.id} w={'100%'}>
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
      <Button onPress={addToShoppinglist} mt={7} maxW={'50%'}>
        Add to shopping list
      </Button>
      {isLoading && <Spinner />}
      {isSuccess && (
        <Text textAlign={'center'}>
          You sucessfully added the missing items to your shoppinglist
        </Text>
      )}
    </Center>
  );
};
