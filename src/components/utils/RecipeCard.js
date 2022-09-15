import {
  Actionsheet,
  Box,
  Divider,
  HStack,
  Image,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { RecipeDetails } from '../recipes/RecipeDetails';
//divider={<Divider />}
export const RecipeCard = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box>
      <Pressable onPress={onOpen} border="1" /* borderRadius="md" */ mx={6}>
        <Divider
          my="2"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
        <VStack space="4">
          <Box px="4" pt="4">
            <HStack>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                alt="Alternate Text"
                size="sm"
                w={100}
              />
              <Text bold noOfLines={2} isTruncated maxW="200" w="80%" px="4">
                {item.title}
              </Text>
            </HStack>
          </Box>
          <Box px="4">
            <HStack>
              <VStack px={6}>
                <Text>Used Ingredients:</Text>
                <Text>{item.usedIngredientCount}</Text>
              </VStack>
              <VStack>
                <Text>Missing Ingredients:</Text>
                <Text>{item.missedIngredientCount}</Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <RecipeDetails id={item.id} isOpen={isOpen} />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
