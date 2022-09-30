import { uuidv4 } from '@firebase/util';
import {
  Actionsheet,
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclose,
  useColorMode,
} from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { RecipeDetails } from '../recipes/RecipeDetails';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

export const RecipeCard = ({ item, ingredientIds }) => {
  const { colorMode } = useColorMode();
  const missingIngredientsNames = item.missedIngredients?.map(
    (ingredient) => ingredient.name
  );
  const usedIngredientsNames = item.usedIngredients?.map(
    (ingredient) => ingredient.name
  );
  const ingredientsStatus = item?.extendedIngredients?.reduce(
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
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box key={uuidv4()} alignItems="center" m={3}>
      <Pressable onPress={onOpen}>
        <Box
          maxW="80"
          minH="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                alt="recipe image"
              />
            </AspectRatio>
            <HStack
              bg="black"
              opacity={0.7}
              _dark={{
                bg: 'violet.400',
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
              <Entypo name="heart" size={22} color="white" />
              <Text pl={1} bold size={'md'} color={'white'}>
                {item.likes || 'by you'}
              </Text>
            </HStack>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md">{item.title}</Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              ></Text>
            </Stack>

            <HStack justifyContent="space-around">
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  size={24}
                  color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
                />
                <Text pl={2}>
                  {item.usedIngredientCount ||
                    ingredientsStatus.statusUsed.length}
                </Text>
              </HStack>
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={24}
                  color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
                />
                <Text pl={2}>
                  {item.missedIngredientCount ||
                    ingredientsStatus.statusMissed.length}
                </Text>
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
