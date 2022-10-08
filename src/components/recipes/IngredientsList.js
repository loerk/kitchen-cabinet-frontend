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
  missingIngredientsIds,
  usedIngredientsIds,
  ingredients,
}) => {
  if (missingIngredients) {
    missingIngredientsIds = missingIngredients.map((el) => el.id);
  }
  if (usedIngredients) {
    usedIngredientsIds = usedIngredients.map((el) => el.id);
  }
  console.log({ ingredients });
  console.log({ missingIngredients });
  console.log({ usedIngredients });

  const { cabinetId } = useContext(AuthContext);
  const [shoppinglist, setShoppinglist] = useState({
    name: '',
    id: '',
    amount: 0,
    metrics: '',
  });
  const { colorMode } = useColorMode();
  // if (!usedIngredientsIds) usedIngredientsIds =
  const [addShoppinglist, { isSuccess, isLoading }] =
    useAddShoppinglistMutation();
  useEffect(() => {
    setShoppinglist(missingIngredients.filter((el) => el.id !== -1));
  }, []);
  const addToShoppinglist = () => {
    addShoppinglist({ cabinetId, shoppinglist });
  };
  if (!ingredients) return;
  return (
    <Center>
      {ingredients &&
        ingredients
          .filter((el) => el.id !== -1)
          .map((ingredient) => {
            return (
              <VStack flex={1} mb={3} key={uuidv4()} w={'100%'}>
                <HStack
                  ml={20}
                  w={'80%'}
                  flex={1}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  {usedIngredientsIds?.includes(ingredient.id) ? (
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
      {missingIngredientsIds.length ? (
        <Button
          bg="secondary.100"
          onPress={addToShoppinglist}
          mt={7}
          maxW={'50%'}
        >
          Add to shopping list
        </Button>
      ) : null}

      {isLoading && <Spinner pt={3} />}
      {isSuccess && (
        <Text pt={3} maxW={250} textAlign={'center'}>
          You sucessfully added the missing items to your shoppinglist
        </Text>
      )}
    </Center>
  );
};
