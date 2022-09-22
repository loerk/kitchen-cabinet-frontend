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
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useState, useContext } from 'react';

import { useAddShoppinglistMutation } from '../../features/api/apiSlice';
// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

export const IngredientsList = ({
  missingIngredientsNames,
  usedIngredientsNames,
  ingredients,
}) => {
  const { cabinetId } = useContext(AuthContext);
  const [shoppinglist, setShoppinglist] = useState({
    name: '',
    id: '',
    amount: 0,
    metrics: '',
  });
  console.log(shoppinglist);
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
              amount: Math.round(ingredient.measures.metric.amount),
              metrics: ingredient.measures.metric.unitShort,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null)
    );
  }, []);

  const addToShoppinglist = () => {
    addShoppinglist({ cabinetId, shoppinglist });
  };
  if (!ingredients) return;
  return (
    <Center>
      {ingredients &&
        ingredients.map((ingredient) => {
          return (
            <VStack flex={1} mb={3} key={uuidv4()} w={'100%'}>
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
