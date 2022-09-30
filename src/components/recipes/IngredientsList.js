import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
  useColorMode,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useState, useContext } from 'react';

import { useAddShoppinglistMutation } from '../../features/api/apiSlice';
// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

export const IngredientsList = ({
  missingIngredients,
  usedIngredients,
  missingIngredientsNames,
  usedIngredientsNames,
  ingredients,
}) => {
  if (missingIngredients) {
    missingIngredientsNames = missingIngredients.map((el) => el.name);
  }
  if (usedIngredients) {
    usedIngredientsNames = usedIngredients.map((el) => el.name);
  }
  const { cabinetId } = useContext(AuthContext);
  const [shoppinglist, setShoppinglist] = useState({
    name: '',
    id: '',
    amount: 0,
    metrics: '',
  });
  const { colorMode } = useColorMode();

  const [addShoppinglist, { isSuccess, isLoading }] =
    useAddShoppinglistMutation();
  useEffect(() => {
    if (!missingIngredients) {
      setShoppinglist(
        ingredients
          .map((ingredient) => {
            if (missingIngredientsNames?.includes(ingredient.name)) {
              return {
                name: ingredient.name,
                id: ingredient.id,
                amount: Math.round(ingredient.measures.metric.amount),
                metrics: ingredient.measures.metric.unitShort,
              };
            }
            return null;
          })
          .filter((item) => item !== null)
      );
    } else {
      setShoppinglist(missingIngredients);
    }
  }, []);
  console.log({ shoppinglist });
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
                {usedIngredientsNames?.includes(ingredient.name) ? (
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={24}
                    color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle-outline"
                    size={24}
                    color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
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
      {missingIngredientsNames || usedIngredientsNames ? (
        <Button onPress={addToShoppinglist} mt={7} maxW={'50%'}>
          Add to shopping list
        </Button>
      ) : null}

      {isLoading && <Spinner />}
      {isSuccess && (
        <Text textAlign={'center'}>
          You sucessfully added the missing items to your shoppinglist
        </Text>
      )}
    </Center>
  );
};
