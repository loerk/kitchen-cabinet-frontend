import PropTypes from 'prop-types';
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

export const RecipeCard = ({ recipe, ingredientIds }) => {
  const missingIngredientsIds = recipe.missedIngredients?.map(
    (ingredient) => ingredient.id
  );
  const usedIngredientsIds = recipe.usedIngredients?.map(
    (ingredient) => ingredient.id
  );
  function getFilteredItem(isUsed) {
    return recipe.extendedIngredients
      ?.filter((ingredient) => ingredientIds.includes(ingredient.id) === isUsed)
      .map((item) => ({
        name: item.name,
        amount: Math.round(item.measures.metric.amount),
        id: item.id,
        metrics: item.measures.metric.unitShort,
      }));
  }

  const transformedItem = Object.prototype.hasOwnProperty.call(
    recipe,
    'missedIngredients'
  )
    ? recipe
    : {
        ...recipe,
        usedIngredients: getFilteredItem(true),
        missedIngredients: getFilteredItem(false),
      };

  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box key={uuidv4()} alignItems="center" m={3} maxH={400} shadow="4">
      <Pressable onPress={onOpen}>
        <Box maxW="80" maxH="80" rounded="md" overflow="hidden">
          <AspectRatio w="100%" ratio={4 / 3}>
            <Image
              source={{
                uri: `${transformedItem.image}`,
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
              {transformedItem.likes || 'by you'}
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
            {transformedItem.title}
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
                <Text color={'white'} pl={2} pr={8}>
                  {transformedItem.usedIngredients.length}
                </Text>
              </HStack>
              <HStack>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={24}
                  color={'white'}
                />
                <Text color={'white'} pl={2} pr={2}>
                  {transformedItem.missedIngredients.length}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <RecipeDetails
            missingIngredientsIds={missingIngredientsIds}
            missingIngredients={transformedItem.missedIngredients}
            usedIngredients={transformedItem.usedIngredients}
            usedIngredientsIds={usedIngredientsIds}
            id={transformedItem.id}
            isOpen={isOpen}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  ingredientIds: PropTypes.array,
};

RecipeCard.defaultProps = {
  item: PropTypes.object.isRequired,
  ingredientIds: null,
};
