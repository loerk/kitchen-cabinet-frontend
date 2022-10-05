import { uuidv4 } from '@firebase/util';
import {
  Actionsheet,
  AspectRatio,
  Box,
  HStack,
  Image,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { RecipeDetails } from '../recipes/RecipeDetails';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export const RecipeCard = ({ item, ingredientIds }) => {
  const missingIngredientsNames = item.missedIngredients?.map(
    (ingredient) => ingredient.name
  );
  const usedIngredientsNames = item.usedIngredients?.map(
    (ingredient) => ingredient.name
  );
  let ingredientsStatus = {};
  if (ingredientIds?.length) {
    ingredientsStatus = item?.extendedIngredients?.reduce(
      (acc, curr) => {
        if (ingredientIds.includes(curr.id)) {
          return {
            ...acc,
            statusUsed: [
              ...acc.statusUsed,
              {
                name: curr.name,
                amount: Math.round(curr.measures.metric.amount),
                id: curr.id,
                metrics: curr.measures.metric.unitShort,
              },
            ],
          };
        }

        if (!ingredientIds.includes(curr.id)) {
          return {
            ...acc,
            statusMissed: [
              ...acc.statusMissed,
              {
                name: curr.name,
                amount: Math.round(curr.measures.metric.amount),
                id: curr.id,
                metrics: curr.measures.metric.unitShort,
              },
            ],
          };
        }

        return acc;
      },
      {
        statusUsed: [],
        statusMissed: [],
      }
    );
  }
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box key={uuidv4()} alignItems="center" m={3} maxH={400} shadow="4">
      <Pressable onPress={onOpen}>
        <Box maxW="80" maxH="80" rounded="md" overflow="hidden">
          <AspectRatio w="100%" ratio={4 / 3}>
            <Image
              source={{
                uri: `${item.image}`,
              }}
              alt="recipe image"
            />
          </AspectRatio>
          <HStack
            zIndex={2}
            bg="black"
            opacity={0.7}
            _dark={{
              bg: 'secondary.100',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
            alignItems={'flex-end'}
          >
            <Entypo name="heart" size={24} color="white" />
            <Text pl={1} size={'md'} color={'white'}>
              {item.likes || 'by you'}
            </Text>
          </HStack>
          <Text
            p={2}
            width={'full'}
            bg={'white'}
            opacity={0.7}
            position={'absolute'}
            textAlign={'center'}
            isTruncated
            zIndex={2}
            size="lg"
            color={'black'}
            bold
          >
            {item.title}
          </Text>
          <Stack
            bg="black"
            opacity={0.7}
            _dark={{
              bg: 'secondary.100',
            }}
            _text={{
              color: 'white',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            p="4"
            zIndex={2}
            right={0}
            bottom={0}
            absolute
            space={3}
            px="3"
            py="1.5"
          >
            <HStack justifyContent="space-around">
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  size={24}
                  color={'white'}
                />
                {item?.usedIngredients ? (
                  <Text color={'white'} pl={2} pr={8}>
                    {item.usedIngredients.length}
                  </Text>
                ) : (
                  <Text color={'white'} pl={2} pr={8}>
                    {ingredientsStatus?.statusUsed?.length}
                  </Text>
                )}
              </HStack>
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={24}
                  color={'white'}
                />
                {item?.missedIngredients ? (
                  <Text color={'white'} pl={2} pr={2}>
                    {item.missedIngredientCount}
                  </Text>
                ) : (
                  <Text color={'white'} pl={2} pr={2}>
                    {ingredientsStatus?.statusMissed?.length}
                  </Text>
                )}
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <RecipeDetails
            missingIngredientsNames={missingIngredientsNames}
            missingIngredients={ingredientsStatus?.statusMissed}
            usedIngredients={ingredientsStatus?.statusUsed}
            usedIngredientsNames={usedIngredientsNames}
            id={item.id}
            isOpen={isOpen}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
